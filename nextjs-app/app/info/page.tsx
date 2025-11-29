// app/info/page.tsx
import { headers, cookies } from "next/headers";

export default async function Info() {
  const h = headers();
  const lang = (await h).get("accept-language");
  const token = (await cookies()).get("auth_token")?.value;
  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>请求头与 Cookie</h1>
      <pre>{JSON.stringify({ lang, hasToken: !!token }, null, 2)}</pre>
    </main>
  );
}
