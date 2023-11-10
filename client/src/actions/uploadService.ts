import { Blob, File } from 'buffer';
import { BinaryLike } from 'crypto';
import { createReadStream } from 'fs';

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk: never) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

export const handleUploadFile = async (file: any) => {
  console.log(process.env.MAIN_VITE_PUBLIC_API_URL);
  console.log();
  const formData = new FormData();
  const fileStream = createReadStream(file);
  const fileData = (await streamToBuffer(fileStream)) as BinaryLike | Blob;

  const outputFile = new File([fileData], file);

  // @ts-ignore
  formData.append('file', outputFile);
  formData.append('name', 'file');

  // @ts-ignore
  const apiUrl: stirng = import.meta.env.MAIN_VITE_PUBLIC_API_URL;

  const response = await fetch(`${apiUrl}/api/visualize`, {
    method: 'POST',
    body: formData
  });
  const result = await response.json();

  return result;
};
