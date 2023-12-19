"use server"

import { db } from '@/lib/db/index';
import { authOptions } from "@/lib/auth/utils";
import { getServerSession } from "next-auth";
import { revalidatePath } from 'next/cache';

export const uploadFileDBSync = async (response: {
  url: string;
  size: number;
  uploadedAt: Date;
  metadata: Record<string, never>;
  path: Record<string, never>;
  pathOrder: string[];
}) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No session found");
  const { url, size, uploadedAt } = response;
  const addFileToUser = await db.file.create({
    data: {
      url,
      size,
      uploadedAt,
      userId: session.user.id,
    },
  });
  revalidatePath('/files');
  return { msg: 'File uploaded successfully' };
}

export const deleteFileDBSync = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No session found");
  const deleteFile = await db.file.delete({
    where: {
      id,
    },
  });
  revalidatePath('/files');
  return { msg: 'File deleted successfully' };
};