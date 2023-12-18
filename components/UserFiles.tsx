import { File } from '@prisma/client'
import React from 'react'
import FileCard from './FileCard';

type Props = {
  files: File[]
}

const UserFiles = (props: Props) => {
  return (
    <>
      <h1 className='text-2xl'>Your Files</h1>
      <div className='flex flex-col gap-4'>
        {props.files.map((file) => (
          <FileCard file={file} key={file.id} />
        ))}
      </div>
    </>
  )
}

export default UserFiles