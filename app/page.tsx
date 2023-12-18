import SignIn from "@/components/auth/SignIn";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth/utils";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) null;
  return (
    <main className="space-y-4">
      {session ? (
        <pre className="bg-card p-4 rounded-sm overflow-hidden">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <Button asChild>
        <Link href="/files">Go to Files <ArrowRight className="ml-2" /></Link>
      </Button>
      <SignIn />
    </main>
  );
}
