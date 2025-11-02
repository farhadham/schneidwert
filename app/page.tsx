import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <Button asChild variant="link">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
