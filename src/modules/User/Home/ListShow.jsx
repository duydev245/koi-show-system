import React, { useEffect, useState } from 'react'
import 'animate.css'
import { Card, Col, message, Pagination, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingComponent } from '../../../components/LoadingComponent';

const ListShow = ({ dataList, isPending }) => {
    const { Text } = Typography;
    const navigate = useNavigate();

    const [listShow, setListShow] = useState([])

    useEffect(() => {
        setListShow(dataList);
    }, [dataList]);

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    if (isPending) {
        return <LoadingComponent />
    }

    return (
        <>
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
                                {(show.showStatus.toLowerCase() === 'up comming') && (<Text className='text-lg' type="success">Upcoming</Text>)}
                                {(show.showStatus.toLowerCase() === 'on going') && (<Text className='text-lg' type="success">Ongoing</Text>)}
                                {(show.showStatus.toLowerCase() === 'finished') && (<Text className='text-lg' type="danger">Finished</Text>)}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ListShow