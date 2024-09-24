import React from 'react'

const KoiTitle = ({ koiName }) => {

    const defaultTitle = 'default koi title'

    return (
        <>
            <h3 className='text-center text-4xl font-bold my-5'>{koiName ? koiName : defaultTitle}</h3>
        </>
    )
}

export default KoiTitle
