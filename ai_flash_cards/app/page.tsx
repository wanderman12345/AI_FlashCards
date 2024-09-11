"use client";

import Image from "next/image";
import { useState } from 'react'; // Import useState
import { SingleImageDropzone } from '@/components/SingeImageDropzone';
import { useEdgeStore } from '../lib/edgestore';
import { uploadFileToFirebase } from '@/services/firebase';

export default function Home() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [view, setView] = useState<'upload' | 'loading' | 'display'>('upload');
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileChange = (file: File) => {
    setFile(file);
  };

 const handleUpload = async () => {
  if (file) {
    // Upload file to Firebase
    const downloadURL = await uploadFileToFirebase(file);
    console.log('File uploaded to:', downloadURL);
     // Update state with file content and change view
    //  setFileContent(downloadURL);

    // Send the download URL to the API route for processing
    const response = await fetch('http://localhost:3000/api/process-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: downloadURL }),
    });

    if (response.ok) {
      const data = await response.json();
      setFileContent(data.text);
      console.log("response succe")
      setView('display');
    } else {
      console.error('Failed to process file');
      setView('upload');
    }
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
      {view === 'display' && (
          <div className="flex flex-col items-center">
           Hello World
          </div>
        )}
      {view === 'upload' && (
          <div className="flex flex-col items-center">
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              onChange={handleFileChange}
            />
            <button
              onClick={handleUpload}
              className="mt-4 ml-16"
            >
              Upload
            </button>
          </div>
        )}
    </div>
  );
}
