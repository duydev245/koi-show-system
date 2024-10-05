import React from 'react'
import { useParams } from 'react-router-dom'
import { Banner } from '../../../components/Banner';
import { ShowTitle } from '../../../components/ShowTitle';
import 'animate.css';
import { LoadingComponent } from '../../../components/LoadingComponent';
import { useQuery } from '@tanstack/react-query';
import { showApi } from '../../../apis/show.api';
import dayjs from "dayjs";
import ShowDesc from './ShowDesc';
import ShowRules from './ShowRules';
import ShowGuide from './ShowGuide';
import ListKoiEntries from './ListKoiEntries';
import { NotFoundComponent } from '../../../components/NotFoundComponent';

const KoiShowDetails = () => {
  const { id } = useParams();

  if (!id || id === 'undefined') {
    return <NotFoundComponent />;
  }

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
        <ListKoiEntries
          showName={showName}
          showID={id}
        />
      </div>

    </>
  )
}

export default KoiShowDetails
