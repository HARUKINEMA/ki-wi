import * as dotenv from "dotenv";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import * as data from "./drinking_machine.json";

export interface Location {
  lat: number;
  lng: number;
}

export interface MapProps {
  center: Location;
}

const Map = (props: MapProps): JSX.Element => {
  dotenv.config();
  const containerStyle = {
    width: "400px",
    height: "400px",
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
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={17}
      >
        {markerJsx}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
