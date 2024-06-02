"use client";
import { Article, User } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import Link from "next/link";

interface CollapsibleUserDataProps {
  user: User & {
    articles: Article[];
  };
}

export default function CollapsibleUserData({
  user,
}: CollapsibleUserDataProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          {`${user.name} has ${user.articles.length} articles`}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {user.articles.map((article, index) => {
          return (
            <div
              key={index}
              className="rounded-md border px-4 py-3 font-mono text-sm"
            >
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
