import { faFacebook, faInstagram, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faComments, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ContactPage = () => {
    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Contact Us</h1>

                <div className="bg-gray-100 shadow-md rounded-lg p-6 text-gray-700">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Our Address</h2>
                    <p>Lot E2a-7, D1 Street, Long Thanh My Ward, Thu Duc City, Ho Chi Minh City 700000, Vietnam</p>

                    <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Phone Number</h2>
                    <p className="flex items-center justify-center text-lg">
                        <FontAwesomeIcon icon={faPhone} className="mr-2 text-red-600" /> (+84) 123-456-7890
                    </p>

                    <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Follow Us</h2>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-2xl">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-2xl">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-2xl">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-2xl">
                            <FontAwesomeIcon icon={faTelegram} />
                        </a>
                        <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 text-2xl">
                            <FontAwesomeIcon icon={faComments} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage