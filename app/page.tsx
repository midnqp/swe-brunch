import { PageLayout } from "@/components/page";
import Image from "next/image"

export default function BrowsePage() {
  const food = {
    name: "",
    price: 0,
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  }
  const items: Array<{ name: string; price: number }> = Array(10)
    .fill(food)
    .map((f, i) => ({ ...f, name: `Item ${i + 1}`, price: (i + 1) * 100 }))

  return (
    <PageLayout>
      <h1 className="mb-8 text-4xl">Browse</h1>
      {/** tip: ideal layout for item menus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card {...item} />
        ))}
      </div>
    </PageLayout>
  )
}


function Card(props: any) {
  const item = props
  return (
    <div className="border-gray-400 border-2 rounded-md p-4">
      {/** tip: how to work with next's image compo. */}
      <div className="relative w-full h-48">
        <Image
          className=""
          alt=""
          src="/food.jpg"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div>
        <p className="font-bold">{item.name}</p>
        <p>${item.price}</p>
        <p>{item.description}</p>
      </div>
    </div>
  )
}
