import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import "./Detail.css";

function Detail() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    var parts = window.location.pathname.split("/");
    var lastSegment = parts.pop() || parts.pop();

    loadDetailData(lastSegment);
  }, []);

  console.log(details);

  const loadDetailData = async (id) => {
    let url = `http://localhost:3001/homelist/${id}`;
    await axios.get(url).then((response) => {
      setDetails(response.data);
    });
  };

  return (
    <div>
      <Navigation />

      <div className="img-container">
        <img src={details.image} className="detail-picture" />
      </div>
      <div className="container">
        <div className="detail-info-container">
          <div className="name-and-price">
            <div className="name-and-address">
              <h4>{details.name}</h4>
              <span>{details.address}</span>
            </div>
            <div className="price-card">
              <h3 className="info-price">{details.price} $</h3>
              <p className="info-card-area">
                ფართი:
                <span className="info-card-area-number">{details.area} მ²</span>
              </p>
            </div>
          </div>

          <div className="short-parameters-container">
            <div className="description-container">
              <p className="detail-description-title">აღწერა: </p>

              <p className="detail-description">{details.desc}</p>
            </div>

            <div className="info-parameters">
              {details.area && (
                <div className="parameters-area">
                  <img
                    className="area-image"
                    src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/Area.svg?alt=media&token=8dff854e-e581-493b-a01c-a3bd606a7774"
                  />
                  <div className="room-number-and-title">
                    <span className="parameter">{details.area} მ²</span>
                    <span className="">ფართობი</span>
                  </div>
                </div>
              )}
              {details.room && (
                <div className="parameters-rooms">
                  <img
                    className="rooms-image"
                    src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/room.svg?alt=media&token=f2afc36b-c98e-47ff-9a4d-cc2dcc071d3a"
                  />
                  <div className="room-number-and-title">
                    <span className="parameter">{details.room}</span>
                    <span className="">ოთახი</span>
                  </div>
                </div>
              )}
              {details.floor && (
                <div className="parameters-floor">
                  <img
                    className="floor-image"
                    src="https://firebasestorage.googleapis.com/v0/b/home-market-98990.appspot.com/o/Floor.svg?alt=media&token=c504c86d-1b03-42c5-a23f"
                  />
                  <div className="floor-number-and-title">
                    <span className="">{details.floor}</span>
                    <span className="">სართული</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
