import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../routes/path';
import { Card } from 'antd';
import { UpcomingShow } from '../UpcomingShow';
import { OngoingShow } from '../OngoingShow';
import { EndedShow } from '../EndedShow';

const ShowDesc = ({ showDesc, showStatus, openForm, closeForm, awardDate, showReferee, showGroups }) => {
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
                            {(showStatus === 'Up Comming') && (<UpcomingShow />)}
                            {(showStatus === 'On Going') && (<OngoingShow />)}
                            {(showStatus === 'Finished') && (<EndedShow />)}
                        </div>

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
                            <p>$5 entry fee per koi that you enter into the virtual koi show. Everyone can register for the koi show and upvote their favorite koi.</p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>What are the Awards? </p>
                            <p>Cedar Plaque, Trophy, and Certificate are the top awards There will be many other awards, prizes by our sponsors and even a People’s Choice Award, as voted on by your peers.</p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Show Groups: </p>
                            <ul style={{ listStyleType: 'disc' }} className="ps-8">
                                {showGroups?.map((gr) => (
                                    <li key={gr.groupId}>
                                        {gr.groupName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Official Judges: </p>
                            <ul style={{ listStyleType: 'disc' }} className="ps-8">
                                {showReferee?.map((ref) => (
                                    <li key={ref.refereeId}>
                                        {ref.refereeName}
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
                        <p>{openForm} – Registration Opens</p>
                        <p>{closeForm} – Registration Closes</p>
                        <p>{awardDate} – Award Ceremony & Judges Seminar</p>
                    </div>

                    {(showStatus === 'Up Comming') && (
                        <div>
                            <button
                                onClick={() => { navigate(PATH.KOI_REGISTER) }}
                                className='btnAddKoi text-2xl font-bold w-3/5 py-5 rounded-xl bg-rose-700 hover:text-white duration-300'>
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
