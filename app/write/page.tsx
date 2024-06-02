"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
export default function WriteArticle() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const onPublish = async () => {
    try {
      await fetch("/api/article", {
        method: "post",
        body: JSON.stringify({
          title: titleRef.current?.value,
          content: value,
        }),
      });

      toast.success("Article created");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      <Input type="text" name="title" ref={titleRef} />
      <ReactQuill modules={modules} value={value} onChange={setValue} />

      <Button onClick={onPublish}>Publish</Button>
    </div>
  );
}
