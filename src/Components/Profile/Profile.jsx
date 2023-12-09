import React from "react";
import "./Profile.css";

function Home() {
  let id = window.Telegram.WebApp.initDataUnsafe.id
  return <div>{id}</div>;
}

export default Home;
