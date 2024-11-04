import React from 'react'

const ServicesPage = () => {
    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Our Services</h1>

                <div className="bg-gray-100 shadow-md rounded-lg p-6 text-gray-700">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Online Koi Exhibitions</h2>
                    <p className="mb-6">
                        Experience the beauty of koi through our online exhibitions. We provide a platform for koi enthusiasts to showcase their prized fish to a wider audience, allowing for interaction and appreciation from fellow koi lovers.
                    </p>

                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Participate in Koi Shows Online</h2>
                    <p>
                        Join our online koi shows where you can register your koi and compete with others from the comfort of your home. Enjoy a community-focused environment and gain recognition for your exquisite koi!
                    </p>
                </div>
            </div>
        </div>)
}

export default ServicesPage