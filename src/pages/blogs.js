import React from 'react';

export default function Blog({ posts }) {
  if (!Array.isArray(posts)) {
    return <div>Error: Unexpected data format from API.</div>;
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Mock Blog Posts
      </h1>
      {posts.length === 0 && <p>No blog posts found.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h2>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            By {post.author} on {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          <p style={{ fontSize: '1rem', color: '#333' }}>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles');
    const data = await res.json();

    console.log("Fetched from MockAPI:", data); // <- Check this in your terminal

    return {
      props: {
        posts: Array.isArray(data) ? data : [], // safe fallback
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
