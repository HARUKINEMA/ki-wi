import * as dotenv from "dotenv";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import * as data from "./drinking_machine.json";

export interface MapProps {
  lngprop: number;
  latprop: number;
  setCenter:()=>void;
  changeMarker : (setMarker :React.SetStateAction<Marker>) => void;
}


const Map = (props: MapProps): JSX.Element => {
  const [lngstate, setlngstate] = useState<number>(props.lngprop);
  const [latstate, setlatstate] = useState<number>(props.latprop);
  dotenv.config();
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lng: props.lngprop,
    lat: props.latprop,
  };

  const markerJsx: JSX.Element[] = [];

  const changeCenter = (): void => {
    center.lng = Number(setlngstate(0));
    center.lat = Number(setlatstate(0));
  };

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
