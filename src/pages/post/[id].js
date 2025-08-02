import React from 'react';
import Link from 'next/link';

export default function PostDetail({ post }) {
  if (!post) {
    return <div>❌ Post not found.</div>;
  }

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{post.name}</h1>

      <img
        src={post.imageUrl}
        alt={post.name}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
        }}
      />

      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        By Unknown on {post.formattedDate}
      </p>

      <p style={{ marginTop: '1rem' }}>{post.content}</p>

      <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', color: '#0070f3' }}>
        ← Back to Home
      </Link>
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
