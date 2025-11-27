const products = [
  { id: 1, name: "笔记本电脑" },
  { id: 2, name: "智能手机" },
  { id: 3, name: "无线耳机" },
];

export default function ProductListPage() {
  return (
    <div className='bg-gray-100 p-4 rounded-md'>
      <h2 className='text-2xl font-bold mb-4'>商品列表</h2>
      <ul className='list-inside'>
        {products.map((product) => (
          <li key={product.id} className='text-lg'>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
