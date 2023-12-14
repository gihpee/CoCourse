import React from "react";
import { useParams } from 'react-router-dom';

function Subj() {
    const { id } = useParams();

    return <>{id}</>
}

export default Subj;