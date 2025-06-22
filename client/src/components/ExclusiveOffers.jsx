import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-28'>
      <div className='w-full flex items-start justify-between'>
        {/* Left: Title + Subtitle */}
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-semibold font-playfair'>Exclusive Offers</h2>
          <p className='text-sm text-gray-500 mt-2'>
            Take advantage of our limited-time offers and special packages to enhance your stay and
            create unforgettable memories.
          </p>
        </div>

        {/* Right: Button */}
        <button className='group flex items-center gap-2 font-medium cursor-pointer whitespace-nowrap'>
          View All Offers
          <img
            src={assets.arrowIcon}
            alt='arrow-icon'
            className='group-hover:translate-x-1 transition-all'
          />
        </button>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full'>
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-16 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center'
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>
              {item.priceOff}% OFF
            </p>
            <div>
              <p className='text-2xl font-medium font-playfair'>{item.title}</p>
              <p>{item.description}</p>
              <p className='text-xs text-white/70 mt-3'>Expires {item.expiryDate}</p>
            </div>
            <button className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5'>
              View Offers
              <img
                className='invert group-hover:translate-x-1 transition-all'
                src={assets.arrowIcon}
                alt='arrow-icon'
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExclusiveOffers
