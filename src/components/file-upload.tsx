"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, File, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
  disabled?: boolean;
  title?: string;
  description?: string;
  allowedTypes?: string[];
  maxSize?: number; // in MB
}

export function FileUpload({
  onChange,
  value,
  className,
  disabled = false,
  title = "",
  description = "",
  allowedTypes,
  maxSize,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for the new flow
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0); // For local validation/preview
  const [isLocallyProcessed, setIsLocallyProcessed] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // For the "submit" action
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null); // For image thumbnail preview

  // Effect to reset internal state if the external `value` prop changes to null (e.g., parent form reset)
  useEffect(() => {
    if (value === null) {
      setInternalFile(null);
      setProcessingProgress(0);
      setIsLocallyProcessed(false);
      setUploadProgress(0);
      setIsSubmitting(false);
      setThumbnailUrl(null); // Clear thumbnail URL
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else if (value && value.type.startsWith("image/")) {
      // Generate thumbnail for the value prop if it's an image
      generateThumbnail(value);
    }
  }, [value]);

  // Function to generate thumbnail for image files
  const generateThumbnail = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbnailUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelected(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      handleFileSelected(selectedFile);
    }
  };

  const handleFileSelected = (file: File) => {
    setInternalFile(null); // Reset previous internal file
    setIsLocallyProcessed(false);
    setProcessingProgress(0);
    setUploadProgress(0);
    setIsSubmitting(false);

    // Check file type if allowedTypes is provided
    if (allowedTypes && allowedTypes.length > 0) {
      const fileType = file.type;
      if (!allowedTypes.some((type) => fileType.includes(type))) {
        // Handle invalid file type
        console.error("Invalid file type");
        return;
      }
    }

    // Check file size if maxSize is provided
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      // Handle file too large
      console.error("File too large");
      return;
    }

    setInternalFile(file); // Set the new internal file

    // Generate thumbnail for image files
    generateThumbnail(file);

    // Simulate local processing progress
    let currentProcessing = 0;
    const processingInterval = setInterval(() => {
      currentProcessing += 20; // Faster simulation for local processing
      setProcessingProgress(currentProcessing);
      if (currentProcessing >= 100) {
        clearInterval(processingInterval);
        setProcessingProgress(100);
        setIsLocallyProcessed(true);
        // Do NOT call onChange(file) here. Submission will handle that.
      }
    }, 50);
  };

  const handleRemoveFile = () => {
    if (internalFile && !isSubmitting) {
      // If there's an internal file being processed or ready for submission, clear that.
      setInternalFile(null);
      setProcessingProgress(0);
      setIsLocallyProcessed(false);
      setUploadProgress(0);
      setThumbnailUrl(null); // Clear thumbnail URL
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else if (value && !isSubmitting) {
      // If there's an externally provided 'value' (already submitted file), clear that via onChange.
      onChange(null);
    }
    // If isSubmitting is true, perhaps disable remove button or handle differently. For now, it allows removal.
  };

  const handleSubmit = () => {
    if (!internalFile || !isLocallyProcessed || isSubmitting) return;

    setIsSubmitting(true);
    setUploadProgress(0);

    // Simulate submission progress
    let currentSubmissionProgress = 0;
    const submissionInterval = setInterval(() => {
      currentSubmissionProgress += 10;
      setUploadProgress(currentSubmissionProgress);
      if (currentSubmissionProgress >= 100) {
        clearInterval(submissionInterval);
        setUploadProgress(100);
        onChange(internalFile); // Notify parent about the "submitted" file
        setIsSubmitting(false);
        // Optionally reset internalFile here or wait for parent to clear `value`
        // For now, let's keep internalFile to show "Uploaded" status until parent clears `value`
        // setInternalFile(null);
        // setIsLocallyProcessed(false);
        // setProcessingProgress(0);
      }
    }, 150); // Slower simulation for "upload"
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <Card className={cn(className, isDragging && "border-primary")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Left Column: Dropzone */}
          <div
            className={cn(
              "w-full md:flex-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-4 min-h-[200px]", // md:flex-1 to allow it to take space, min-h for consistent height
              isDragging ? "border-primary bg-primary/5" : "border-muted",
              "transition-colors duration-200"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              disabled={
                disabled ||
                isSubmitting ||
                (!!internalFile && isLocallyProcessed) ||
                !!value
              }
              accept={allowedTypes?.map((type) => `.${type}`).join(",")}
            />
            <Cloud className="h-10 w-10 text-muted-foreground" />
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-medium">Drop your file here</p>
              <p className="text-xs text-muted-foreground">
                {allowedTypes
                  ? `Supported formats: ${allowedTypes.join(", ")}`
                  : "All file types supported"}
              </p>
              {maxSize && (
                <p className="text-xs text-muted-foreground">
                  Max size: {maxSize}MB
                </p>
              )}
            </div>
          </div>

          {/* Right Column: File Details (conditional) */}
          {(internalFile || value) && (
            <div className="w-full md:flex-1 flex flex-col justify-end min-h-[200px]">
              {" "}
              {/* md:flex-1 and min-h for consistent height */}
              <div className="space-y-4 mt-6 md:mt-0">
                {internalFile ? ( // Display internalFile details if it exists
                  <>
                    <div className="flex items-center gap-3">
                      <File className="h-8 w-8 text-primary" />
                      <div className="flex-1 space-y-1">
                        <p
                          className="text-sm font-medium truncate"
                          title={internalFile.name}
                        >
                          {internalFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(internalFile.size)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        disabled={disabled || isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Thumbnail preview */}
                    {thumbnailUrl && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">
                          Preview:
                        </p>
                        <div className="relative w-full h-24 overflow-hidden border border-muted rounded">
                          <Image
                            src={thumbnailUrl}
                            alt="Preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </div>
                    )}
                    {!isLocallyProcessed && processingProgress < 100 && (
                      <div className="space-y-2">
                        <Progress value={processingProgress} />
                        <p className="text-xs text-right text-muted-foreground">
                          Processing: {processingProgress}%
                        </p>
                      </div>
                    )}
                    {isLocallyProcessed &&
                      !isSubmitting &&
                      uploadProgress === 0 && (
                        <Badge
                          variant="outline"
                          className="border-accent/50 text-accent-foreground bg-accent/10"
                        >
                          Ready to Submit
                        </Badge>
                      )}
                    {isSubmitting && (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress}
                          className="[&>div]:bg-primary"
                        />
                        <p className="text-xs text-right text-muted-foreground">
                          Submitting: {uploadProgress}%
                        </p>
                      </div>
                    )}
                    {uploadProgress === 100 && !isSubmitting && (
                      <Badge
                        variant="default"
                        className="bg-primary text-primary-foreground"
                      >
                        Submitted!
                      </Badge>
                    )}
                  </>
                ) : value ? ( // Fallback to `value` prop if no internalFile
                  <>
                    <div className="flex items-center gap-3">
                      <File className="h-8 w-8 text-primary" />
                      <div className="flex-1 space-y-1">
                        <p
                          className="text-sm font-medium truncate"
                          title={value.name}
                        >
                          {value.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(value.size)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile} // This will call onChange(null)
                        disabled={disabled}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Thumbnail preview for uploaded file */}
                    {thumbnailUrl && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">
                          Preview:
                        </p>
                        <div className="relative w-full h-24 overflow-hidden border border-muted rounded">
                          <Image
                            src={thumbnailUrl}
                            alt="Preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <Badge
                      variant="default"
                      className="bg-primary/80 text-primary-foreground"
                    >
                      Uploaded
                    </Badge>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-4">
        {!internalFile &&
          !value && ( // Show "Select File" if no internal file and no external value
            <Button
              variant="outline"
              disabled={disabled || isSubmitting}
              onClick={() => fileInputRef.current?.click()}
            >
              Select File
            </Button>
          )}
        {internalFile &&
          isLocallyProcessed &&
          !isSubmitting &&
          uploadProgress < 100 && (
            <Button disabled={disabled || isSubmitting} onClick={handleSubmit}>
              Submit File
            </Button>
          )}
      </CardFooter>
    </Card>
  );
}
