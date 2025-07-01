"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
export default function AccountPhoto(props: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files: FileList | null = e.target.files;
    if (files?.length == 1) {
      // handle photo upload.
      try {
        setIsLoading(true);
        props.handleUpload && (await props.handleUpload(files));
      } catch (err: any) {
        console.log("error: ", err);
      }
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div
        className="flex flex-col cursor-pointer relative rounded-full w-28 h-28 overflow-hidden"
        onClick={triggerUpload}
        role="button"
        tabIndex={0}
      >
        {isLoading && (
          <div className="flex justify-center items-center bg-neutral-950/50 w-full h-full z-50">
            <Loader2 className="w-9 h-9 animate-spin" />
          </div>
        )}
        <Image
          src={props?.photo as string}
          alt="Profile"
          fill
          className="bg-neutral-800 object-cover"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
        name="profile_pic"
        id="profile_pic"
      />
    </div>
  );
}
