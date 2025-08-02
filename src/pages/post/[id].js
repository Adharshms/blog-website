import React from 'react';
import Link from 'next/link';

export default function PostDetail({ post }) {
  if (!post) {
    return <div className="text-center mt-10 text-red-500">❌ Post not found.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <article className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{post.name}</h1>

        <img
          src={post.imageUrl}
          alt={post.name}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
          }}
        />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          By Unknown on <time>{post.formattedDate}</time>
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>{post.content}</p>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </article>
    </main>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles');
  const data = await res.json();

  const paths = data.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: true, // or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles/${params.id}`);
    const post = await res.json();

    return {
      props: {
        post: {
          ...post,
          formattedDate: new Date(post.createdAt).toISOString().split('T')[0],
          imageUrl: `https://picsum.photos/seed/${post.id}/600/400`,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('❌ Fetch error:', error);
    return {
      props: {
        post: null,
      },
    };
  }
}
