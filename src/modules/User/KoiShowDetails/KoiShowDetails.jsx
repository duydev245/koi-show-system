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
import { varietyApi } from '../../../apis/variety.api';

const KoiShowDetails = () => {
  const { id } = useParams();

  const { data: showDetails, isLoading, error } = useQuery({
    queryKey: ['show-details'],
    queryFn: () => showApi.getShowDetails(id),
    enabled: !!id,
  });
  // console.log("🚀 ~ KoiShowDetails ~ showDetails:", showDetails)

  // dataListVariety
  const { data: dataListVariety } = useQuery({
    queryKey: ["list-variety", showDetails?.showId],
    queryFn: () => varietyApi.getAllVarietyByShow(showDetails?.showId),
    enabled: !!showDetails?.showId
  });

  let showID = showDetails?.showId;
  let showName = showDetails?.showTitle;
  let showDesc = showDetails?.showDesc;
  let showStatus = showDetails?.showStatus.toLowerCase();
  let showReferee = showDetails?.showReferee;
  let showGroups = showDetails?.showGroups;

  let openForm = dayjs(showDetails?.registrationStartDate).format("DD/MM");
  let closeForm = dayjs(showDetails?.registrationCloseDate).format("DD/MM");
  let startDate = dayjs(showDetails?.startDate).format("DD/MM");
  let endDate = dayjs(showDetails?.endDate).format("DD/MM");
  let entranceFee = showDetails?.entranceFee.toLocaleString();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <NotFoundComponent />;
  }

  return (
    <>
      {/* showDetails?.showBanner */}
      {/* <Banner bannerShow={'/show-1.jpg'} /> */}
      <Banner bannerShow={showDetails?.showBanner} />

      <div className='container mx-auto'>
        <ShowTitle showName={showName} />

        <ShowDesc
          showID={showID}
          showName={showName}
          showDesc={showDesc}
          showStatus={showStatus}
          openForm={openForm}
          closeForm={closeForm}
          startDate={startDate}
          endDate={endDate}
          showReferee={showReferee}
          showGroups={showGroups}
          showFee={entranceFee}
        />

        <ShowRules
          dataListVariety={dataListVariety}
          closeForm={closeForm}
          endDate={endDate}
          showFee={entranceFee}
        />

        <ShowGuide
          closeForm={closeForm}
          endDate={endDate}
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
