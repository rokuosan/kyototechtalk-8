import { ssrClient } from "@/api/client/ssr";

export default async function ArticlesSSRPage() {
  const cli = await ssrClient();
  const res = await cli.api.articles.$get();
  const articles = await res.json();

  return <div className="p-5 container mx-auto max-w-xl">
    <h1 className="text-2xl font-bold mb-5 text-black dark:text-white">Articles(SSR)</h1>
    <div className="mt-5">
      {articles.map((article) => (
        <div key={article.id} className="border border-gray-700 p-3 mb-3 rounded text-gray-200 bg-gray-800">
          <div className="text-lg font-semibold mb-2">{article.title}</div>
          <div className="text-sm text-gray-400">{article.content}</div>
          <div className="text-sm text-gray-400">{article.created_at}</div>
        </div>
      ))}
    </div>
  </div>;
}
