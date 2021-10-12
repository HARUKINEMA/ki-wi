import * as dotenv from "dotenv";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import * as data from "./drinking_machine.json";

const MyComponent = () => {
  dotenv.config();
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lng: 127.76666539719781,
    lat: 26.25334632814227,
  };

  const elements: JSX.Element[] = [];

  for (const item of data.machines) {
    const locate = {
      lng: item.location[0],
      lat: item.location[1],
    };
    const element = <Marker key={locate.lat + locate.lng} position={locate} />;
    /*keyの中身は要相談*/
    elements.push(element);
  }

  const api = process.env.REACT_APP_GOOGLE_API_KEY as string;
  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={center} />
        {elements}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;
