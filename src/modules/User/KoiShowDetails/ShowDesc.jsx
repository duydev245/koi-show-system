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
                <Card hoverable className='p-5'>
                    <h4 className='text-3xl font-bold mb-5'>About:</h4>
                    <div className='text-xl'>

                        {/* show status */}
                        <div className="mb-4">
                            {(showStatus === 'on going') && (<OngoingShow />)}
                            {(showStatus === 'scoring') && (<ScoringShow />)}
                            {(showStatus === 'finished') && (<EndedShow />)}
                        </div>

                        {/* showDesc */}
                        <div className='mb-4'>
                            {(showDesc) ?
                                (
                                    showDesc
                                ) : (
                                    <p>The goal of this koi show is to educate & promote the joys of koi keeping as a hobby. We hope to encourage your interest in learning great husbandry for keeping Japanese koi and to support efforts to create more koi masters.</p>
                                )
                            }

                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Entry Details: </p>
                            <p>{showFee} VND entry fee per koi that you enter into the virtual koi show. Everyone can register for the koi show and upvote their favorite koi.</p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>What are the Awards? </p>
                            <p>Cedar Plaque, Trophy, and Certificate are the top awards There will be many other awards, prizes by our sponsors and even a People’s Choice Award, as voted on by your peers.</p>
                        </div>

                        <div className="mb-4">
                            <div>
                                <p className='font-bold mb-2'>Official Judges: </p>
                                <ul style={{ listStyleType: 'disc' }} className="ps-7">
                                    {showReferee?.map((ref) => (
                                        <li key={ref.refereeId}>
                                            {ref.refereeName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </Card>

                <Card hoverable className='p-5'>
                    <div className='text-xl'>
                        <p className='font-bold mb-2'>
                            {(showStatus === 'finished') ? 'Show Award:' : 'Show Groups:'}
                        </p>
                        <ul style={{ listStyleType: 'disc' }} className="ps-7">
                            {showGroups?.map((gr) => (
                                <li key={gr.groupId}>
                                    <p>{gr.groupName}</p>
                                    <ul style={{ listStyleType: 'circle' }} className="text-xl ps-3 font-normal">
                                        {(showStatus === 'finished') ?
                                            (
                                                gr.registrations?.map((koi, index) => (
                                                    <li key={index} className='mb-1'>
                                                        <div className='flex items-center justify-start'>
                                                            <p>Rank {koi?.rank}: {koi?.name}</p>
                                                            {(koi?.isBestVote)
                                                                && (<FontAwesomeIcon className='text-red-600 ms-3' icon={faHeart} size='lg' />)
                                                            }

                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                gr.criterion?.map((item, index) => (
                                                    <li key={index} className='mb-1'>
                                                        <div>
                                                            <p>Criterion {item?.criterionName}:</p>
                                                            <p>- Percentage: {item.percentage}%</p>
                                                            <p>- Description: {item?.description}</p>
                                                        </div>
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
                        <p>{openForm}: Registration Opens</p>
                        <p>{closeForm}: Registration Closes</p>
                        <p>{startDate} - {endDate}: Award Ceremony & Judges Seminar</p>
                    </div>

                    {(showStatus === 'on going') && (
                        <div>
                            <button
                                onClick={() => navigate(PATH.KOI_REGISTER, { state: { showId: showID, showName: showName } })}
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