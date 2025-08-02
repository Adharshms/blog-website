// pages/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles')
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((post, i) => ({
          ...post,
          formattedDate: new Date(post.createdAt).toISOString().split('T')[0],
          imageUrl: `https://picsum.photos/seed/${i}/600/400`,
        }));
        setPosts(updated);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-800 mb-2">My Blog</h1>
          <p className="text-gray-600">Read curated blog posts from a mock API</p>

          {/* Search Bar */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        {/* Blog Grid */}
        <section className="grid gap-8 md:grid-cols-2">
          {filteredPosts.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">No posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                  <img
                    src={post.imageUrl}
                    alt={post.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-blue-800 hover:underline">
                      {post.name}
                    </h2>
                    <div className="mt-1 text-sm text-gray-500">
                      <span>By Unknown</span> · <time>{post.formattedDate}</time>
                    </div>
                    <p className="mt-3 text-gray-700">
                      {post.content?.slice(0, 120) ?? ''}...
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
