import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { showApi } from '../../../apis/show.api';
import { Card, Col, Pagination, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { PAGE_SIZE } from '../../../constants';

const ListKoiEntries = ({ showName, showID }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const { data: listKoi } = useQuery({
        queryKey: ['list-koi', { currentPage }],
        queryFn: () => showApi.getListKoiByShow({ pageIndex: currentPage, showID }),
    });
    // console.log("🚀 ~ KoiShowDetails ~ listKoi:", listKoi)

    const total = listKoi?.totalItems || 0;
    // console.log("🚀 ~ KoiShowDetails ~ total:", total)

    const handleOnClick = (idKoi) => {
        return navigate(`/koi-details/${idKoi}`);
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
                {listKoi?.kois.map((koi) => (
                    <Col span={6} key={koi.koiID} className='p-4'>
                        <Card
                            hoverable
                            cover={<img alt={koi.koiName} src="/koi-1.jpg" />}
                        >
                            <div className="mb-3">
                                <div className='flex justify-center items-center mb-3 h-[42px]'>
                                    {(koi.rank === 1) &&
                                        (<>
                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='3x' />
                                            <span className='text-2xl font-bold ms-2'>1st Place Winner</span>
                                        </>)
                                    }

                                    {(koi.rank === 2) &&
                                        (<>
                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                            <span className='text-2xl font-bold ms-2'>2nd Place Winner</span>
                                        </>)
                                    }

                                    {(koi.rank === 3) &&
                                        (<>
                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='1x' />
                                            <span className='text-2xl font-bold ms-2'>3rd Place Winner</span>
                                        </>)
                                    }
                                </div>

                                <div className='flex justify-between items-center h-[42px]'>
                                    <Typography className='text-2xl font-bold'>{koi.koiName}</Typography>
                                    {(koi.isBestVote) && (<FontAwesomeIcon className='text-rose-700' icon={faHeart} size='3x' />)}
                                </div>

                                <Typography className='text-lg'><span className="font-bold">Koi ID:</span> {koi.koiID}</Typography>
                                <Typography className='text-lg'><span className="font-bold">Variety:</span> {koi.koiVariety}</Typography>
                                <Typography className='text-lg'><span className="font-bold">Size:</span> {koi.koiSize}</Typography>
                            </div>
                            <div>
                                <button
                                    onClick={() => { handleOnClick(koi.koiID) }}
                                    className='btnAddKoi text-xl w-full font-bold py-2 rounded-xl bg-rose-700 hover:text-white duration-300'>
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
                defaultCurrent={1}
                onChange={(page) => {
                    setCurrentPage(page);
                }}
                showSizeChanger={false}
            />
        </div>
    )
}

export default ListKoiEntries