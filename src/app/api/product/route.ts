import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 1,
    title: 'anke boots',
    price: 89.4,
    image: `https://res.cloudinary.com/dqbstxcjx/image/upload/v1749793853/ecommerce/z1liouemtdxfmaetng3l.jpg`
  },
  {
    id: 2,
    title: 'hiking boots',
    price: 90.5,
    image: `https://res.cloudinary.com/dqbstxcjx/image/upload/v1749793853/ecommerce/z1liouemtdxfmaetng3l.jpg`
  },
  {
    id: 3,
    title: 'hiking boots',
    price: 96.5,
    image: `https://res.cloudinary.com/dqbstxcjx/image/upload/v1749793853/ecommerce/z1liouemtdxfmaetng3l.jpg`
  },
  {
    id: 4,
    title: 'hiking boots',
    price: 96.5,
    image: `https://res.cloudinary.com/dqbstxcjx/image/upload/v1749793853/ecommerce/z1liouemtdxfmaetng3l.jpg`
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailProduct = data.find((item) => item.id === Number(id))
    if(detailProduct) {
      return NextResponse.json({ status: 200, message: "success", data: detailProduct })
    } else {
      return NextResponse.json({ status: 404, message: "not found", data: {}})
    }
  }

  return NextResponse.json({ status: 200, message: "success", data })
} 