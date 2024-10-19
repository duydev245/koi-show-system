import React, { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'
import { LoadingComponent } from '../../components/LoadingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const UserLayout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    }, []);

    // Show the button when the user scrolls down
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top when button is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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

                    {/* Back to Top button */}
                    {showButton && (
                        <button
                            onClick={scrollToTop}
                            className="fixed bottom-10 right-10 bg-red-600 text-white hover:text-black py-3 px-4 btnAddKoi rounded-md shadow-lg btn-rate transition duration-300"
                        >
                            <FontAwesomeIcon icon={faArrowUp} size='lg' />
                        </button>
                    )}

                </>
            )}
        </>

    )
}

export default UserLayout
