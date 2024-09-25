import { Card, Row, Col } from 'antd'
import React from 'react'
import ShowTitle from '../ShowTitle/ShowTitle'
import { UpcomingShow } from '../UpcomingShow';
import { OngoingShow } from '../OngoingShow';
import { EndedShow } from '../EndedShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CurrentShow = () => {
    let showName = '1st Kodama Virtual Koi Show';
    let showStatus = 2;

    const navigate = useNavigate();

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    return (
        <>
            <ShowTitle showName={showName} />

            <div className='p-4 mb-5'>
                <Card hoverable onClick={() => { handleOnClick(1) }} >
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
                                            <li>
                                                <p>1st Place: Keto</p>
                                            </li>
                                            <li>
                                                <p>2nd Place: Keta</p>
                                            </li>
                                            <li>
                                                <p>3rd Place: Keti</p>
                                            </li>
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
