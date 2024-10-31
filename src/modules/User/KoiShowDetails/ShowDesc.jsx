import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { PATH } from '../../../routes/path';
import { OngoingShow } from '../../../components/OngoingShow';
import { EndedShow } from '../../../components/EndedShow';
import { ScoringShow } from '../../../components/ScoringShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import 'animate.css'

const ShowDesc = ({ showID, showName, showDesc, showStatus, openForm, closeForm, endDate, startDate, showReferee, showGroups, showFee }) => {
    const navigate = useNavigate();

    const handleOnClick = (idKoi) => {
        return navigate(`/registration-details/${idKoi}`);
    }

    return (
        <div className='mb-8'>
            <div className='grid grid-cols-1 lg:flex gap-5 mb-6'>
                {/* left-section */}
                <div className='basis-7/12 space-y-5'>
                    <Card hoverable className='p-6 bg-white'>
                        {/* show status */}
                        <div className="text-3xl">
                            {(showStatus === 'on going') && (<OngoingShow />)}
                            {(showStatus === 'scoring') && (<ScoringShow />)}
                            {(showStatus === 'finished') && (<EndedShow />)}
                        </div>
                        <h4 className='text-3xl font-bold mb-4'>About:</h4>
                        <div className='text-xl'>
                            {/* showDesc */}
                            <div className='mb-4'>
                                <p className='text-lg ml-4'>
                                    {(showDesc) ?
                                        (
                                            `- ${showDesc}`
                                        ) : (
                                            '- The goal of this koi show is to educate & promote the joys of koi keeping as a hobby. We hope to encourage your interest in learning great husbandry for keeping Japanese koi and to support efforts to create more koi masters.'
                                        )
                                    }
                                </p>
                            </div>
                            {/* showFee */}
                            <div className='mb-4'>
                                <p className='font-bold mb-2'>Entry Details: </p>
                                <p className='text-lg ml-4'>- {showFee} VND entry fee per koi that you enter into the virtual koi show. Everyone can register for the koi show and upvote their favorite koi.</p>
                            </div>
                            <div className='mb-4'>
                                <p className='font-bold mb-2'>What are the Awards? </p>
                                <p className='text-lg ml-4'>- Cedar Plaque, Trophy, and Certificate are the top awards There will be many other awards, prizes by our sponsors and even a People’s Choice Award, as voted on by your peers.</p>
                            </div>
                            {/* Official Judges */}
                            <div className="mb-4">
                                <p className='font-bold mb-2'>Official Judges: </p>
                                <ul className="space-y-2 ml-4">
                                    {showReferee?.map((ref) => (
                                        <li key={ref.refereeId} className='text-lg'>
                                            - {ref.refereeName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>


                </div>
                {/* right-section */}
                <div className='basis-5/12 space-y-6 sticky w-full lg:h-full top-32'>
                    <Card hoverable className='text-center'>
                        <h4 className='text-2xl font-bold mb-5'>Koi Show Sponsors:</h4>
                        <div className='mb-4'>
                            <img className='mx-auto' src="/test-sponsors.jpg" alt="sponsors" />
                            <img className='mx-auto' src="/test-sponsors-1.jpg" alt="sponsors" />
                        </div>
                        <div className='text-lg mb-3 font-semibold'>
                            <p>{openForm} - {closeForm}: Registration Time</p>
                            <p>{startDate} - {endDate}: Judging Time & Award Seminar</p>
                        </div>
                        {(showStatus === 'on going') && (
                            <div>
                                <button
                                    onClick={() => navigate(PATH.KOI_REGISTER, { state: { showId: showID, showName: showName, showFee: showFee } })}
                                    className='btnAddKoi text-2xl font-bold w-3/5 py-5 rounded-xl bg-red-600 text-white hover:text-black duration-300'>
                                    Add Koi entry
                                </button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* show groups / awards */}
            <Card hoverable className="p-6 bg-white">
                <div className='text-xl'>
                    <p className='font-bold mb-3 text-3xl'>
                        {(showStatus === 'finished') ? (<span className='text-red-600 uppercase'>Congratulations to our champions:</span>) : 'Show Groups:'}
                    </p>

                    {
                        (showStatus === 'finished') ?
                            (
                                <>
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
                                                            <div className='flex justify-evenly items-center' onClick={() => { handleOnClick(koi.id) }}>
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
                                </>
                            ) : (
                                <>
                                    <div className="space-x-5 grid grid-cols-3">
                                        {showGroups?.map((gr) => (
                                            <div key={gr.groupId} className="mb-4 bg-gray-100 p-6 rounded-md">
                                                <p className='text-lg font-semibold mb-2'>{gr.groupName}</p>
                                                <div className="space-y-2">
                                                    {gr.criterion?.map((item, index) => (
                                                        <div key={index} className='text-lg ml-4'>
                                                            <p className="font-semibold">{item?.name}:</p>
                                                            <p className="ml-3">- Percentage: {item.percentage}%</p>
                                                            <p className="ml-3">- Description: {item?.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )

                    }


                </div>
            </Card>
        </div>
    )
}

export default ShowDesc