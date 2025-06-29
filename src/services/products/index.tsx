export async function getData(URL: string) {
  // const result = await fetch(`https://fakestoreapi.com/products`, {
  //   cache: 'no-store'
  // });
  const result = await fetch(URL, {
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