import React, { useEffect, useState } from 'react'
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

  const [showData, setDataShow] = useState({});
  const [variety, setVariety] = useState([]);

  const { data: showDetails, isFetching, error } = useQuery({
    queryKey: ['show-details', id],
    queryFn: () => showApi.getShowDetails(id),
    enabled: !!id,
    staleTime: 0
  });
  // console.log("🚀 ~ KoiShowDetails ~ showDetails:", showDetails)

  // dataListVariety
  const { data: dataListVariety } = useQuery({
    queryKey: ["list-variety", showDetails?.showId],
    queryFn: () => varietyApi.getAllVarietyByShow(showDetails?.showId),
    enabled: !!showDetails?.showId, // Chỉ gọi khi showDetails?.showId đã có giá trị
    staleTime: 0
  });

  useEffect(() => {
    if (showDetails) {
      setDataShow(showDetails);
    } else {
      setDataShow({});
    }
  }, [showDetails]);

  useEffect(() => {
    if (dataListVariety) {
      setVariety(dataListVariety);
    } else {
      setVariety([]);
    }
  }, [dataListVariety]);

  let showID = showData?.showId;
  let showName = showData?.showTitle;
  let showDesc = showData?.showDesc;
  let showStatus = showData?.showStatus?.toLowerCase();
  let showReferee = showData?.showReferee;
  let showGroups = showData?.showGroups;

  let openForm = dayjs(showData?.registrationStartDate).format("DD/MM");
  let closeForm = dayjs(showData?.registrationCloseDate).format("DD/MM");
  let startDate = dayjs(showData?.startDate).format("DD/MM");
  let endDate = dayjs(showData?.endDate).format("DD/MM");
  let entranceFee = showData?.entranceFee?.toLocaleString();

  if (isFetching) {
    return <LoadingComponent />;
  }

  if (error) {
    return <NotFoundComponent />;
  }

  return (

    (!isFetching) && (
      <>
        {/* showData?.showBanner */}
        {/* <Banner bannerShow={'/show-1.jpg'} /> */}
        <Banner bannerShow={showData?.showBanner} />

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
            dataListVariety={variety}
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
  )
}

export default KoiShowDetails
