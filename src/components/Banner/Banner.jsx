import React from 'react'

const Banner = ({ bannerShow }) => {

    const defaultBanner = "/bg-koi-1.jpg";

    return (
        <div className='xs:h-[300px] md:h-[420px] mb-8'>
            <img src={bannerShow ? bannerShow : defaultBanner} className='w-screen h-full object-center' />
        </div>
    )
}

export default Banner
