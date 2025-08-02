import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) return <p style={styles.loading}>Loading...</p>;
  if (!post) return <p style={styles.error}>Post not found.</p>;

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        .blog-container {
          padding: 20px !important;
        }
        .blog-title {
          font-size: 2rem !important;
        }
        .blog-meta, .blog-article {
          font-size: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const metaDesc = post.content?.slice(0, 150) || 'Explore insightful articles on travel, design, and storytelling.';

  return (
    <>
      <Head>
        <title>{post.name} | StreamBlog</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={post.name} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main style={styles.main}>
        <article className="blog-container" style={styles.container}>
          <header>
            <Link href="/" legacyBehavior>
              <a style={styles.backLink}>← Back to Home</a>
            </Link>
            <h1 className="blog-title" style={styles.title}>{post.name}</h1>
            <p className="blog-meta" style={styles.meta}>
              Published on <time dateTime={post.formattedDate}>{post.formattedDate}</time> · By Admin
            </p>
          </header>

          <img
            src={post.imageUrl}
            alt={post.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Image';
            }}
            style={styles.image}
          />

          <section className="blog-article" style={styles.article}>
            <p>
              Welcome to your exclusive blog feed. This post dives into how digital storytelling reshapes our daily media diet — from newsletters to video-driven content.
            </p>
            <p>
              Whether you're binging code tutorials or documenting travel, creating strong visual hierarchy is key. Just like Netflix curates thumbnails and categories, your blog layout can do the same for your readers.
            </p>

            <blockquote style={styles.blockquote}>
              “Content is king, but design is the kingdom.” — Anonymous Designer
            </blockquote>

            <h2>Visual Impact</h2>
            <p>
              Netflix’s clean typography, full-width images, and focus on dark UI inspire this blog’s design. The dark mode isn't just trendy — it’s easier on the eyes and elevates visuals.
            </p>

            <h2>Content Flow</h2>
            <p>
              Storytelling should flow like a great series. Hook your reader early, maintain pacing, and deliver a satisfying conclusion.
            </p>

            <h2>Final Scene</h2>
            <p>
              We hope this blog experience feels as binge-worthy as your favorite show. 🎬
            </p>
          </section>
        </article>
      </main>
    </>
  );
}

// === Styling (Dark Theme, Netflix Style) ===
const styles = {
  main: {
    minHeight: '100vh',
    backgroundColor: '#141414',
    color: '#ffffff',
    padding: '40px 20px',
    fontFamily: '"Helvetica Neue", sans-serif',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#1e1e1e',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '20px',
    color: '#e50914',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#ffffff',
  },
  meta: {
    fontSize: '0.95rem',
    color: '#b3b3b3',
    marginBottom: '30px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '30px',
    border: '1px solid #333',
  },
  article: {
    lineHeight: '1.7',
    fontSize: '1.1rem',
    color: '#e5e5e5',
  },
  blockquote: {
    margin: '30px 0',
    padding: '15px 20px',
    borderLeft: '4px solid #e50914',
    backgroundColor: '#2c2c2c',
    fontStyle: 'italic',
    color: '#ddd',
  },
  loading: {
    textAlign: 'center',
    marginTop: '100px',
    color: '#e50914',
  },
  error: {
    textAlign: 'center',
    marginTop: '100px',
    color: 'red',
  },
};

export async function getStaticPaths() {
  const res = await fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles');
  const data = await res.json();

  const paths = data.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
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
          name: post.name || 'Untitled Blog Post',
          content: post.content || 'No content found.',
          formattedDate: new Date(post.createdAt).toISOString().split('T')[0],
          imageUrl: `https://picsum.photos/seed/${post.id}/800/400`,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: { post: null },
    };
  }
}
