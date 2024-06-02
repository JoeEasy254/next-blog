"use client";

import { Article } from "@prisma/client";
import ArticleCard from "./article-card";
import { useEffect, useState } from "react";
import PaginatePages from "../Pagination";

export default function ArticlesCard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const articlesPerPage = 2;

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/article?all=true");

      const data = await response.json();
      const totalArticle = Math.ceil(data.length / articlesPerPage);

      setTotalPages(totalArticle);
      setArticles(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="flex space-x-3 flex-wrap">
      {currentArticles.map((article, i) => (
        <ArticleCard article={article} key={i} />
      ))}

      <PaginatePages
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
}
