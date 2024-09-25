import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Banner } from '../../../components/Banner';
import { ShowTitle } from '../../../components/ShowTitle';
import 'animate.css';
import { PATH } from '../../../routes/path';
import { ShowDesc } from '../../../components/ShowDesc';
import ShowRules from '../../../components/ShowRules/ShowRules';
import { ShowGuide } from '../../../components/ShowGuide';
import { Card, Col, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const KoiShowDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("🚀 ~ KoiShowDetails ~ id:", id)

  let showName = '1st Kodama Virtual Koi Show';
  let showStatus = 0;
  let openForm = '15/10';
  let closeForm = '25/11';
  let awardDate = '9/12';

  const handleOnClick = (idKoi) => {
    return navigate(`/koi-details/${idKoi}`);
  }

  return (
    <>
      <Banner bannerShow={'/show-1.jpg'} />
      <div className='container mx-auto'>
        <ShowTitle showName={showName} />

        <ShowDesc
          showStatus={showStatus}
          openForm={openForm}
          closeForm={closeForm}
          awardDate={awardDate}
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
            <Col span={6} className='p-4'>
              <Card
                hoverable
                cover={<img alt="koi-1" src="/koi-1.jpg" />}
              >
                <div className="mb-3">
                  <div className='flex justify-between items-center mb-3 h-[42px]'>
                    <Typography className='text-2xl font-bold'>Keto</Typography>
                    <FontAwesomeIcon className='text-rose-700' icon={faTrophy} size='3x' />
                  </div>
                  <Typography className='text-lg'><span className="font-bold">Koi ID:</span> 11152</Typography>
                  <Typography className='text-lg'><span className="font-bold">Variety:</span> Kohaku</Typography>
                  <Typography className='text-lg'><span className="font-bold">Size:</span> 75 Bu + - 30” +</Typography>
                </div>
                <div>
                  <button
                    onClick={() => { handleOnClick(1) }}
                    className='btnAddKoi text-xl w-full font-bold py-2 rounded-xl bg-rose-700 hover:text-white duration-300'>
                    View details
                  </button>
                </div>
              </Card>
            </Col>

            <Col span={6} className='p-4'>
              <Card
                hoverable
                cover={<img alt="SekiguchiContest" src="/koi-1.jpg" />}
              >
                <div className="mb-3">
                  <div className='flex justify-between items-center mb-3 h-[42px]'>
                    <Typography className='text-2xl font-bold'>Keto</Typography>
                    {/* <FontAwesomeIcon className='text-rose-700' icon={faTrophy} size='3x' /> */}
                  </div>
                  <Typography className='text-lg'><span className="font-bold">Koi ID:</span> 11152</Typography>
                  <Typography className='text-lg'><span className="font-bold">Variety:</span> Kohaku</Typography>
                  <Typography className='text-lg'><span className="font-bold">Size:</span> 75 Bu + - 30” +</Typography>
                </div>
                <div>
                  <button
                    onClick={() => { handleOnClick(1) }}
                    className='btnAddKoi text-xl w-full font-bold py-2 rounded-xl bg-rose-700 hover:text-white duration-300'>
                    View details
                  </button>
                </div>
              </Card>
            </Col>

          </Row>
        </div>

      </div>

    </>
  )
}

export default KoiShowDetails
