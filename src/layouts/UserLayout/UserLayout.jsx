import React, { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import { LoadingComponent } from '../../components/LoadingComponent';

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
                <LoadingComponent />
            ) : (
                <>
                    <Navbar />
                    <div className="mb-5">
                        {children}
                    </div>
                    <Footer />
                </>
            )}
        </>

    )
}

export default UserLayout
