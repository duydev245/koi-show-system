import React from 'react'
import { useParams } from 'react-router-dom';

const KoiDetails = () => {
    
    const { id } = useParams();
    console.log("🚀 ~ KoiDetails ~ id:", id)

    return (
        <div>
            KoiDetails
            KoiDetails
        </div>
    )
}

export default KoiDetails
