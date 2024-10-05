import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ShowTitle } from '../../../components/ShowTitle';
import { UpcomingShow } from '../../../components/UpcomingShow';
import { OngoingShow } from '../../../components/OngoingShow';
import { EndedShow } from '../../../components/EndedShow';

const CurrentShow = ({ currentShow }) => {
    // console.log("🚀 ~ CurrentShow ~ currentShow:", currentShow)

    let showStatus = currentShow?.status;
    let groupShow = currentShow?.groups;

    const navigate = useNavigate();

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    return (
        <>
            <ShowTitle showName={currentShow?.title} />

            <div className='p-4 mb-5'>
                <Card hoverable onClick={() => { handleOnClick(currentShow?.showId) }} >
                    <Row gutter={[0, 10]}>
                        <Col span={24}>
                            <img className='w-full rounded-lg' src="/show-1.jpg" alt="" />
                        </Col>
                        <Col span={24}>
                            <div className='text-2xl'>
                                {/* show status */}
                                {(showStatus === 0) && (<UpcomingShow />)}
                                {(showStatus === 1) && (<OngoingShow />)}
                                {(showStatus === 2) && (<EndedShow />)}
                            </div>
                        </Col>
                        <Col span={12} className='pe-2'>

                            <div className='text-lg'>
                                <h4 className='text-2xl font-bold mb-2'>About:</h4>
                                <p>
                                    The goal of this koi show is to educate & promote the joys of koi keeping as a hobby. We hope to encourage your interest in learning great husbandry for keeping Japanese koi and to support efforts to create more koi masters.
                                </p>
                            </div>
                        </Col>
                        <Col span={12} className='ps-2'>
                            {(showStatus === 2) ?
                                (
                                    <div className='font-semibold'>
                                        <div className='flex items-center justify-start mb-2'>
                                            <FontAwesomeIcon className='text-rose-700' icon={faTrophy} size='2x' />
                                            <h4 className='text-2xl font-bold ms-1'>Koi Award:</h4>
                                        </div>
                                        <ul style={{ listStyleType: 'disc' }} className="text-xl ps-9">
                                            {groupShow.map((group) => (
                                                <li key={group?.groupId} className='mb-2'>
                                                    <p>{group?.groupName}:</p>
                                                    <ul style={{ listStyleType: 'circle' }} className="text-xl ps-9 font-normal">
                                                        {group?.koiRegistrations.map((koi) => (
                                                            <li key={koi?.koiId} className='mb-1'>
                                                                <div className='flex items-center justify-start'>
                                                                    <p>Rank {koi?.rank}: {koi?.koiName}</p>
                                                                    {(koi?.isBestVote)
                                                                        && (<FontAwesomeIcon className='text-rose-700 ms-3' icon={faHeart} size='lg' />)
                                                                    }

                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className='font-semibold'>
                                        <h4 className='text-2xl font-bold mb-2'>Official Judges:</h4>
                                        <ul style={{ listStyleType: 'disc' }} className="text-xl ps-7">
                                            <li>
                                                <p>Futoshi Mano</p>
                                            </li>
                                            <li>
                                                <p>Mitsunori Isa </p>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </Col>
                        <Col span={24}>
                            <button
                                className='btnAddKoi text-2xl font-bold w-full py-3 rounded-xl bg-rose-700 hover:text-white duration-300'>
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