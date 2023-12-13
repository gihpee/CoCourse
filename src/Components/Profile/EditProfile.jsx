import React, {useState} from "react";

function EditProfile() {
    const { id } = useParams();

    return <>edit {id}</>
}

export default EditProfile;