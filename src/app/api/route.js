 // app/api/inshorts/route.js
export async function GET() {
  const res = await fetch('https://inshortsapi.vercel.app/news?category=technology');

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch from Inshorts API' }), { status: 500 });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
