import * as dotenv from "dotenv";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import * as data from "./drinking_machine.json";

const Map = (): JSX.Element => {
  dotenv.config();
  const containerStyle = {
    width: "100%",
    height: "90vh",
    marginTop: "20px",
    marginBottom: "20px",
  };

  const center = {
    lng: 127.76666539719781,
    lat: 26.25334632814227,
  };

  const markerJsx: JSX.Element[] = [];

  for (const machine of data.machines) {
    const location = {
      lng: machine.location[0],
      lat: machine.location[1],
    };
    const element = (
      <Marker key={location.lat + location.lng} position={location} />
    );
    /*keyの中身は要相談*/
    markerJsx.push(element);
  }

  const api = process.env.REACT_APP_GOOGLE_API_KEY as string;
  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={center} />
        {markerJsx}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
