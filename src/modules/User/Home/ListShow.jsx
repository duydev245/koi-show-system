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
                {listShow?.map((show) => (
                    <Col key={show.showId} span={12} className='p-4'>
                        <Card
                            onClick={() => { handleOnClick(show.showId) }}
                            hoverable
                            // cover={<img className='h-[385px]' alt="SekiguchiContest" src="https://kodamakoishow.com/wp-content/uploads/2021/06/Sekiguchi-Grow-Out-Contest-1.jpg" />}
                            cover={<img className='h-[385px]' alt={show.showTitle} src={show.showBanner} />}
                        >
                            <div className='font-semibold'>
                                <Typography className='text-2xl'>{show.showTitle}</Typography>

                                {/* show status */}
                                {(show.showStatus.toLowerCase() === 'on going') &&
                                    (<Text className='text-lg uppercase' type="success">Ongoing</Text>)}

                                {(show.showStatus.toLowerCase() === 'scoring') &&
                                    (<Text className='text-lg uppercase' type="warning">Scoring</Text>)}

                                {(show.showStatus.toLowerCase() === 'finished') &&
                                    (<Text className='text-lg uppercase' type="danger">Finished</Text>)}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ListShow