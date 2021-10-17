import * as dotenv from "dotenv";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import * as data from "./drinking_machine.json";
import { Interface } from "readline";
export interface MapProps{
  lngprop:number;
  latprop:number;
}
const Map = (props:MapProps): JSX.Element => {
  const latstate = useState<number>(props.latprop);
  const lngstate = useState<number>(props.lngprop);
  dotenv.config();
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  const center = {
    lng: props.lngprop as number,
    lat: props.latprop as number,
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
  const changecenter = (): void => {
    props.latprop=0;
    props.latprop=0;
  };
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