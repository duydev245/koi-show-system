import React from 'react'
import { Banner } from '../../../components/Banner'
import 'animate.css';
import { Card, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '../../../components/SearchForm';

const Home = () => {

    const { Text } = Typography;
    const navigate = useNavigate();

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    return (
        <>
            <Banner bannerShow={'/bgAuth.jpg'} />
            <div className='container mx-auto'>

                {/* Search Bar */}
                <SearchForm />

                {/* list show */}
                <Row>
                    <Col span={8} className='p-4'>
                        <Card
                            onClick={() => { handleOnClick(1) }}
                            hoverable
                            cover={<img alt="SekiguchiContest" src="https://kodamakoishow.com/wp-content/uploads/2021/06/Sekiguchi-Grow-Out-Contest-1.jpg" />}
                        >
                            <div className='font-semibold'>
                                <Typography className='text-2xl'>Sekiguchi Grow Out Contest 2021</Typography>
                                <Text className='text-lg' type="danger">Finished</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} className='p-4'>
                        <Card
                            onClick={() => { handleOnClick(1) }}
                            hoverable
                            cover={<img alt="SekiguchiContest" src="https://kodamakoishow.com/wp-content/uploads/2021/06/Sekiguchi-Grow-Out-Contest-1.jpg" />}
                        >
                            <div className='font-semibold'>
                                <Typography className='text-2xl'>Sekiguchi Grow Out Contest 2021</Typography>
                                <Text className='text-lg' type="success">On-going</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} className='p-4'>
                        <Card
                            onClick={() => { handleOnClick(1) }}
                            hoverable
                            cover={<img alt="SekiguchiContest" src="https://kodamakoishow.com/wp-content/uploads/2021/06/Sekiguchi-Grow-Out-Contest-1.jpg" />}
                        >
                            <div className='font-semibold'>
                                <Typography className='text-2xl'>Sekiguchi Grow Out Contest 2021</Typography>
                                <Text className='text-lg' type="danger">Finished</Text>
                            </div>
                        </Card>
                    </Col>

                    <Col span={8} className='p-4'>
                        <Card
                            onClick={() => { handleOnClick(1) }}
                            hoverable
                            cover={<img alt="SekiguchiContest" src="https://kodamakoishow.com/wp-content/uploads/2021/06/Sekiguchi-Grow-Out-Contest-1.jpg" />}
                        >
                            <div className='font-semibold'>
                                <Typography className='text-2xl'>Sekiguchi Grow Out Contest 2021</Typography>
                                <Text className='text-lg' type="success">On-going</Text>
                            </div>
                        </Card>
                    </Col>

                    <Col span={8} className='p-4'>
                        <Card
                            onClick={() => { handleOnClick(1) }}
                            hoverable
                            cover={<img alt="SekiguchiContest" src="https://kodamakoishow.com/wp-content/uploads/2021/06/Sekiguchi-Grow-Out-Contest-1.jpg" />}
                        >
                            <div className='font-semibold'>
                                <Typography className='text-2xl'>Sekiguchi Grow Out Contest 2021</Typography>
                                <Text className='text-lg' type="danger">Finished</Text>
                            </div>
                        </Card>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default Home
