import React, { useState } from 'react'
import { Banner } from '../../../components/Banner'
import CurrentShow from './CurrentShow';
import ListShow from './ListShow';
import { useQuery } from '@tanstack/react-query';
import { showApi } from '../../../apis/show.api';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: listShow, isLoading, error } = useQuery({
        queryKey: ['list-show'],
        queryFn: () => showApi.getListShow(),
    })

    let currentShow = listShow?.[0];
    let dataList = listShow?.filter(show => show !== currentShow) || [];

    return (
        <>
            <Banner />
            <div className='container mx-auto'>
                {/* CurrentShow */}
                <CurrentShow key={currentShow?.showId} currentShow={currentShow} />

                {/* list show */}
                <ListShow dataList={dataList} />
            </div>
        </>
    )
}

export default Home
