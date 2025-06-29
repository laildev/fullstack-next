"use client";

import { useParams } from "next/navigation";
import Modal from "@/components/core/Modal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TProduct } from "../../@modal/(.)detail/[id]/page";

export default function DetailProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<TProduct>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/product/?id=${id}`);
        const data = await res.json();
        setProduct(data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading || !product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Modal>
      <Image
        src={product.image}
        alt={product.title}
        width={500}
        height={500}
        className="w-full object-cover aspect-square col-span-2"
      />
      <div className="bg-white p-4 px-6">
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
      </div>
    </Modal>
  );
}
