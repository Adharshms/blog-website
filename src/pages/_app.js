// src/pages/_app.js
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DevBlog</title>
        <meta name="description" content="Minimal blog built with Next.js and Tailwind CSS" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
