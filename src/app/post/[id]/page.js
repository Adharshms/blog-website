// app/post/[id]/page.js
import { notFound } from 'next/navigation';

export default async function PostPage({ params }) {
  const res = await fetch(`https://688d9d7da459d5566b12b8d8.mockapi.io/blog/articles/${params.id}`);
  if (!res.ok) return notFound();

  const post = await res.json();

  return (
    <main style={styles.container}>
      <article style={styles.article}>
        <h1 style={styles.title}>{post.name}</h1>
        <p style={styles.date}>
          Posted on {new Date(post.createdAt).toLocaleDateString('en-GB')}
        </p>
        <img
          src={`https://picsum.photos/seed/${post.id}/800/400`}
          alt={post.name}
          style={styles.image}
        />
        <div style={styles.content}>
          <p>{post.description || dummyContent[0]}</p>
          {dummyContent.slice(1).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}

const styles = {
  container: {
    padding: '1rem',
    backgroundColor: '#141414',
    color: '#ffffff',
    minHeight: '100vh',
    fontFamily: 'system-ui, sans-serif',
    lineHeight: 1.7,
  },
  article: {
    maxWidth: '768px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    color: '#e50914',
    marginBottom: '0.5rem',
  },
  date: {
    color: '#aaa',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    marginBottom: '1.5rem',
  },
  content: {
    fontSize: '1.05rem',
    color: '#eee',
  },
};

const dummyContent = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac erat vitae metus commodo feugiat. In hac habitasse platea dictumst.',
  'Quisque sit amet dui nec velit pharetra gravida. Sed fermentum magna at dui viverra, non elementum nisl malesuada.',
  'Aliquam erat volutpat. Donec non turpis nec mi tincidunt lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
  'Proin sit amet lorem in augue fermentum tincidunt. Etiam a volutpat velit. Nulla at diam eget risus sollicitudin faucibus.',
  'Mauris dapibus odio ac purus vestibulum, sed dignissim nisl dapibus. Integer facilisis porttitor neque, nec dignissim erat dapibus in.',
  'Suspendisse potenti. Fusce vel leo nec elit dignissim tempus non sit amet erat.',
];
