'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const categories = ['Mountains', 'Cities', 'Beaches', 'Deserts', 'Forests'];

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles');
      const data = await res.json();
      const formatted = data.map((post) => ({
        ...post,
        formattedDate: new Date(post.createdAt).toLocaleDateString('en-GB'),
      }));
      setPosts(formatted);
    }

    fetchPosts();
  }, []);

  return (
    <main style={styles.main}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>TravelStories</h1>
        </div>
        <div style={styles.nav}>
<Link href="/login" className="button">
            Login
          </Link>
<Link href="/login" className="button">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
     <section style={styles.hero}>
  <div style={styles.heroOverlay}>
    <h2 style={styles.heroTitle}>Explore the World Through Stories</h2>
     
  
    <Link href="/login" style={styles.ctaButton}>
      Start Your Journey
    </Link>
  </div>
</section>


      {/* Category Sections */}
      {categories.map((cat, idx) => (
        <section key={cat} style={styles.categorySection}>
          <h3 style={styles.categoryTitle}>{cat}</h3>
          <div style={styles.grid}>
            {posts.slice(idx * 2, idx * 2 + 4).map((post) => (
<Link key={post.id} href={`/post/${post.id}`} className="card">
                <img
                  src={`https://picsum.photos/seed/${post.id + cat}/400/250`}
                  alt={post.name}
                  style={styles.image}
                />
                <div style={styles.cardContent}>
                  <h4 style={styles.title}>{post.name}</h4>
                  <p style={styles.meta}>{post.formattedDate}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} TravelStream. All rights reserved.</p>
      </footer>
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: '#111',
    color: '#fff',
    fontFamily: `'Inter', sans-serif`,
    paddingBottom: '40px',
  },
  header: {
    backgroundColor: '#000',
    padding: '20px 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #e50914',
    flexWrap: 'wrap',
  },
  logoContainer: {
    flex: '1 1 auto',
  },
  logo: {
    color: '#e50914',
    fontSize: '2rem',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '10px 18px',
    backgroundColor: '#e50914',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 600,
  },
  navButtonOutline: {
    padding: '10px 18px',
    backgroundColor: 'transparent',
    color: '#e50914',
    border: '2px solid #e50914',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 600,
  },
  hero: {
    position: 'relative',
    height: '60vh',
    backgroundImage: 'url(https://picsum.photos/seed/heroBanner/1200/700)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '30px 20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '700px',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '15px',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#ccc',
    marginBottom: '25px',
  },
  ctaButton: {
    backgroundColor: '#e50914',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'background 0.3s ease',
  },
  categorySection: {
    padding: '40px 5%',
  },
  categoryTitle: {
    fontSize: '1.8rem',
    borderLeft: '5px solid #e50914',
    paddingLeft: '12px',
    marginBottom: '25px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '12px 15px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  meta: {
    fontSize: '0.85rem',
    color: '#aaa',
    marginTop: '5px',
  },
  footer: {
    textAlign: 'center',
    color: '#888',
    padding: '30px 0',
    fontSize: '0.9rem',
  },

  hero: {
  position: 'relative',
  backgroundImage: 'url(https://picsum.photos/seed/travelhero/1600/700)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderBottom: '4px solid #e50914',
},

heroOverlay: {
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))',
  padding: '40px',
  borderRadius: '12px',
  color: '#fff',
  maxWidth: '90%',
  width: '600px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
},

heroTitle: {
  fontSize: '2.8rem',
  marginBottom: '20px',
  fontWeight: 'bold',
  lineHeight: '1.3',
},

heroSubtitle: {
  fontSize: '1.2rem',
  marginBottom: '25px',
  color: '#ccc',
},

ctaButton: {
  display: 'inline-block',
  padding: '14px 28px',
  backgroundColor: '#000000ff',
  color: '#fff',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textDecoration: 'none',
  transition: 'background-color 0.3s, transform 0.2s',
},

};
