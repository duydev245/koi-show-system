import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Skeleton, Typography } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { OngoingShow } from '../../../components/OngoingShow';
import { EndedShow } from '../../../components/EndedShow';
import { ScoringShow } from '../../../components/ScoringShow';
import dayjs from "dayjs";
import { showApi } from '../../../apis/show.api';
import { useQuery } from '@tanstack/react-query';

const CurrentShow = ({ currentShow }) => {

    const { data: showDetails, isLoading, error } = useQuery({
        queryKey: ['show-details'],
        queryFn: () => showApi.getShowDetails(currentShow?.showId),
        enabled: !!currentShow?.showId,
    });
    console.log("🚀 ~ CurrentShow ~ showDetails:", showDetails)

    const [imageLoaded, setImageLoaded] = useState(false);

    let showStatus = showDetails?.showStatus.toLowerCase();
    let openForm = dayjs(showDetails?.registrationStartDate).format("DD/MM");
    let closeForm = dayjs(showDetails?.registrationCloseDate).format("DD/MM");
    let showGroups = showDetails?.showGroups;

    const navigate = useNavigate();

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    return (
        <>
            <div className='p-4 mb-5'>
                <Card hoverable >
                    <Row gutter={[0, 10]}>
                        <Col span={24} style={{ width: '100%' }}>
                            {/* currentShow?.showBanner */}
                            <>
                                {!imageLoaded && (
                                    <div className='skeleton-wrapper w-full'>
                                        <Skeleton.Image className='skeleton-image' active />
                                    </div>
                                )}
                                <img
                                    className='w-full rounded-lg md:h-[350px] lg:h-[480px]'
                                    src={showDetails?.showBanner} alt={showDetails?.showTitle}
                                    onLoad={() => setImageLoaded(true)}
                                    style={{ display: imageLoaded ? 'block' : 'none' }}
                                />
                            </>
                        </Col>
                        <Col span={24} className='flex flex-col items-start justify-center ml-4'>
                            <div className='text-4xl'>
                                {/* show status */}
                                {(showStatus === 'on going') && (<OngoingShow />)}
                                {(showStatus === 'scoring') && (<ScoringShow />)}
                                {(showStatus === 'finished') && (<EndedShow />)}
                            </div>
                            <h4 className='text-4xl font-bold'>{showDetails?.showTitle}</h4>
                        </Col>
                        <Col span={12} className='pe-2'>

                            <div className='text-lg'>
                                <div className="space-y-2 ml-4">
                                    <div className='mb-2 space-y-3'>
                                        <h4 className='text-3xl font-bold mb-2'>About:</h4>
                                        <p className='text-lg ml-4'>
                                            {(currentShow) ?
                                                (
                                                    <>
                                                        <p className='text-lg ml-4'>
                                                            - {showDetails?.showDesc}
                                                        </p>
                                                        <p className='text-lg ml-4'>
                                                            - Registration Time: <span className='font-bold text-red-500'>{openForm} - {closeForm}</span>
                                                        </p>
                                                    </>
                                                ) : (
                                                    <Skeleton active paragraph={{ rows: 3 }} />
                                                )
                                            }
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col span={12} className='ps-2'>
                            {showDetails?.showReferee ? (
                                <>
                                    <div className="mb-4">
                                        <p className='font-bold mb-2 text-3xl'>Official Judges: </p>
                                        <ul className="space-y-2 ml-4 text-lg">
                                            {showDetails?.showReferee?.map((ref) => (
                                                <li key={ref.refereeId}>
                                                    - {ref.refereeName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Skeleton active paragraph={{ rows: 5 }} />
                            )}
                        </Col>

                        <Col span={24} className='ps-2'>
                            {(showStatus === 'finished') &&
                                (
                                    <div className='mb-4'>
                                        <div className='flex items-center justify-center mb-2'>
                                            {/* <FontAwesomeIcon className='text-orange-500  me-1' icon={faTrophy} size='2x' /> */}
                                            <h4 className='font-bold text-red-600 uppercase text-3xl'>
                                                Congratulations to our champions:
                                            </h4>
                                        </div>

                                        <div className="space-y-4">
                                            {showGroups?.map((gr) => (
                                                <div key={gr.groupId} className="mb-4 bg-gray-100 p-6 rounded-md">
                                                    <p className='text-2xl font-bold mb-2'>{gr.groupName}</p>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {gr.registrations?.map((koi, index) => (
                                                            <Card
                                                                key={index}
                                                                cover={<img className='md:h-[305px] lg:h-[478px]' alt={koi?.name} src={koi?.image1} />}
                                                            >
                                                                <div className='flex justify-center items-center mb-3'>
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
                                                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                                                            <span className='text-2xl font-bold ms-2'>3rd Place Winner</span>
                                                                        </>)
                                                                    }
                                                                </div>
                                                                <div
                                                                    className='flex justify-evenly items-center'
                                                                    onClick={() => {
                                                                        navigate(`/registration-details/${koi.id}`)
                                                                    }}>
                                                                    <Typography className='text-2xl font-bold hover:text-blue-500 duration-300 transition-all'>
                                                                        {koi.name}
                                                                    </Typography>
                                                                    {(koi.isBestVote) && (<FontAwesomeIcon className='text-red-600' icon={faHeart} size='2x' />)}
                                                                </div>
                                                                {/* <Typography className='text-lg flex justify-evenly items-center'>
                                                                <span className="font-bold">Total score:</span>
                                                                <span>{koi.totalScore}</span>
                                                            </Typography> */}
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }

                        </Col>
                        <Col span={24}>
                            <button
                                onClick={() => { handleOnClick(showDetails?.showId) }}
                                className='btnAddKoi text-2xl font-bold w-full py-3 rounded-xl bg-red-600 text-white hover:text-black duration-300'>
                                View more
                            </button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default CurrentShow