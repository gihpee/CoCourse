import React from "react";
import { useParams } from 'react-router-dom';

function Univ() {
    const { id } = useParams();

    return <>{id}</>
}

export default Univ;