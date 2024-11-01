import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Card, Col, Row, Skeleton, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { OngoingShow } from '../../../components/OngoingShow';
import { EndedShow } from '../../../components/EndedShow';
import { ScoringShow } from '../../../components/ScoringShow';
import dayjs from "dayjs";
import { showApi } from '../../../apis/show.api';
import { useQuery } from '@tanstack/react-query';
import { isEven } from '../KoiShowDetails/ShowDesc';

const CurrentShow = ({ currentShow }) => {

    const navigate = useNavigate();

    const showId = currentShow?.showId;
    const [showData, setDataShow] = useState({});
    const [imageLoaded, setImageLoaded] = useState(false);

    const { data: showDetails, isFetching, error } = useQuery({
        queryKey: ['show-details', showId],
        queryFn: () => showApi.getShowDetails(showId),
        enabled: !!showId,
    });
    // console.log("🚀 ~ CurrentShow ~ showDetails:", showDetails)

    useEffect(() => {
        if (showDetails) {
            setDataShow(showDetails);
        } else {
            setDataShow({});
        }
    }, [showDetails]);


    let showStatus = showData?.showStatus?.toLowerCase();
    let openForm = dayjs(showData?.registrationStartDate).format("DD/MM");
    let closeForm = dayjs(showData?.registrationCloseDate).format("DD/MM");
    let showGroups = showData?.showGroups;

    const bestVotedKois = showGroups?.map(group => group.registrations.find(reg => reg.isBestVote === true)).filter(Boolean);

    const handleOnClick = (idShow) => {
        return navigate(`/show-details/${idShow}`);
    }

    if (isFetching) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spin tip="Loading..." />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Warning"
                description="Something went wrong..."
                type="warning"
                showIcon
            />
        );
    }

    return (
        <>
            <div className='p-4 mb-5'>
                <Card hoverable onClick={() => { handleOnClick(showData?.showId) }} >
                    <Row gutter={[0, 10]}>
                        <Col span={24} style={{ width: '100%' }}>
                            {/* currentShow?.showBanner */}
                            <>
                                {!imageLoaded && (
                                    <div className='skeleton-wrapper w-full'>
                                        <Skeleton.Image className='skeleton-image' active />
                                    </div>
                                )}
                                <img
                                    className='w-full rounded-lg md:h-[350px] lg:h-[480px]'
                                    src={showData?.showBanner} alt={showData?.showTitle}
                                    onLoad={() => setImageLoaded(true)}
                                    style={{ display: imageLoaded ? 'block' : 'none' }}
                                />
                            </>
                        </Col>
                        <Col span={24} className='flex flex-col items-start justify-center ml-4'>
                            <div className='text-4xl'>
                                {/* show status */}
                                {(showStatus === 'on going') && (<OngoingShow />)}
                                {(showStatus === 'scoring') && (<ScoringShow />)}
                                {(showStatus === 'finished') && (<EndedShow />)}
                            </div>
                            <h4 className='text-4xl font-bold'>{showData?.showTitle}</h4>
                        </Col>
                        <Col span={12} className='pe-2'>

                            <div className='text-lg'>
                                <div className="space-y-2 ml-4">
                                    <div className='mb-2 space-y-3'>
                                        <h4 className='text-3xl font-bold mb-2'>About:</h4>
                                        <p className='text-lg ml-4'>
                                            {(currentShow) ?
                                                (
                                                    <>
                                                        <p className='text-lg ml-4'>
                                                            - Registration Time: <span className='font-bold text-red-500'>{openForm} - {closeForm}</span>
                                                        </p>
                                                        <p className='text-lg ml-4'>
                                                            - {showData?.showDesc}
                                                        </p>

                                                    </>
                                                ) : (
                                                    <Skeleton active paragraph={{ rows: 3 }} />
                                                )
                                            }
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        <Col span={12} className='ps-2'>
                            {showData?.showReferee ? (
                                <>
                                    <div className="mb-4">
                                        <p className='font-bold mb-2 text-3xl'>Official Judges: </p>
                                        <ul className="space-y-2 ml-4 text-lg">
                                            {showData?.showReferee?.map((ref) => (
                                                <li key={ref.refereeId}>
                                                    - {ref.refereeName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Skeleton active paragraph={{ rows: 5 }} />
                            )}
                        </Col>

                        <Col span={24} className='p-6 md:py-6 bg-white md:px-28'>
                            {(showStatus === 'finished') &&
                                (
                                    <div className='mb-4'>
                                        <div className='flex items-center justify-center mb-2'>
                                            {/* <FontAwesomeIcon className='text-orange-500  me-1' icon={faTrophy} size='2x' /> */}
                                            <h4 className='font-bold text-red-600 uppercase text-3xl'>
                                                Congratulations to our champions:
                                            </h4>
                                        </div>

                                        <div className="space-y-4">
                                            {showGroups?.map((gr) => (
                                                <div key={gr.groupId} className="mb-4 bg-gray-100 p-6 rounded-md">
                                                    <p className='text-2xl font-bold mb-2'>{gr.groupName}</p>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {gr.registrations?.slice(0, 3).map((koi, index) => (
                                                            <Card
                                                                key={index}
                                                                cover={<img className='md:h-[305px] lg:h-[478px]' alt={koi?.name} src={koi?.image1} />}
                                                            >
                                                                <div className='flex justify-center items-center mb-3'>
                                                                    {(koi.rank === 1) &&
                                                                        (<>
                                                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='3x' />
                                                                            <span className='text-2xl font-bold ms-2'>1st Place Winner</span>
                                                                        </>)
                                                                    }

                                                                    {(koi.rank === 2) &&
                                                                        (<>
                                                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                                                            <span className='text-2xl font-bold ms-2'>2nd Place Winner</span>
                                                                        </>)
                                                                    }

                                                                    {(koi.rank === 3) &&
                                                                        (<>
                                                                            <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                                                            <span className='text-2xl font-bold ms-2'>3rd Place Winner</span>
                                                                        </>)
                                                                    }
                                                                </div>
                                                                <div
                                                                    className='flex justify-evenly items-center'
                                                                >
                                                                    <Typography className='text-2xl font-bold hover:text-blue-500 duration-300 transition-all'>
                                                                        {koi.name}
                                                                    </Typography>
                                                                    {(koi.isBestVote) && (<FontAwesomeIcon className='text-red-600' icon={faHeart} size='2x' />)}
                                                                </div>
                                                                {/* <Typography className='text-lg flex justify-evenly items-center'>
                                                                <span className="font-bold">Total score:</span>
                                                                <span>{koi.totalScore}</span>
                                                            </Typography> */}
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='mt-4'>
                                            {(bestVotedKois?.length > 0) && (
                                                <div className="mb-4 bg-gray-100 p-6 rounded-md">
                                                    <p className='text-2xl font-bold mb-2'>Best Voting</p>
                                                    <div className={`grid ${isEven(bestVotedKois?.length) ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                                                        {bestVotedKois?.map((reg, index) => (
                                                            <Card
                                                                key={index}
                                                                cover={<img className='md:h-[305px] lg:h-[478px]' alt={reg?.name} src={reg?.image1} />}
                                                            >
                                                                {(reg.isBestVote) && (
                                                                    <div className='flex justify-center items-center mb-3'>
                                                                        <FontAwesomeIcon className='text-red-600' icon={faHeart} size='2x' />
                                                                        <span className='text-2xl font-bold ms-2'>Best vote in group</span>
                                                                    </div>
                                                                )}
                                                                <div className='flex justify-center items-center' onClick={() => { handleOnClick(reg.id) }}>
                                                                    <Typography className='text-2xl font-bold hover:text-blue-500 duration-300 transition-all'>
                                                                        {reg.name}
                                                                    </Typography>
                                                                </div>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            }

                        </Col>
                        <Col span={24}>
                            <button
                                className='btnAddKoi text-2xl font-bold w-full py-3 rounded-xl bg-red-600 text-white hover:text-black duration-300'>
                                View more
                            </button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default CurrentShow