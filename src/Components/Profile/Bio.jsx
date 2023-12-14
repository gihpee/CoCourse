import React from "react";
import { useParams } from 'react-router-dom';

function Bio() {
    const { id } = useParams();

    return <>{id}</>
}

export default Bio;