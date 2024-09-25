import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { KoiTitle } from '../../../components/KoiTitle';
import { Card, Image, Popconfirm } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';


const KoiDetails = () => {
    const [vote, setVote] = useState('Vote');

    const { id } = useParams();
    console.log("🚀 ~ KoiDetails ~ id:", id)

    let koiName = 'Keto';

    const handleVote = () => {
        if (vote === 'Vote') {
            setVote('Unvote');
        }

        if (vote === 'Unvote') {
            setVote('Vote');
        }
    }

    return (
        <>
            <KoiTitle koiName={koiName} />
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 lg:flex gap-5 mb-8'>
                    <div className='basis-6/12 space-y-6 lg:sticky w-full lg:h-full top-32'>
                        <Card hoverable className='p-5'>
                            <h4 className='text-3xl font-bold mb-5 text-center'>Koi Details</h4>
                            <div className='text-xl'>

                                <div className='mb-4 flex justify-between items-center'>
                                    <div>
                                        <p className='font-bold mb-2'>KOI ID: </p>
                                        <p>11152</p>
                                    </div>
                                    <FontAwesomeIcon className='text-rose-700' icon={faTrophy} size='3x' />
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>KOI Name: </p>
                                    <p>Keto</p>
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Size: </p>
                                    <p>75 Bu + - 30” +</p>
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Variety: </p>
                                    <p>Kohaku</p>
                                </div>

                                <div className='mb-4'>
                                    <p className='font-bold mb-2'>Description: </p>
                                    <p>We named this koi Keto because it has been so slender but it is finally starting to widen up.</p>
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
                                <div className='relative'>
                                    <div className='z-10 inset-0 absolute top-0'>
                                        <Image
                                            className='object-fit w-full'
                                            preview={true}
                                            src="/koi-1.jpg"
                                        />
                                    </div>
                                    <img
                                        src="/koi-1.jpg"
                                        className='object-fit w-full'
                                    />
                                </div>
                                <div className='relative'>
                                    <div className='z-10 inset-0 absolute top-0'>
                                        <Image
                                            className='object-fit w-full'
                                            preview={true}
                                            src="/koi-1.jpg"
                                        />
                                    </div>
                                    <img
                                        src="/koi-1.jpg"
                                        className='object-fit w-full'
                                    />
                                </div>
                                <div className='relative'>
                                    <div className='z-10 inset-0 absolute top-0'>
                                        <Image
                                            className='object-fit w-full'
                                            preview={true}
                                            src="/koi-1.jpg"
                                        />
                                    </div>
                                    <img
                                        src="/koi-1.jpg"
                                        className='object-fit w-full'
                                    />
                                </div>

                            </Carousel>
                        </Card>
                    </div>
                </div>

                <div>
                    <Card hoverable className='text-start'>
                        <h4 className='text-xl font-semibold mb-5'>Watch Keto video</h4>
                        <iframe
                            className='w-full h-[700px]'
                            src="https://www.youtube.com/embed/PAEbwU9OrPk"
                            allowFullScreen
                        ></iframe>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default KoiDetails
