"use client";

import Image from "next/image";
import { useState } from 'react'; // Import useState
import { SingleImageDropzone } from '@/components/SingeImageDropzone';
import { useEdgeStore } from '../lib/edgestore';

export default function Home() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      // Handle file upload logic here
      console.log('Uploading file:', file.name);
      // You can call your API or perform any necessary actions
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-8 bg-black-800">
        <h1 style={{ fontSize: '1.5em' }}>SyllabusAI</h1>
        <div className="flex items-center space-x-8">
          {/* Add your sign-in form or other relevant content here */}
          <button className="text-white">Sign In</button>
          <button className="text-white">Pricing</button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-grow"></div>
      {/* File upload section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
        />
        <button
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  console.log(progress);
                },
              });
              // you can run some server action or api here
              // to add the necessary data to your database
              console.log(res);
            }
          }}
          className="mt-4 ml-16"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
