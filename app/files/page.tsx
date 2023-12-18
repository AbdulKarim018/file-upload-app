import { MultiFileDropzoneUsage } from '@/components/MultiFileDropzoneUsage'
import UserFiles from '@/components/UserFiles'
import { authOptions } from '@/lib/auth/utils'
import { getServerSession } from 'next-auth'
import React from 'react'
import { db } from '@/lib/db/index';


const FilesPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null
  }
  const files = await db?.file.findMany({
    where: { userId: session?.user.id, },
  })
  return (
    <>
      <div className="w-full flex flex-col gap-12 items-center justify-center">
        <MultiFileDropzoneUsage />
        {files && files.length > 0 && <UserFiles files={files} />}
        {(!files || files.length === 0) && (
          <div className="text-2xl">No files uploaded yet</div>
        )}
      </div>
    </>
  )
}

export default FilesPage