import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Banner } from '../../../components/Banner';
import { ShowTitle } from '../../../components/ShowTitle';
import 'animate.css';
import { PATH } from '../../../routes/path';
import { ShowDesc } from '../../../components/ShowDesc';
import ShowRules from '../../../components/ShowRules/ShowRules';
import { ShowGuide } from '../../../components/ShowGuide';
import { Card, Col, Pagination, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { LoadingComponent } from '../../../components/LoadingComponent';
import { useQuery } from '@tanstack/react-query';
import { showApi } from '../../../apis/show.api';
import dayjs from "dayjs";
import { PAGE_SIZE } from '../../../constants';

const KoiShowDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("🚀 ~ KoiShowDetails ~ id:", id)

  const { data: showDetails, isLoading, error } = useQuery({
    queryKey: ['show-details'],
    queryFn: () => showApi.getShowDetails(id),
  });
  // console.log("🚀 ~ KoiShowDetails ~ showDetails:", showDetails)

  let showName = showDetails?.showName;
  let showDesc = showDetails?.showDesc;
  let showStatus = showDetails?.showStatus;
  let showReferee = showDetails?.showReferee;
  let showGroups = showDetails?.showGroups;

  let openForm = dayjs(showDetails?.registrationStartDate).format("DD/MM");
  let closeForm = dayjs(showDetails?.registrationCloseDate).format("DD/MM");
  let awardDate = dayjs(showDetails?.startDate).format("DD/MM");

  const { data: listKoi } = useQuery({
    queryKey: ['list-koi', { currentPage }],
    queryFn: () => showApi.getListKoiByShow({ pageIndex: currentPage, showID: id }),
  });
  // console.log("🚀 ~ KoiShowDetails ~ listKoi:", listKoi)

  const total = listKoi?.totalItems || 0;
  console.log("🚀 ~ KoiShowDetails ~ total:", total)

  const handleOnClick = (idKoi) => {
    return navigate(`/koi-details/${idKoi}`);
  }

  console.log("🚀 ~ KoiShowDetails ~ isLoading:", isLoading)
  if (isLoading && error) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Banner bannerShow={'/show-1.jpg'} />
      <div className='container mx-auto'>
        <ShowTitle showName={showName} />

        <ShowDesc
          showDesc={showDesc}
          showStatus={showStatus}
          openForm={openForm}
          closeForm={closeForm}
          awardDate={awardDate}
          showReferee={showReferee}
          showGroups={showGroups}
        />

        <ShowRules
          closeForm={closeForm}
          awardDate={awardDate}
        />

        <ShowGuide
          closeForm={closeForm}
          awardDate={awardDate}
        />

        {/* koi entries */}
        <div className="mb-5">
          <div className='mb-8'>
            <h3 className='text-4xl text-red-600 font-bold mb-5'>{showName} Entries</h3>
            <p className='text-xl text-red-600 font-bold'>
              The award winners were decided by our elite judges, sponsors, and koi show participants. These are the best of the best koi, submitted to our koi show, from over 300 koi.
            </p>
          </div>
          {/* list koi entries */}
          <Row>
            {listKoi?.kois.map((koi) => (
              <Col span={6} key={koi.koiID} className='p-4'>
                <Card
                  hoverable
                  cover={<img alt={koi.koiName} src="/koi-1.jpg" />}
                >
                  <div className="mb-3">
                    <div className='flex justify-center items-center mb-3 h-[42px]'>
                      {(koi.koiRank === 1) &&
                        (<>
                          <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='3x' />
                          <span className='text-2xl font-bold ms-2'>1st Place Winner</span>
                        </>)
                      }

                      {(koi.koiRank === 2) &&
                        (<>
                          <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='2x' />
                          <span className='text-2xl font-bold ms-2'>2nd Place Winner</span>
                        </>)
                      }

                      {(koi.koiRank === 3) &&
                        (<>
                          <FontAwesomeIcon className='text-orange-500' icon={faTrophy} size='1x' />
                          <span className='text-2xl font-bold ms-2'>3rd Place Winner</span>
                        </>)
                      }
                    </div>

                    <div className='flex justify-between items-center h-[42px]'>
                      <Typography className='text-2xl font-bold'>{koi.koiName}</Typography>
                      {(koi.bestVoted) && (<FontAwesomeIcon className='text-rose-700' icon={faHeart} size='3x' />)}
                    </div>

                    <Typography className='text-lg'><span className="font-bold">Koi ID:</span> {koi.koiID}</Typography>
                    <Typography className='text-lg'><span className="font-bold">Variety:</span> {koi.koiVariety}</Typography>
                    <Typography className='text-lg'><span className="font-bold">Size:</span> {koi.koiVariety}</Typography>
                  </div>
                  <div>
                    <button
                      onClick={() => { handleOnClick(koi.koiID) }}
                      className='btnAddKoi text-xl w-full font-bold py-2 rounded-xl bg-rose-700 hover:text-white duration-300'>
                      View details
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination
            className='me-2'
            align="end"
            total={total}
            pageSize={PAGE_SIZE}
            defaultCurrent={1}
            onChange={(page) => {
              setCurrentPage(page);
            }}
            showSizeChanger={false}
          />
        </div>

      </div>

    </>
  )
}

export default KoiShowDetails
