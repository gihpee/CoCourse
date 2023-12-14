import React from "react";
import { useParams } from 'react-router-dom';

function ECourse() {
    const { id } = useParams();

    return <>{id}</>
}

export default ECourse;