import Image from "next/image";

export default function BrowsePage() {
    const food = {name: "", price: 0}
    const items: Array<{name:string, price: number}> = Array(10).fill(food).map((f, i) => ({...f, name: `Item ${i+1}`, price: (i+1) * 100}))

  return <div>
    <h1>Browse</h1>
    <div className="grid grid-cols-3 gap-4">{items.map(item => <Card {...item}/>)}</div>
  </div>;
}

function Card(props:any) {
    const item = props
    return <div className="border-gray-400 border-2 rounded-md p-4">
      {/** tip: how to work with next's image compo. */ }
        <div className="border-red-400 border-4 relative w-full h-48"><Image className="" alt='' src="/food.jpg"   layout="fill" objectFit="contain"     /></div>
        <div>
            <h1>{item.name}</h1>
            <p>{item.price}</p>
        </div>
    </div>
}