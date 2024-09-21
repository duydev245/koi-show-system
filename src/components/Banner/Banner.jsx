import React from 'react'

const Banner = ({ bannerShow }) => {

    const defaultBanner = "/bgAuth.jpg";

    return (
        <div className='xs:h-[300px] md:h-[500px] 2xl:h-[700px] mb-8'>
            <img src={bannerShow ? bannerShow : defaultBanner} className='w-screen h-full object-center' />
        </div>
    )
}

export default Banner
