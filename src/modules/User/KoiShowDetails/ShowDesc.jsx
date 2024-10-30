import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { PATH } from '../../../routes/path';
import { OngoingShow } from '../../../components/OngoingShow';
import { EndedShow } from '../../../components/EndedShow';
import { ScoringShow } from '../../../components/ScoringShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const ShowDesc = ({ showID, showName, showDesc, showStatus, openForm, closeForm, endDate, startDate, showReferee, showGroups, showFee }) => {
    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-1 lg:flex gap-5 mb-8'>
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

                <Card hoverable className="p-6 bg-white">
                    <div className='text-xl'>
                        <p className='font-bold mb-3 text-3xl'>
                            {(showStatus === 'finished') ? 'Award:' : 'Show Groups:'}
                        </p>

                        <ul className="space-y-4">
                            {showGroups?.map((gr) => (
                                <li key={gr.groupId} className="mb-4 bg-gray-100 p-6 rounded-md">
                                    <p className='text-lg font-semibold mb-2'>{gr.groupName}</p>

                                    <ul className="space-y-2 ml-4">
                                        {(showStatus === 'finished') ?
                                            (
                                                gr.registrations?.map((koi, index) => (
                                                    <li key={index} className='flex items-center space-x-2'>
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
                                                ))
                                            ) : (
                                                gr.criterion?.map((item, index) => (
                                                    <li key={index} className='text-lg'>
                                                        <p className="font-semibold">{item?.name}:</p>
                                                        <p className="ml-3">- Percentage: {item.percentage}%</p>
                                                        <p className="ml-3">- Description: {item?.description}</p>
                                                    </li>
                                                ))
                                            )
                                        }
                                    </ul>
                                </li>
                            ))}
                        </ul>
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
    )
}

export default ShowDesc