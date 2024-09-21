import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Banner } from '../../../components/Banner';
import { ShowTitle } from '../../../components/ShowTitle';
import 'animate.css';
import { PATH } from '../../../routes/path';
import { ShowDesc } from '../../../components/ShowDesc';
import ShowRules from '../../../components/ShowRules/ShowRules';
import { ShowGuide } from '../../../components/ShowGuide';

const KoiShowDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("🚀 ~ KoiShowDetails ~ id:", id)

  let showStatus = 0;
  let openForm = '15/10';
  let closeForm = '25/11';
  let awardDate = '9/12'

  return (
    <>
      <Banner bannerShow={'/show-1.jpg'} />
      <div className='container mx-auto'>
        <ShowTitle showName={'1st Kodama Virtual Koi Show'} />

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

      </div>

    </>
  )
}

export default KoiShowDetails
