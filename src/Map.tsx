import * as dotenv from "dotenv";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import * as data from "./drinking_machine.json";
import React, { useEffect, useState } from "react";

export interface Location {
  lat: number;
  lng: number;
}

export interface MapProps {
  center: Location;
}

const Map = (props: MapProps): JSX.Element => {
  const URL =
    "https://4.bp.blogspot.com/-sdhuHWjgfCo/UYOsrFBf5RI/AAAAAAAARKs/THaabR1hDq4/s400/umi_kani.png";
  dotenv.config();
  const containerStyle = {
    width: "100%",
    height: "90vh",
    marginTop: "20px",
    marginBottom: "20px",
  };
  const markerJsx: JSX.Element[] = [];
  const popupJsx: JSX.Element[] = [];
  const [myPositionMarkerJsx, setMyPositionMarkerJsx] = useState<JSX.Element>();
  const [ispopup, setIspopup] = useState<JSX.Element>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (value) => {
        const location = {
          lng: value.coords.longitude,
          lat: value.coords.latitude,
        };
        const options: google.maps.Icon = {
          url: URL,
          scaledSize: new google.maps.Size(40, 40),
        };
        setMyPositionMarkerJsx(
          <Marker
            key={location.lat + location.lng}
            position={location}
            icon={options}
          />
        );
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
    // [] つけないとレンダリングされる度に実行されるらしい
  }, []);

  for (let i = 0; i < data.machines.length; i++) {
    const location = {
      lng: data.machines[i].location[0],
      lat: data.machines[i].location[1],
    };
    const location_pop = {
      lng: data.machines[i].location[0],
      lat: data.machines[i].location[1] + 0.00003,
    };
    const element = (
      <Marker
        key={location.lat + location.lng}
        position={location}
        onClick={() => {
          setIspopup(popupJsx[i]);
        }}
      ></Marker>
    );
    /*keyの中身は要相談*/
    markerJsx.push(element);

    const element_popup = (
      <InfoWindow
        key={location.lat + location.lng}
        position={location_pop}
        onCloseClick={() => {
          setIspopup(<div></div>);
        }}
      >
        <div>
          {data.machines[i].type}
          <br />
          {data.machines[i].place}
        </div>
      </InfoWindow>
    );

    popupJsx.push(element_popup);
  }
  const api = process.env.REACT_APP_GOOGLE_API_KEY as string;
  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={17}
      >
        {markerJsx}
        {myPositionMarkerJsx}
        {ispopup}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
