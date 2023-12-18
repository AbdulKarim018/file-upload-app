import { getServerSession } from "next-auth";
import UserSettings from "./UserSettings";
import { authOptions } from "@/lib/auth/utils";

export default async function Account() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h1 className="text-3xl font-semibold my-6">Account</h1>
      <div className="space-y-6">
        <UserSettings session={session} />
      </div>
    </main>
  );
}
