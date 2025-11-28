// app/products/[id]/page.tsx
export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <article>
      <h1>产品详情 {params.id}</h1>
      <p>这里是产品 {params.id} 的详情。</p>
    </article>
  );
}
