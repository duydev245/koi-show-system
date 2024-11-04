import React from 'react'

const AboutUsPage = () => {
    return (
        <div className=" min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">About KoiKoi</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Welcome to <span className="text-red-600 font-semibold">KoiKoi</span>! We are dedicated to bringing koi enthusiasts together by providing an online platform for showcasing their prized koi. Whether you’re a seasoned koi keeper or a newcomer, KoiKoi offers a space for everyone to register their koi in virtual shows, connect with other enthusiasts, and celebrate the beauty of these remarkable fish.
                </p>
                <div className="bg-gray-100 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">Our Mission</h2>
                    <p className="text-gray-700 mb-4">
                        At KoiKoi, our mission is to create a vibrant community of koi lovers who can share, compete, and learn from each other. Through our online shows, we aim to make the experience of koi shows accessible to everyone, no matter their location.
                    </p>
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">Join Us</h2>
                    <p className="text-gray-700">
                        Become a part of the KoiKoi family today and showcase your koi to the world. Register your fish, participate in shows, and let your koi shine!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage