//@ts-nocheck
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

type Props<T extends Record<string, any>> = {
  name: keyof T;
  error?: string;
  imageUrl?: string;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
};

const ImageInput = <T extends Record<string, any>>({
  name,
  register,
  setValue,
  imageUrl,
  watch,
  error,
}: Props<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const watchedValue = watch(name);
    const file = watchedValue instanceof File ? watchedValue : null;
  
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [watch(name)]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setValue(name, selectedFile, { shouldValidate: true });
    }
  };

  return (
    <div className="my-6 flex flex-col items-center gap-3">
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-contain rounded-xl shadow"
        />
      ) : imageUrl ? (
        <Image
                    src={imageUrl}
                    alt='Image'
                    width={200}
                    height={150}
                  />
      ) : (
        <div className="w-40 h-40 bg-secondary/40 rounded-xl flex items-center justify-center text-primary">
          No Image
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-fit text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-secondary/80 file:text-primary
        hover:file:bg-secondary/50"
      />
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default ImageInput;
