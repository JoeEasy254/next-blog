import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BookOpen } from "lucide-react";
import { Article } from "@prisma/client";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <div className="border p-2">
            <h1 className="text-xl mb-4">{article.title}</h1>
          </div>
        </CardHeader>

        <CardContent>
          <div
            className="line-clamp-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </CardContent>

        <CardFooter>
          <div className="flex flex-row space-x-3 mt-3">
            <Link href={`/article/${article.id}`}>
              <BookOpen />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
