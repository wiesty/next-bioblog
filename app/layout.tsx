import { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/other/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/other/footer";
import Header from "@/components/other/header";
import Maintenance from "@/components/other/maintenance";

const inter = Rubik({ subsets: ["latin"] });
async function fetchConfig() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/cmsconfig`, {
      ...options,
      cache: "no-store" as RequestCache,
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const config = await fetchConfig();
  if (!config.data.attributes.AllowSeoIndex) {
    return {
      robots: "noindex, nofollow, noarchive, nosnippet, noimageindex, nofollow",
      title: config.data.attributes.BlogTitle,
      description: config.data.attributes.MetaDesc,
    };
  }
  else {
    return {
      title: config.data.attributes.BlogTitle,
      description: config.data.attributes.MetaDesc,
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta httpEquiv="cache-control" content="max-age=0" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
        <meta httpEquiv="expires" content="Sat, 01 Jan 2000 1:00:00 GMT" />
        <meta httpEquiv="pragma" content="no-cache" />
      </head>
      <body className={`${inter.className} bg-shadn3`}>
        <Maintenance>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-shadn p-4">
              <div className="max-w-6xl mx-auto">
                <div className="bg-shadn2 rounded-lg shadow-lg overflow-hidden">
                  <Header />
                  <div className="flex justify-center mt-8">
                    <div className="w-full max-w-screen-lg p-4">{children}</div>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </Maintenance>
      </body>
    </html>
  );
}
