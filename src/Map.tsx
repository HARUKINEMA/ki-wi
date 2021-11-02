import * as dotenv from "dotenv";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

export interface Location {
  lat: number;
  lng: number;
}

export interface MapProps {
  center: Location;
  markers: JSX.Element[];
  popup: JSX.Element | undefined;
  nSize: number;
}

const Map = (props: MapProps): JSX.Element => {
  const URL =
    "https://4.bp.blogspot.com/-sdhuHWjgfCo/UYOsrFBf5RI/AAAAAAAARKs/THaabR1hDq4/s400/umi_kani.png";
  dotenv.config();
  const containerStyle = {
    width: "100%",
    height: "80vh",
    marginTop: "20px",
    marginBottom: "20px",
  };
  const [myPositionMarkerJsx, setMyPositionMarkerJsx] = useState<JSX.Element>();

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

  const api = process.env.REACT_APP_GOOGLE_API_KEY as string;
  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={props.nSize}
      >
        {props.markers}
        {myPositionMarkerJsx}
        {props.popup}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
