import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../routes/path';
import { LoadingComponent } from '../../components/LoadingComponent';

const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
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
                    <div className='authLayout'>
                        <div className="py-8 px-10" id="overlayCompo">
                            <div className="flex justify-center">
                                <img
                                    className="cursor-pointer rounded-full"
                                    src="/logo-koi.jpg"
                                    width={100}
                                    alt="Login"
                                    onClick={() => navigate(PATH.HOME)}
                                />
                            </div>
                            <button
                                className="button1 cursor-pointer"
                                onClick={() => navigate(PATH.HOME)}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            {children}
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default AuthLayout
