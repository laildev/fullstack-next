import Link from 'next/link';
import React from 'react'
// type DetailProductPageProps = { params: { slug: string[] } }

interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number, count: number }
}

async function getData() {
  // const result = await fetch(`https://fakestoreapi.com/products`, {
  //   cache: 'no-store'
  // });
  const result = await fetch(`http://localhost:3000/api/product`, {
    cache: "no-store",
    next: {
      tags: ["products"]
      // revalidate: 30
    }
  });


  if (!result.ok) {
    throw new Error("failed to fetsh data")
  }

  return result.json();
}

const DetailProductPage = async () => {
  const products = await getData();

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-10">
            {products?.data?.length > 0 && products?.data?.map((product: IProduct) => (
              <Link href="#" className="group" key={product.id}>
                <img src={product.image} alt={product.title} className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" width={500} height={384}/>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
              </Link>
            ))} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProductPage