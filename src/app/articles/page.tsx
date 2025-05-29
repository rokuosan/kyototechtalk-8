'use client'

import { apiClient } from "@/api/client/csr";
import { Article } from "@/types";
import { useEffect, useState, useCallback } from "react";

function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.api.articles.$get();
      const data = await res.json();
      setArticles(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: fetchArticles };
}

export default function ArticlesPage() {
  const { articles, loading, error } = useArticles();

  return (
    <div className="p-5 container mx-auto max-w-xl">
      <h1 className="text-2xl font-bold mb-5 dark:text-white text-black">Articles(CSR)</h1>
      {loading && <div className="text-gray-400">Loading...</div>}
      {error && <div className="text-red-400">Error: {error}</div>}
      <div className="mt-5">
        {articles.map((article) => (
          <div key={article.id} className="border border-gray-700 p-3 mb-3 rounded text-gray-200 bg-gray-800">
            <div className="text-lg font-semibold mb-2">{article.title}</div>
            <div className="text-sm text-gray-400">{article.content}</div>
            <div className="text-sm text-gray-400">{article.created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
