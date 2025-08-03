// app/post/[id]/page.js
import { notFound } from 'next/navigation';

export default async function PostPage({ params }) {
  const res = await fetch(`https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles/${params.id}`);
  if (!res.ok) return notFound();

  const post = await res.json();

  return (
    <main style={{ padding: '20px', color: '#fff', backgroundColor: '#141414', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', color: '#e50914' }}>{post.name}</h1>
      <p style={{ color: '#bbb', marginBottom: '20px' }}>
        Posted on {new Date(post.createdAt).toLocaleDateString('en-GB')}
      </p>
      <img src={`https://picsum.photos/seed/${post.id}/800/400`} alt={post.name} style={{ maxWidth: '100%', borderRadius: '10px' }} />
      <p style={{ marginTop: '20px', fontSize: '1.2rem', lineHeight: '1.6' }}>
        {post.description || 'No description available.'}
      </p>
    </main>
  );
}
