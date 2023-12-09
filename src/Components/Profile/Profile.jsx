import React from "react";
import "./Profile.css";

function Home() {
  const { first_name } = window.Telegram.WebApp.initDataUnsafe.user;

  return <div>{first_name}</div>;
}

export default Home;
