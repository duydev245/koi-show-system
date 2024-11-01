import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Checkbox, Col, Pagination, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { PAGE_SIZE } from '../../../constants';
import { registrationApi } from '../../../apis/registration.api';
import { SearchForm } from '../../../components/SearchForm';
import { varietyApi } from '../../../apis/variety.api';

const ListKoiEntries = ({ showName, showID }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [showRegistrations, setShowRegistrations] = useState([]);

    const [groupVarieties, setGroupVarieties] = useState([]);

    const navigate = useNavigate();

    // listRegistration
    const { data: listRegistration } = useQuery({
        queryKey: ['list-registration', { currentPage }],
        queryFn: () => registrationApi.getListRegByShowId({ pageIndex: currentPage, showID }),
        enabled: !!showID,
    });
    // console.log("🚀 ~ KoiShowDetails ~ listRegistration:", listRegistration)

    const total = listRegistration?.totalItems || 0;
    // console.log("🚀 ~ KoiShowDetails ~ total:", total)

    useEffect(() => {
        setShowRegistrations(listRegistration?.registrations);
    }, [listRegistration])

    // dataShowVariety
    const { data: dataShowVariety, isLoading: isLoadingListVariety } = useQuery({
        queryKey: ["data-show-variety", showID],
        queryFn: () => varietyApi.getAllVarietyByShow(showID),
        enabled: !!showID,
    });

    const handleOnClick = (idKoi) => {
        return navigate(`/registration-details/${idKoi}`);
    }

    const onSearch = (payload) => {
        const searchKeyword = payload.keyword.trim().toLowerCase();

        const filtered = listRegistration?.registrations.filter((reg) =>
            reg.name.trim().toLowerCase().includes(searchKeyword)
        );

        setShowRegistrations(filtered || []);
    }

    // handleChangeCheckBox
    const handleVarietyChange = (varietyName) => {
        setGroupVarieties((prevSelected) => {
            const newSelected = prevSelected.includes(varietyName)
                ? prevSelected.filter(name => name !== varietyName)
                : [...prevSelected, varietyName];

            // Filter registrations based on selected varieties
            const filteredRegistrations = listRegistration?.registrations.filter((reg) =>
                newSelected.length === 0 || newSelected.includes(reg.variety) // Match with reg.variety
            );

            setShowRegistrations(filteredRegistrations || []);
            return newSelected;
        });
    };

    return (
        <>
            <div className="mb-5">
                <div className='mb-8'>
                    <h3 className='text-4xl text-red-600 font-bold mb-5'>{showName} Entries</h3>
                    <p className='text-xl text-red-600 font-bold'>
                        The award winners were decided by our elite judges, sponsors, and koi show participants. These are the best of the best koi, submitted to our koi show, from over {total} koi.
                    </p>
                </div>

                <SearchForm
                    handleSearch={onSearch}
                />

                {/* filter variety */}
                <div className='mt-1'>
                    {dataShowVariety?.map(variety => (
                        <Checkbox
                            className='text-base'
                            key={variety.varietyName}
                            checked={groupVarieties.includes(variety.varietyName)}
                            onChange={() => handleVarietyChange(variety.varietyName)}
                        >
                            {variety.varietyName} ({variety.varietyOrigin})
                        </Checkbox>
                    ))}
                </div>

                {/* list koi entries */}
                <Row>
                    {
                        (showRegistrations?.length > 0) ? (
                            showRegistrations?.map((reg) => (
                                <Col span={6} key={reg.id} className='p-4'>
                                    <Card
                                        hoverable
                                        onClick={() => { handleOnClick(reg.id) }}
                                        // cover={<img alt={reg.name} src="/koi-1.jpg" />}
                                        cover={<img className='md:h-[305px] lg:h-[478px] ' alt={reg.name} src={reg.image1} />}
                                    >
                                        <div className="mb-3">
                                            <div className='flex justify-center items-center mb-3 h-[42px]'>
                                                {(reg.rank === 1) &&
                                                    (<>
                                                        <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='3x' />
                                                        <span className='text-2xl font-bold ms-2'>1st Place Winner</span>
                                                    </>)
                                                }

                                                {(reg.rank === 2) &&
                                                    (<>
                                                        <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                                        <span className='text-2xl font-bold ms-2'>2nd Place Winner</span>
                                                    </>)
                                                }

                                                {(reg.rank === 3) &&
                                                    (<>
                                                        <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                                                        <span className='text-2xl font-bold ms-2'>3rd Place Winner</span>
                                                    </>)
                                                }
                                            </div>

                                            <div className='flex justify-between items-center h-[42px]'>
                                                <Typography className='text-2xl font-bold'>{reg.name}</Typography>
                                                {(reg.isBestVote) && (<FontAwesomeIcon className='text-red-600' icon={faHeart} size='3x' />)}
                                            </div>

                                            <Typography className='text-lg grid grid-cols-2'>
                                                <span className="font-bold">Show group:</span>
                                                <span>{reg.group}</span>
                                            </Typography>
                                            <Typography className='text-lg grid grid-cols-2'>
                                                <span className="font-bold">Variety:</span>
                                                <span>{reg.variety}</span>
                                            </Typography>
                                            <Typography className='text-lg grid grid-cols-2'>
                                                <span className="font-bold">Size:</span>
                                                <span>{reg.size} cm</span>
                                            </Typography>
                                            {
                                                reg.totalScore && (
                                                    <Typography className='text-lg grid grid-cols-2'>
                                                        <span className="font-bold">Total Score:</span>
                                                        <span>{reg.totalScore}</span>
                                                    </Typography>
                                                )
                                            }

                                        </div>
                                        <div>
                                            <button
                                                className='btnAddKoi text-xl w-full font-bold py-2 rounded-xl bg-red-600 text-white hover:text-black duration-300'>
                                                View details
                                            </button>
                                        </div>
                                    </Card>
                                </Col>))
                        ) : (
                            <Col span={24} className='text-xl p-4'>
                                <p>No results found....</p>
                            </Col>
                        )
                    }
                </Row>

                <Pagination
                    className='m-2'
                    align="end"
                    total={total}
                    simple
                    pageSize={PAGE_SIZE}
                    current={currentPage}
                    onChange={(page) => {
                        setCurrentPage(page);
                    }}
                    showSizeChanger={false}
                />
            </div>
        </>
    )
}

export default ListKoiEntries