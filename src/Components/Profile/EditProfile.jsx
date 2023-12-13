import React from "react";
import { useParams } from 'react-router-dom';

function EditProfile() {
    const { id } = useParams();

    return <>edit {id}</>
}

export default EditProfile;