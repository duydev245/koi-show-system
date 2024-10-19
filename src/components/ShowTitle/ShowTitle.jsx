import React from 'react'

const ShowTitle = ({ showName }) => {

    const defaultTitle = 'default show title'

    return (
        <>
            <h3 className='text-center text-3xl font-bold mb-5'>{showName ? `Welcome to ${showName}` : ''}</h3>
        </>
    )
}

export default ShowTitle
