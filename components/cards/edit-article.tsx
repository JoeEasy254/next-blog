"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import "react-quill/dist/quill.snow.css";
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

interface EditArticleProps {
  data: {
    title: string;
    content: string;
    userId: string;
    id: number;
  };
}

export default function EditArticle({ data }: EditArticleProps) {
  const formRef = useRef(null);
  const { title, userId, id, content } = data;

  const [value, setValue] = useState(content);

  const router = useRouter();

  const onEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current!);

      const titleVal = formData.get("title");

      const data = await fetch("/api/article", {
        method: "put",
        body: JSON.stringify({
          title: titleVal,
          id,
          content: value,
          userId,
        }),
      });
      const result = await data.json();
      toast.success(result);

      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="mt-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Edit />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>

            <DialogDescription>
              Make changes to your article here. click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form ref={formRef} onSubmit={onEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">title</Label>
                <Input
                  name="title"
                  className="cols-span-3"
                  defaultValue={title}
                />
              </div>
            </div>

            <ReactQuill modules={modules} value={value} onChange={setValue} />

            <Button type="submit" className="mt-3">
              Save changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
