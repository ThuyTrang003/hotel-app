import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { StarIcon, ChevronRightIcon } from '@heroicons/react/24/solid';


const FAVORITEROOMS=[
    {
        id:"1",
        title:"Single Room",
        price:"2400",
        URL:"/images/image1.jpg",
        description:"Đẹp lắm"
    },
    {
        id:"2",
        title:"Single Room",
        price:"2400",
        URL:"/images/image1.jpg",
        description:"Đẹp lắm"
    }
]

const FavoriteRooms = () => {
  return (
    <section className="py-16 xl:py-28 bg-slate-10 bg-[#F1F0ED]">
        <div className="text-center mx-4">
            <h1 className="text-2xl font-medium text-gray-700">OUR FAVORITE ROOMS</h1>
            <p className="text-lg text-gray-400 mt-2">Check out now our best rooms</p>
        </div>
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-12 mx-25'>
            {FAVORITEROOMS.map((item)=>(
                <FavoriteRoomItem
                    key={item.id}
                    URL={item.URL}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                />
            ))}
        </div>
        <div className="text-left flex justify-center py-4">
            <Link href="/room" className="inline-block px-6 py-3 text-white font-semibold bg-[#d7b263] rounded-md shadow-md hover:bg-[#caa354] transition-colors">
              View All Rooms
              <ChevronRightIcon className="w-4 h-4 ml-2 inline-block" />
            </Link>
          </div>
  </section>
  )
}
type FavoriteRoomItem={
    URL:string,
    title:string,
    price:string,
    description:string,
}

const FavoriteRoomItem = ({ id, URL, title, price, description }: FavoriteRoomItem) => {
    return (
      <div className='overflow-hidden rounded-tl-xl rounded-tr-xl border border-slate-200 group'>
        <Link href={`/room/${id}`} className='overflow-hidden relative'>
          <Image src={URL} height={366} width={640} alt='img' />
          <span className='bold-16 text-white bg-black absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 
            px-8 py-2 rounded-full group-hover:bg-[#FF813F]'>
            $ {price}
          </span>
        </Link>
        <div className='p-4 bg-white'>
          <div className='capitalize medium-22'>
            <span>{title}</span>
          </div>
          <hr className='mt-3' />
          <p className='my-3 line-clamp-3 overflow-hidden text-ellipsis'>
            {description}
          </p>
          <hr className='mb-3' />
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <StarIcon className='h-5 w-5 text-yellow-500' />
              <span className='medium-16'>(222)</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default FavoriteRooms
