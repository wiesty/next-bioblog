'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const items = [
  {
    id: "Title",
    label: "Titles",
  },
  {
    id: "Description",
    label: "Descriptions",
  },
  {
    id: "Content",
    label: "Content",
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one item.",
  }),
  searchstring: z.string(),
});

export function Searchbox() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["Title", "Description", "Content"],
      searchstring: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const searchTerm = data.searchstring.trim();
    if (!searchTerm || searchTerm.length > 50) {
      toast({
        title: "Invalid Search Term",
        description: "Please enter a valid search term (up to 50 characters).",
      });
      return;
    }

    const formattedData = {
      ...data,
      searchstring: data.searchstring.trim().replace(/\s/g, "%20"),
    };
    const searchParams = formattedData.items
      .map((item) => `types=${item}`)
      .join("&");
    
      console.log(searchParams)
    const queryString = `term=${formattedData.searchstring}`;
    router.push(`/search/?${searchParams}&${queryString}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-start"
      >
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Search</FormLabel>
                <FormDescription>
                  Select the fields you want to search
                </FormDescription>
              </div>
              <div className="flex pt-3">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal pr-4">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
              <FormItem>
                <Input
                  className="mt-6"
                  type="search"
                  id="searchstring"
                  maxLength={50}
                  required
                  placeholder="Term to search for"
                  {...form.register("searchstring")}
                />
              </FormItem>
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export default Searchbox;
