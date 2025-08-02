import Head from 'next/head';
import Link from 'next/link';

export default function Home({ posts }) {
  const categories = ['Mountains', 'Cities', 'Beaches', 'Deserts', 'Forests'];

  return (
    <>
      <Head>
        <title>TravelStream | Explore the World</title>
        <meta
          name="description"
          content="Explore breathtaking travel blogs. Discover new destinations, cultures, and landscapes from around the world."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <main style={styles.main}>
        {/* Header */}
        <nav style={styles.header} role="navigation" aria-label="Main navigation">
          <div style={styles.headerLeft}>
            <h1 style={styles.logo}>TravelStream</h1>
          </div>
          <div style={styles.headerRight}>
            <Link href="/login" legacyBehavior>
              <a style={styles.loginButton}>Login / Sign Up</a>
            </Link>
          </div>
        </nav>

        {/* Hero Banner */}
        <section style={styles.hero} aria-label="Featured destination">
          <div style={styles.heroText}>
            <h2 style={styles.heroTitle}>Discover Breathtaking Places</h2>
            <p style={styles.heroSubtitle}>Adventure. Nature. Culture. All in one place.</p>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat, idx) => (
          <section key={cat} style={styles.categorySection} aria-labelledby={`category-${cat}`}>
            <h3 id={`category-${cat}`} style={styles.categoryTitle}>
              {cat}
            </h3>
            <div style={styles.categoryRow}>
              {posts.slice(idx * 2, idx * 2 + 4).map((post) => (
                <Link key={post.id} href={`/post/${post.id}`} legacyBehavior>
                  <a style={styles.card} aria-label={`Read post: ${post.name}`}>
                    <img
                      src={`https://picsum.photos/seed/${post.id + cat}/400/250`}
                      alt={`Scenic view representing ${post.name}`}
                      style={styles.image}
                    />
                    <div style={styles.cardContent}>
                      <h4 style={styles.title}>{post.name}</h4>
                      <p style={styles.meta}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Continue Reading */}
        <section style={styles.categorySection} aria-labelledby="continue-reading">
          <h3 id="continue-reading" style={styles.categoryTitle}>Continue Reading</h3>
          <div style={styles.categoryRow}>
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id + 'continue'} href={`/post/${post.id}`} legacyBehavior>
                <a style={styles.card} aria-label={`Continue reading: ${post.name}`}>
                  <img
                    src={`https://picsum.photos/seed/continue${post.id}/400/250`}
                    alt={`Preview image for ${post.name}`}
                    style={styles.image}
                  />
                  <div style={styles.cardContent}>
                    <h4 style={styles.title}>{post.name}</h4>
                    <p style={styles.meta}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} TravelStream. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

const styles = {
  main: {
    backgroundColor: '#141414',
    color: '#fff',
    fontFamily: 'Helvetica Neue, sans-serif',
    minHeight: '100vh',
    paddingBottom: '40px',
  },
  header: {
    padding: '30px 40px',
    backgroundColor: '#000',
    borderBottom: '2px solid #e50914',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {},
  logo: {
    fontSize: '2.5rem',
    color: '#e50914',
    margin: 0,
  },
  loginButton: {
    backgroundColor: '#e50914',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
  hero: {
    backgroundImage: 'url(https://picsum.photos/seed/travelhero/1200/500)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  heroText: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '20px 40px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '2.5rem',
    margin: 0,
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginTop: '10px',
    color: '#ccc',
  },
  categorySection: {
    padding: '0 40px',
    marginBottom: '30px',
  },
  categoryTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    borderLeft: '5px solid #e50914',
    paddingLeft: '10px',
  },
  categoryRow: {
    display: 'flex',
    overflowX: 'auto',
    gap: '20px',
    paddingBottom: '10px',
  },
  card: {
    flex: '0 0 auto',
    width: '250px',
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    overflow: 'hidden',
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    transition: 'transform 0.3s ease',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '10px 15px',
  },
  title: {
    fontSize: '1.1rem',
    marginBottom: '5px',
    color: '#fff',
  },
  meta: {
    fontSize: '0.8rem',
    color: '#bbb',
  },
  footer: {
    textAlign: 'center',
    color: '#888',
    padding: '20px 0',
    fontSize: '0.9rem',
  },
};

export async function getStaticProps() {
  const res = await fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles');
  const data = await res.json();

  // Pre-format date strings to avoid hydration mismatch
  const posts = data.map((post) => ({
    ...post,
    formattedDate: new Date(post.createdAt).toLocaleDateString('en-GB'), // dd/mm/yyyy
  }));

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

