import { authOptions } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as { name?: string; email?: string };

  await db.user.update({ where: { id: session.user.id }, data: { ...body } });
  revalidatePath("/account");
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
