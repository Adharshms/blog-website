'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/splash'); // Redirect to splash
  }, [router]);

  return null; // Don't render anything
}
