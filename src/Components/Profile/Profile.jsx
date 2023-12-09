import React from "react";
import "./Profile.css";

function Home() {
  const { id } = window.Telegram.WebApp.initDataUnsafe.user;

  return <div>{id}</div>;
}

export default Home;
