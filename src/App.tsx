import * as dotenv from "dotenv";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import React, { useState } from "react";
import * as data from "./drinking_machine.json";
/*import { INSPECT_MAX_BYTES } from "buffer";*/

const Map = (): JSX.Element => {
  dotenv.config();
  const [ispopup, setIspopup] = useState<JSX.Element>();
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lng: 127.76666539719781,
    lat: 26.25334632814227,
  };

  const markerJsx: JSX.Element[] = [];
  const popupJsx: JSX.Element[] = [];

  for (const machine of data.machines) {
    const location = {
      lng: machine.location[0],
      lat: machine.location[1],
    };
    const element = (
      <Marker
        key={location.lat + location.lng}
        position={location}
        onClick={() => {
          setIspopup(popupJsx[0])
        }}
      ></Marker>
    );
    /*keyの中身は要相談*/
    markerJsx.push(element);

    const element_popup = (
      <InfoWindow key={location.lat + location.lng} position={location} 
      onCloseClick={() => {setIspopup(<div></div>)}}>
        <div>aa</div>
      </InfoWindow>
    );

    popupJsx.push(element_popup);
    console.log(markerJsx);
  }

  const api = process.env.REACT_APP_GOOGLE_API_KEY as string;
  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <>
          {/* マーカー */}
          {markerJsx}
          {ispopup}
        </>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
