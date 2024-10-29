import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Skeleton } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { OngoingShow } from '../../../components/OngoingShow';
import { EndedShow } from '../../../components/EndedShow';
import { ScoringShow } from '../../../components/ScoringShow';
import dayjs from "dayjs";

const CurrentShow = ({ currentShow }) => {
    // console.log("🚀 ~ CurrentShow ~ currentShow:", currentShow)
    const [imageLoaded, setImageLoaded] = useState(false);

    let showStatus = currentShow?.showStatus.toLowerCase();
    let groupShow = currentShow?.showGroups;
    let openForm = dayjs(currentShow?.registrationStartDate).format("DD/MM");
    let closeForm = dayjs(currentShow?.registrationCloseDate).format("DD/MM");

    const navigate = useNavigate();

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    return (
        <>
            {/* <ShowTitle showName={currentShow?.showTitle} /> */}

            <div className='p-4 mb-5'>
                <Card hoverable onClick={() => { handleOnClick(currentShow?.showId) }} >
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
                                    src={currentShow?.showBanner} alt={currentShow?.showTitle}
                                    onLoad={() => setImageLoaded(true)}
                                    style={{ display: imageLoaded ? 'block' : 'none' }}
                                />
                            </>
                        </Col>
                        <Col span={24} className='flex items-center justify-start ml-4'>
                            <h4 className='text-4xl font-bold'>{currentShow?.showTitle}</h4>
                            <div className='text-4xl ms-2'>
                                {/* show status */}
                                {(showStatus === 'on going') && (<OngoingShow />)}
                                {(showStatus === 'scoring') && (<ScoringShow />)}
                                {(showStatus === 'finished') && (<EndedShow />)}
                            </div>
                        </Col>
                        <Col span={12} className='pe-2'>

                            <div className='text-lg'>
                                <ul className="space-y-2 ml-4">
                                    <li className='mb-2 space-y-3'>
                                        <h4 className='text-3xl font-bold mb-2'>About:</h4>
                                        <p className='text-lg ml-4'>
                                            {(currentShow?.showDesc) ?
                                                (
                                                    `- ${currentShow?.showDesc}`
                                                ) : (
                                                    <Skeleton active paragraph={{ rows: 3 }} />
                                                )
                                            }
                                        </p>
                                        <p className='text-lg ml-4'>
                                            {(currentShow) ? (
                                                <>
                                                    - Registration Time: <span className='font-bold text-red-500'>{openForm} - {closeForm}</span>
                                                </>
                                            ) : (
                                                <Skeleton active paragraph={{ rows: 1 }} />
                                            )}
                                        </p>
                                    </li>
                                </ul>

                            </div>
                        </Col>
                        <Col span={12} className='ps-2'>
                            {currentShow ? (
                                (showStatus === 'finished') ?
                                    (
                                        <div className='mb-4'>
                                            <div className='flex items-center justify-start mb-2'>
                                                <FontAwesomeIcon className='text-red-600' icon={faTrophy} size='2x' />
                                                <h4 className='font-bold text-3xl ms-1'>Award:</h4>
                                            </div>

                                            <ul className="pl-6 space-y-4">
                                                {groupShow?.map((group) => (
                                                    <li key={group?.groupId} className="mb-4">
                                                        <p className='text-lg font-semibold mb-2'>{group?.groupName}</p>

                                                        <ul className="space-y-2 ml-4">
                                                            {group?.registrations.map((koi) => (
                                                                <li key={koi?.id} className='flex items-center space-x-2'>
                                                                    <p className="text-lg">Rank {koi?.rank}: {koi?.name}</p>
                                                                    {(koi?.isBestVote) &&
                                                                        (
                                                                            <FontAwesomeIcon
                                                                                className='text-red-600'
                                                                                icon={faHeart}
                                                                                size='lg'
                                                                            />
                                                                        )
                                                                    }
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="mb-4">
                                            <p className='font-bold mb-2 text-3xl'>Official Judges: </p>
                                            <ul className="space-y-2 ml-4 text-lg">
                                                {currentShow?.showReferee.map((ref) => (
                                                    <li key={ref.refereeId}>
                                                        - {ref.refereeName}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                            ) : (
                                <Skeleton active paragraph={{ rows: 6 }} />
                            )}
                        </Col>
                        <Col span={24}>
                            <button
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