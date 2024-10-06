import React, { useEffect, useState } from 'react'
import 'animate.css'
import { Card, Col, message, Pagination, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '../../../components/SearchForm';
import { PAGE_SHOW_SIZE } from '../../../constants';
import { useMutation } from '@tanstack/react-query';
import { showApi } from '../../../apis/show.api';
import { LoadingComponent } from '../../../components/LoadingComponent';

const ListShow = ({ dataList, isPending }) => {
    // console.log("🚀 ~ ListShow ~ dataList:", dataList)
    const { Text } = Typography;
    const navigate = useNavigate();
    // const [messageApi, contextHolder] = message.useMessage();

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalSize, setTotal] = useState(4);
    const [listShow, setListShow] = useState([])

    // search show api
    // const { mutate: handleSearch, isPending: isPendingSearch } = useMutation({
    //     mutationFn: (payload) => showApi.getListSearchShow({ ...payload, pageIndex: currentPage }),
    //     onSuccess: (data) => {
    //         console.log("🚀 ~ ListShow ~ data:", data.payload)
    //         setTotal(data?.payload.totalItems)
    //         setDataList(data?.payload.shows);
    //     },
    //     onError: (error) => {
    //         messageApi.open({
    //             content: error?.message,
    //             type: "error",
    //             duration: 3,
    //         });
    //     },
    // });

    useEffect(() => {
        setListShow(dataList);
    }, [dataList]);

    // useEffect(() => {
    //     handleSearch({});
    // }, [currentPage]);


    // let listShow = dataList || [];
    // console.log("🚀 ~ ListShow ~ listShow:", listShow)

    // let total = totalSize || 4;

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    if (isPending) {
        return <LoadingComponent />
    }

    return (
        <>
            {/* {contextHolder} */}
            {/* <h3 className='text-start text-3xl font-bold mb-5'>Recent Show:</h3> */}

            {/* Search Bar */}
            {/* <SearchForm
                handleSearch={handleSearch}
            /> */}

            {/* List Show */}
            <Row>
                {listShow.map((show) => (
                    <Col key={show.showId} span={12} className='p-4'>
                        <Card
                            onClick={() => { handleOnClick(show.showId) }}
                            hoverable
                            cover={<img alt="SekiguchiContest" src="https://kodamakoishow.com/wp-content/uploads/2021/06/Sekiguchi-Grow-Out-Contest-1.jpg" />}
                        >
                            <div className='font-semibold'>
                                <Typography className='text-2xl'>{show.showTitle}</Typography>

                                {/* show status */}
                                {(show.showStatus === 'Up Comming') && (<Text className='text-lg' type="success">Upcoming</Text>)}
                                {(show.showStatus === 'On Going') && (<Text className='text-lg' type="success">Ongoing</Text>)}
                                {(show.showStatus === 'Finished') && (<Text className='text-lg' type="danger">Finished</Text>)}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* <Pagination
                className='m-2'
                align="end"
                total={total}
                simple
                pageSize={PAGE_SHOW_SIZE}
                defaultCurrent={1}
                onChange={(page) => {
                    setCurrentPage(page);
                }}
                showSizeChanger={false}
            /> */}
        </>
    )
}

export default ListShow