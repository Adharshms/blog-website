'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home'); // Navigate after 3s
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes netflixIntro {
          0% {
            opacity: 0;
            transform: scale(0.7);
            filter: blur(4px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div style={styles.logoWrapper}>
        <span style={styles.logoText}>N</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    animation: 'netflixIntro 2s ease-in-out',
  },
  logoText: {
    fontSize: '10rem',
    color: '#e50914',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textShadow: '0 0 20px #e50914',
  },
};
