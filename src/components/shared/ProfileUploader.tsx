import { convertFileToUrl } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Input } from "../ui/input";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".svg", ".jpg"],
    },
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:bbase-semibold">
          Change Profile Photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
