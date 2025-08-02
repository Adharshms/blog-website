import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleGuest = () => {
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email"
            style={styles.input}
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <button onClick={handleGuest} style={styles.guest}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'url(https://picsum.photos/seed/travelblog/1600/900) no-repeat center center',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: '40px 30px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '340px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  title: {
    color: '#fff',
    marginBottom: '25px',
    fontSize: '28px',
  },
  label: {
    display: 'block',
    color: '#aaa',
    textAlign: 'left',
    marginBottom: '6px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#e50914',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  guest: {
    marginTop: '18px',
    color: '#bbb',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
    transition: 'color 0.2s ease',
  },
};
