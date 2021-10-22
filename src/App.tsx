import React, { useState } from "react";
import Map, { Location } from "./Map";
import CheckBox, { Building, CheckBoxProps } from "./CheckBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Marker } from "@react-google-maps/api";
import * as data from "./drinking_machine.json";

function SetCenter(type: Building): Location {
  let center: Location = {
    lat: 0,
    lng: 0,
  };

  if (type == Building.COMMON_EDUCATIONAL) {
    center = {
      lat: 26.247959375749655,
      lng: 127.76733423620408,
    };
  } else if (type == Building.FACTORY_OF_ENGINEERING) {
    center = {
      lat: 26.25334632814227,
      lng: 127.76666539719781,
    };
  }
  return center;
}

function SelectMarkers(type: Building): JSX.Element[] {
  const markersJsx: JSX.Element[] = [];
  for (const machine of data.machines) {
    const location = {
      lng: machine.location[0],
      lat: machine.location[1],
    };
    if (type == Building.FACTORY_OF_ENGINEERING && machine.area == "工学部") {
      markersJsx.push(
        <Marker key={location.lat + location.lng} position={location} />
      );
    } else if (
      type == Building.COMMON_EDUCATIONAL &&
      machine.area == "共通教育棟"
    ) {
      markersJsx.push(
        <Marker key={location.lat + location.lng} position={location} />
      );
    }
  }
  return markersJsx;
}

const App = (): JSX.Element => {
  const checkBoxChanged = (isChecked: boolean, type: Building) => {
    if (!isChecked) {
      return;
    }
    setCenterState(SetCenter(type));
    setMarkersJsxState(SelectMarkers(type));
  };

  const markersJsx: JSX.Element[] = [];
  for (const machine of data.machines) {
    const location = {
      lng: machine.location[0],
      lat: machine.location[1],
    };
    /*keyの中身は要相談*/
    markersJsx.push(
      <Marker key={location.lat + location.lng} position={location} />
    );
  }

  const center = {
    lat: 26.25334632814227,
    lng: 127.76666539719781,
  };

  const [centerState, setCenterState] = useState<Location>(center);
  const [markersJsxState, setMarkersJsxState] =
    useState<JSX.Element[]>(markersJsx);

  const checkBoxProps: CheckBoxProps[] = [
    {
      label: "工学部",
      building: Building.FACTORY_OF_ENGINEERING,
      isChecked: false,
      toggleCheckBox: checkBoxChanged,
    },
    {
      label: "共通教育",
      building: Building.COMMON_EDUCATIONAL,
      isChecked: false,
      toggleCheckBox: checkBoxChanged,
    },
  ];

  const checkBoxJsx: JSX.Element[] = checkBoxProps.map(
    (checkBox: CheckBoxProps, idx: number) => {
      return (
        <CheckBox
          label={checkBox.label}
          building={checkBox.building}
          isChecked={checkBox.isChecked}
          toggleCheckBox={checkBox.toggleCheckBox}
          key={idx}
        />
      );
    }
  );

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Map center={centerState} markers={markersJsxState} />
            {checkBoxJsx}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
