import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-64 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">The page you are looking for does not exist.</p>
      <Link href="/">
        <Button variant={"outline"}>home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
