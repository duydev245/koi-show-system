import React, { useEffect, useState } from 'react'
import { Banner } from '../../../components/Banner'
import CurrentShow from './CurrentShow';
import ListShow from './ListShow';
import { useMutation, useQuery } from '@tanstack/react-query';
import { showApi } from '../../../apis/show.api';
import { LoadingComponent } from '../../../components/LoadingComponent';
import { message, Pagination } from 'antd';
import { SearchForm } from '../../../components/SearchForm';
import { PAGE_SHOW_SIZE } from '../../../constants';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalSize, setTotal] = useState(4);
    const [dataList, setDataList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const [messageApi, contextHolder] = message.useMessage();

    // lấy listShowRecent
    const { data: listShow, isLoading, error } = useQuery({
        queryKey: ['list-show'],
        queryFn: () => showApi.getListShow(),
    })

    const currentShow = listShow?.[0];
    const dataListShow = listShow?.filter(show => show !== currentShow) || [];

    useEffect(() => {
        if (listShow) {
            setDataList(dataListShow);
        }
    }, [listShow]);

    // search show api
    const { mutate: handleSearch, isPending: isPendingSearch } = useMutation({
        mutationFn: (payload) => showApi.getListSearchShow({ ...payload, pageIndex: currentPage }),
        onSuccess: (data) => {
            setTotal(data?.payload.totalItems)
            setDataList(data?.payload.shows);
        },
        onError: (error) => {
            messageApi.open({
                content: "Waiting...",
                type: "error",
                duration: 3,
            });
        },
    });

    // handle pagination về 1 khi search 1 key mới
    const onSearch = (payload) => {
        setCurrentPage(1);
        setSearchKeyword(payload.keyword);
        handleSearch(payload);
    };


    if (!listShow && isLoading && error) {
        return <LoadingComponent />
    }

    return (
        <>
            {contextHolder}
            {/* <Banner /> */}
            <div className='container mx-auto'>
                {/* CurrentShow */}
                <CurrentShow key={currentShow?.showId} currentShow={currentShow} />

                <h3 className='text-start text-3xl font-bold mb-5'>Recent Show:</h3>

                {/* Search Bar */}
                <SearchForm
                    handleSearch={onSearch}
                />

                {/* list show */}
                <ListShow dataList={dataList} isPending={isPendingSearch} />

                <Pagination
                    className='m-2'
                    align="end"
                    total={totalSize}
                    simple
                    pageSize={PAGE_SHOW_SIZE}
                    current={currentPage}
                    onChange={(page) => {
                        setCurrentPage(page);
                        handleSearch({ keyword: searchKeyword, pageIndex: page });
                    }}
                    showSizeChanger={false}
                />

            </div>
        </>
    )
}

export default Home
