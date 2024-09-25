import React from 'react'

const ShowTitle = ({ showName }) => {

    const defaultTitle = 'default show title'

    return (
        <>
            <h3 className='text-center text-3xl font-bold mb-5'>Welcome to {showName ? showName : defaultTitle}</h3>
        </>
    )
}

export default ShowTitle
