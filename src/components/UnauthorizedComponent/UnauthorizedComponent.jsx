import React from 'react'
import 'animate.css'

const UnauthorizedComponent = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-red-700 mb-4">403</h1>
                <p className="text-3xl text-gray-600 mb-8">Unauthorized Access</p>
                <a
                    href="/auth/login"
                    className="px-4 py-2 bg-rose-700 text-white rounded hover:text-black transition duration-300"
                >
                    Go to Login
                </a>
            </div>
        </div>
    )
}

export default UnauthorizedComponent