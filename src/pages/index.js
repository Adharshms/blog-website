// app/page.js (or pages/index.js for Pages Router)

import Link from 'next/link';

export default function Home({ posts }) {
  if (!Array.isArray(posts)) {
    return <div className="text-red-600 text-center mt-10">❌ Error: API did not return an array.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Mock Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white hover:bg-gray-50 cursor-pointer">
                <img
                  src={post.imageUrl}
                  alt={post.name}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                  }}
                />
                <div className="p-5">
                  <h2 className="text-2xl font-semibold mb-2">{post.name}</h2>
                  <p className="text-sm text-gray-500 mb-3">By Unknown on {post.formattedDate}</p>
                  <p className="text-gray-700">{post.content?.slice(0, 100) ?? ''}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles');
    const data = await res.json();

    const formattedPosts = data.map((post, index) => ({
      ...post,
      formattedDate: new Date(post.createdAt).toISOString().split('T')[0],
      imageUrl: `https://picsum.photos/seed/${index}/600/400`,
    }));

    return {
      props: {
        posts: Array.isArray(formattedPosts) ? formattedPosts : [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('❌ Fetch error:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
