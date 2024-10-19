import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Col, Pagination, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { PAGE_SIZE } from '../../../constants';
import { registrationApi } from '../../../apis/registration.api';

const ListKoiEntries = ({ showName, showID }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const { data: listRegistration } = useQuery({
        queryKey: ['list-registration', { currentPage }],
        queryFn: () => registrationApi.getListRegByShowId({ pageIndex: currentPage, showID }),
    });
    // console.log("🚀 ~ KoiShowDetails ~ listRegistration:", listRegistration)

    const total = listRegistration?.totalItems || 0;
    // console.log("🚀 ~ KoiShowDetails ~ total:", total)

    const handleOnClick = (idKoi) => {
        return navigate(`/registration-details/${idKoi}`);
    }

    return (
        <div className="mb-5">
            <div className='mb-8'>
                <h3 className='text-4xl text-red-600 font-bold mb-5'>{showName} Entries</h3>
                <p className='text-xl text-red-600 font-bold'>
                    The award winners were decided by our elite judges, sponsors, and koi show participants. These are the best of the best koi, submitted to our koi show, from over {total} koi.
                </p>
            </div>
            {/* list koi entries */}
            <Row>
                {listRegistration?.registrations.map((reg) => (
                    <Col span={6} key={reg.id} className='p-4'>
                        <Card
                            hoverable
                            onClick={() => { handleOnClick(reg.id) }}
                            // cover={<img alt={reg.name} src="/koi-1.jpg" />}
                            cover={<img className='md:h-[305px] lg:h-[478px] ' alt={reg.name} src={reg.image1} />}
                        >
                            <div className="mb-3">
                                <div className='flex justify-center items-center mb-3 h-[42px]'>
                                    {(reg.rank === 1) &&
                                        (<>
                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='3x' />
                                            <span className='text-2xl font-bold ms-2'>1st Place Winner</span>
                                        </>)
                                    }

                                    {(reg.rank === 2) &&
                                        (<>
                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                            <span className='text-2xl font-bold ms-2'>2nd Place Winner</span>
                                        </>)
                                    }

                                    {(reg.rank === 3) &&
                                        (<>
                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                            <span className='text-2xl font-bold ms-2'>3rd Place Winner</span>
                                        </>)
                                    }
                                </div>

                                <div className='flex justify-between items-center h-[42px]'>
                                    <Typography className='text-2xl font-bold'>{reg.name}</Typography>
                                    {(reg.isBestVote) && (<FontAwesomeIcon className='text-red-600' icon={faHeart} size='3x' />)}
                                </div>

                                <Typography className='text-lg'><span className="font-bold">Registration ID:</span> {reg.id}</Typography>
                                <Typography className='text-lg'><span className="font-bold">Show group:</span> {reg.group}</Typography>
                                <Typography className='text-lg'><span className="font-bold">Variety:</span> {reg.variety}</Typography>
                                <Typography className='text-lg'><span className="font-bold">Size:</span> {reg.size} cm</Typography>
                            </div>
                            <div>
                                <button
                                    className='btnAddKoi text-xl w-full font-bold py-2 rounded-xl bg-red-600 text-white hover:text-black duration-300'>
                                    View details
                                </button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination
                className='m-2'
                align="end"
                total={total}
                simple
                pageSize={PAGE_SIZE}
                current={currentPage}
                onChange={(page) => {
                    setCurrentPage(page);
                }}
                showSizeChanger={false}
            />
        </div>
    )
}

export default ListKoiEntries