"use client";
import EditArticle from "@/components/cards/edit-article";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, useUser } from "@clerk/nextjs";
import { Article as ArticleType } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Article({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const authUser = useUser();
  const router = useRouter();

  const [article, setArticle] = useState<ArticleType>();

  const fetchArticle = async () => {
    const data = await fetch(`/api/article?id=${params.id}`);

    const article = await data.json();

    setArticle(article);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const removeArticle = async () => {
    try {
      await fetch("/api/article", {
        method: "DELETE",
        body: JSON.stringify({
          id: params.id,
          userId: article?.userId,
        }),
      });

      toast.success("Article removed");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-end">
          <SignedIn>
            <div
              className={cn(
                `${
                  authUser.user?.id == article?.userId
                    ? "flex flex-row-space-x-2 items-center mt-4 border-t-2"
                    : "hidden"
                }`
              )}
            >
              <Button
                onClick={removeArticle}
                variant={"ghost"}
                className="mt-2"
              >
                <Trash />
              </Button>

              {article && <EditArticle data={article} />}
            </div>
          </SignedIn>
        </div>

        <h1 className="text-2xl my-4">{article?.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: String(article?.content) }} />
      </div>
    </>
  );
}
