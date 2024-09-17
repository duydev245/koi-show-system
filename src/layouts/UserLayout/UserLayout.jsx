import React, { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

const UserLayout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="loading-indicator">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <Navbar />
                    {children}
                    <Footer />
                </>
            )}
        </>

    )
}

export default UserLayout
