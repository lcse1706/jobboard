'use client';
import Image from 'next/image';

import React, { useState, useRef } from 'react';
import { Button } from './ui/Button';
import { sendOffer } from '@/services/offers';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  connectStorageEmulator,
} from '@firebase/storage';
import storage from '../services/firebaseConfig'; // Import the Firebase configuration
import { useDataContext } from '@/context/DataContext';

function UploadLogo({ submitRef }: any) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const iconRef = useRef<HTMLInputElement>(null!);
  const [preview, setPreview] = useState('');

  const { logoId } = useDataContext();
  console.log(logoId);

  // const { logoId } = useDataContext();

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    iconRef?.current.click();
  };
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    setPreview(URL.createObjectURL(file));
    validateFile(file);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    } else {
      // Handle the case where event.target.files is null or empty
    }

    validateFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    if (selectedFile) {
      console.log(selectedFile);
      console.log(logoId);
      const storagePath = `/logos/${logoId}`; // Set the desired storage path
      const storageRef = ref(storage, storagePath);

      try {
        const snapshot = await uploadBytes(storageRef, selectedFile);
        console.log('File uploaded successfully:', snapshot);

        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setSelectedFile(null);
    setPreview('');
  };

  const validateFile = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
      } else if (file.size > 1000000) {
        setError('File size is too large');
      } else {
        setSelectedFile(file);
        setError('');
      }
    }
  };

  return (
    <div className=" px-4">
      <div
        className="border border-dashed border-gray-400 rounded-lg p-8 text-center"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p className="text-xl font-semibold mb-4">Upload Your Logo</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={iconRef}
            type="file"
            onChange={handleFileInput}
            name="file"
            hidden
          />
          <Button label="Add File" type="button" onClick={onBtnClick} />
          <p className="mt-2">Or</p>
          <p>Drag and Drop to Upload</p>
          <button
            ref={submitRef}
            type="submit"
            style={{ display: 'none' }}
          />{' '}
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <section className="mt-4">
          <div className="col-md-4">
            {preview ? (
              <Image
                src={preview}
                alt="tech img"
                width={200}
                height={200}
                className="mx-auto"
              />
            ) : (
              ''
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UploadLogo;
