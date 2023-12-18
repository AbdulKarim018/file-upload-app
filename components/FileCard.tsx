"use client";
import { File } from '@prisma/client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { getDownloadUrl } from '@edgestore/react/utils'
import { Download, Loader2, Trash2 } from 'lucide-react'
import { deleteFileDBSync } from '@/server/actions';
import { useEdgeStore } from '@/lib/edgestore';

type Props = {
  file: File
}

const FileCard = ({ file }: Props) => {
  const { edgestore } = useEdgeStore();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteFile = React.useCallback(async (file: File) => {
    setIsDeleting(true);
    await edgestore.publicFiles.delete({ url: file.url });
    await deleteFileDBSync(file.id);
    setIsDeleting(false);
  }, [edgestore.publicFiles])
  return (
    <div key={file.id} className='flex flex-col gap-5 items-center'>
      <div className='text-lg font-bold'>{file.url.split('/').pop()}</div>
      <div className="flex gap-10">
        <Button asChild size='sm' >
          <Link href={getDownloadUrl(file.url, file.url.split('/').pop())}>
            Download &nbsp;<Download size={20} />
          </Link>
        </Button>
        <Button disabled={isDeleting} variant="destructive" size='sm' onClick={async () => { deleteFile(file) }}>
          {isDeleting ? (<p className='flex gap-2 items-center'>Deleting&nbsp;<Loader2 className='animate-spin' size='20' /></p>) : (<p className='flex gap-2 items-center'>Delete&nbsp;<Trash2 size={20} /></p>)}
        </Button>
      </div>
    </div>
  )
}

export default FileCard