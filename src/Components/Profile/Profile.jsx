import React from "react";
import "./Profile.css";

function Home() {
  const { first_name, photo_url } = window.Telegram.WebApp.initDataUnsafe.user;

  return <div>{first_name}
        <img src={photo_url} alt='' /></div>;
}

export default Home;
