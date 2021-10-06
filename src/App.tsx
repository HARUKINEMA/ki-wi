import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lng: 127.76666539719781,
  lat: 26.25334632814227,
};

const position1 = {
  lng: 127.76666539719781,
  lat: 26.25334632814227,
};

const position2 = {
  lng: 127.76635827657901,
  lat: 26.253525552761033,
};

const MyComponent = () => {
  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={position1} />
        <Marker position={position2} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;