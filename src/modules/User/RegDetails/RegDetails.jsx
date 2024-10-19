import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { KoiTitle } from '../../../components/KoiTitle';
import { Card, Image, Popconfirm } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { LoadingComponent } from '../../../components/LoadingComponent';
import { NotFoundComponent } from '../../../components/NotFoundComponent';
import { registrationApi } from '../../../apis/registration.api';
import { Carousel } from 'react-responsive-carousel';

const RegDetails = () => {
    const [vote, setVote] = useState('Vote');
    const [imgUrls, setImgUrls] = useState([]);

    const { id } = useParams();

    const { data: regDetails, isLoading, error } = useQuery({
        queryKey: ['koi-details'],
        queryFn: () => registrationApi.getRegDetails(id),
    });
    // console.log("🚀 ~ regDetails ~ regDetails:", regDetails)

    useEffect(() => {
        if (regDetails) {
            const newUrls = [regDetails.image1, regDetails.image2, regDetails.image3].filter(Boolean);
            setImgUrls(newUrls);
        }
    }, [regDetails]);

    const handleVote = () => {
        if (vote === 'Vote') {
            setVote('Unvote');
        }

        if (vote === 'Unvote') {
            setVote('Vote');
        }
    }

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <NotFoundComponent />
    }

    return (
        <>
            <KoiTitle koiName={regDetails?.name} />
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 lg:flex gap-5 mb-8'>
                    <div className='basis-6/12 space-y-6 lg:sticky w-full lg:h-full top-32'>
                        <Card hoverable className='p-5'>
                            <h4 className='text-3xl font-bold mb-5 text-center'>Registration Details</h4>

                            <div className='flex justify-center items-center mb-3 h-[42px]'>
                                {(regDetails?.rank === 1) &&
                                    (<>
                                        <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='3x' />
                                        <span className='text-3xl font-bold ms-2'>1st Place Winner</span>
                                    </>)
                                }

                                {(regDetails?.rank === 2) &&
                                    (<>
                                        <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                        <span className='text-3xl font-bold ms-2'>2nd Place Winner</span>
                                    </>)
                                }

                                {(regDetails?.rank === 3) &&
                                    (<>
                                        <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                        <span className='text-3xl font-bold ms-2'>3rd Place Winner</span>
                                    </>)
                                }
                            </div>

                            <div className='text-xl'>

                                <div className='mb-4 flex justify-between items-center'>
                                    <div>
                                        <p className='font-bold mb-2'>Registration ID: </p>
                                        <p>{regDetails?.id}</p>
                                    </div>
                                    {(regDetails?.bestVote) && (<FontAwesomeIcon className='text-red-600' icon={faHeart} size='3x' />)}
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Koi Name: </p>
                                    <p>{regDetails?.name}</p>
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Show Group: </p>
                                    <p>{regDetails?.group || 'N/A'}</p>
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Size: </p>
                                    <p>{regDetails?.size} cm</p>
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Variety: </p>
                                    <p>{regDetails?.variety}</p>
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Description: </p>
                                    <p>{regDetails?.description}</p>
                                </div>

                                <div className='mb-4 font-bold'>
                                    <p><span>Vote: </span>16</p>
                                </div>

                                <div>
                                    {/* <p className='font-bold mb-2'>Vote for us: </p> */}
                                    <Popconfirm
                                        title={`Are you sure to ${vote} this koi?`}
                                        onConfirm={handleVote}
                                        onCancel={() => { }}
                                        placement=""
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button
                                            className='btnAddKoi text-xl w-full font-bold py-3 rounded-xl bg-green-500 hover:bg-green-700 hover:text-white duration-300'
                                        >
                                            {vote}
                                        </button>
                                    </Popconfirm>
                                </div>

                            </div>
                        </Card>
                    </div>

                    <div className='basis-6/12 space-y-5'>
                        <Card hoverable>
                            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                                {imgUrls && (
                                    imgUrls.map((url, index) => (
                                        <div key={index} className='relative'>
                                            <div className='z-10 inset-0 absolute top-0'>
                                                <Image
                                                    className='object-fit w-full'
                                                    preview={true}
                                                    src={url}
                                                />
                                            </div>
                                            <img
                                                src={url}
                                                className='object-fit w-full'
                                            />
                                        </div>
                                    ))
                                )}
                            </Carousel>
                        </Card>
                    </div>
                </div>

                <div>
                    <Card hoverable className='text-start'>
                        <h4 className='text-xl font-semibold mb-5'>Watch Keto video</h4>
                        <iframe
                            className='w-full h-[700px]'
                            src={regDetails?.video}
                            allowFullScreen
                        ></iframe>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default RegDetails