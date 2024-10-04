import React from 'react'
import { Banner } from '../../../components/Banner'
import { CurrentShow } from '../../../components/CurrentShow';
import { ListShow } from '../../../components/ListShow';

const Home = () => {

    return (
        <>
            <Banner />
            <div className='container mx-auto'>
                {/* CurrentShow */}
                <CurrentShow />

                {/* list show */}
                <ListShow />
            </div>
        </>
    )
}

export default Home
