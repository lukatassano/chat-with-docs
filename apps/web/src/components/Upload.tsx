"use client";

import { DocumentType } from "@chat-with-docs/types";
import { useAIApi } from "@ui/api/ai.api";
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { Upload as UploadIcon } from "lucide-react";
import React, { useState, ChangeEvent } from "react";

export function Upload() {
  const api = useAIApi();

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const uploadFile = () => {
    if (selectedFile) {
      selectedFile
        .stream()
        .getReader()
        .read()
        .then(asd => {
          const decoder = new TextDecoder("utf-8");
          const fileDataString = decoder.decode(asd.value);
          console.log(fileDataString);
        });

      // api.post("/document", {
      //   payload: formData
      // } as DocumentType)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <UploadIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] flex items-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="">
            Upload file
          </Label>
          <Input
            id="picture"
            type="file"
            onChange={handleFileChange}
            accept=".pdf, .txt"
          />
        </div>
        <DialogFooter>
          <Button onClick={uploadFile}>Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
