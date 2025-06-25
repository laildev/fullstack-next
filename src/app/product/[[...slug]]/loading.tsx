import Link from "next/link";

export default function Loading() {
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-10">
              {[1,2,3,4].map((value) => (
              <Link href="#" className="group" key={value}>
                <img src={""} alt="" className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" width={500} height={384}/>
                <h3 className="mt-4 text-sm text-gray-700"></h3>
                <p className="mt-1 text-lg font-medium text-gray-900"></p>
              </Link>
              ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}