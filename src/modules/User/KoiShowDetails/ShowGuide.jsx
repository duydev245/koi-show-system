import { Card } from 'antd'
import React from 'react'

const ShowGuide = ({ closeForm, endDate }) => {
    return (
        <div className='grid grid-cols-1 lg:flex gap-5 mb-8'>

            {/* left-section */}
            <div className='basis-7/12 space-y-5'>
                <Card hoverable className='p-5'>
                    <h4 className='text-3xl font-bold mb-5'>How To Enter Koi Show:</h4>
                    <div className='text-xl'>

                        <ul className='ms-5 mb-5' style={{ listStyleType: 'disc' }}>
                            <li>Start by adding a koi entry or signing up for an account.</li>
                            <li>Use your dashboard to manage koi entries, view payments, orders, and change password.</li>
                            <li>Checkout to pay for and list your koi on the website that have been submitted.</li>
                            <li>You can upvote and bookmark your favorite koi at anytime to support the People's Choice Award.</li>
                            <li>Koi Registration closes on <span className='font-bold text-red-600'>{closeForm}</span></li>
                            <li>Award Ceremony with Judges Seminar will be <span className='font-bold text-red-600'> {endDate}</span> on Zoom/GG Meet</li>
                        </ul>

                        <p className='mb-5'>Remember to invite friends who can create accounts and vote your koi to get more votes. (don't abuse this feature!)</p>

                        <p className='mb-5'>
                            <span className='font-semibold'>What Should I Say About My Koi? - </span>Koi Videos, Koi Photos, Variety, and Size details will be the only content judged for the koi show. Name and Description are a unique opportunity for you to share your koi details. Avoid use of any breeders information, we will remove from description.
                        </p>

                        <p className='mb-5'>
                            <span className='font-semibold'>How Do I Take High Quality Koi Photos? - </span>We recommend you read our new blog post about taking pictures of koi. It features our best tips for taking a clear photo or video of your koi fish.
                        </p>
                    </div>

                </Card>
            </div>

            {/* right-section */}
            <div className='basis-5/12 space-y-6 sticky w-full lg:h-full top-32'>
                <Card hoverable className='text-start'>
                    <iframe
                        className='w-full h-[300px]'
                        src="https://www.youtube.com/embed/yo7U6-yu0ok"
                        allowFullScreen
                    ></iframe>
                    <h4 className='text-xl font-semibold mt-5'>Watch a video walk-through of the koi show platform</h4>
                </Card>
            </div>
        </div>
    )
}

export default ShowGuide