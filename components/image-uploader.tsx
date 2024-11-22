"use client";

import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
    images: File[]; // Mảng các đối tượng File
    setImages: React.Dispatch<React.SetStateAction<File[]>>; // Hàm setter để cập nhật state
    handleUploadImages?: () => void; // Hàm để thực hiện upload các ảnh
    existingPreviews?: string[];
}
export default function ImageUploader({
    images,
    setImages,
    handleUploadImages,
    existingPreviews = [],
}: ImageUploaderProps) {
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
<<<<<<< HEAD
        setPreviews(existingPreviews);
=======
        if (existingPreviews.length > 0) {
            setPreviews(existingPreviews);
        }
>>>>>>> 59a6344a2a83767a1d4103e967ef65b3d0f2fd6c
    }, [existingPreviews]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setImages((prevImages) => [...prevImages, ...acceptedFiles]);

            const newPreviews = acceptedFiles.map((file) =>
                URL.createObjectURL(file),
            );
            setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        },
        [setImages],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif"],
        },
    });

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    return (
        <div className="mx-auto w-full max-w-md space-y-4">
            <div
                {...getRootProps()}
                className={`h-24 cursor-pointer rounded-lg border-2 border-dashed p-2 text-center transition-colors ${
                    isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 hover:border-primary"
                }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the images here ...</p>
                ) : (
                    <div className="space-y-2">
                        <div className="flex space-x-2">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p>
                                Drop some images here, or click to select images
                            </p>
                        </div>
                        <p className="text-xs text-gray-500">
                            Supports: JPG, JPEG, PNG, GIF
                        </p>
                    </div>
                )}
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="group relative">
                            <Image
                                src={preview}
                                alt={`Preview ${index}`}
                                className="h-24 w-full rounded-lg object-cover"
                                height={100}
                                width={100}
                            />
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
