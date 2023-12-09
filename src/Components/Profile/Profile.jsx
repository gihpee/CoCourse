import React from "react";
import "./Profile.css";

function Home() {
  const { first_name, last_name, photo_url } = window.Telegram.WebApp.initDataUnsafe.user;

  return <>
          <div className="prev" style={{backgroundImage: `url(${photo_url})`}}>
            <p>{ first_name + ' ' + last_name }</p>
          </div>
        </>;
}

export default Home;
