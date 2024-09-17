import React from 'react'
import { Banner } from '../../../components/Banner'
import 'animate.css';
import { Controller, useForm } from 'react-hook-form';
import { Card, Col, Form, Input, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const { Text } = Typography;
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            searchValue: "",
        },
    });

    const onSubmit = (values) => {
        const payload = {
            searchValue: values.searchValue,
        }
        console.log("🚀 ~ onSubmit ~ payload:", payload)
    }

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    return (
        <>
            <Banner bannerShow={'/bgAuth.jpg'} />
            <div className='container mx-auto'>

                {/* Search Bar */}
                <Form className="w-3/5 mx-auto" onFinish={handleSubmit(onSubmit)}>
                    <div className='relative' id='searchBar'>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>

                        <Controller
                            name="searchValue"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input
                                        {...field}
                                        type="search"
                                        size='large'
                                        className="block w-full p-4 ps-10 text-base text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-100"
                                        placeholder="Search show..."
                                        status={errors.searchValue ? "error" : ""}
                                    />
                                );
                            }}
                        />

                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-rose-700 hover:bg-rose-800 hover:text-black font-medium rounded-lg text-base px-4 py-2 duration-300">Search</button>
                    </div>
                </Form>

                {/* list show */}
                <Row className='mt-5'>
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
