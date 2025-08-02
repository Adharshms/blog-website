import React from 'react';
import Link from 'next/link';

export default function Blog({ posts }) {
  if (!Array.isArray(posts)) {
    return (
      <div className="text-center mt-10 text-red-500">
        ❌ Error: Unexpected data format from API.
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Blog Posts
      </h1>

      {posts.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No blog posts found.</p>
      )}

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-md transition duration-200 bg-white dark:bg-gray-900"
          >
            <Link href={`/post/${post.id}`} className="block space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white hover:underline">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                By {post.author || 'Unknown'} on{' '}
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
              </p>

              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {post.content}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles');
    const data = await res.json();

    return {
      props: {
        posts: Array.isArray(data) ? data : [],
      },
      revalidate: 3600, // revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
