import React, { useState } from "react";
import Map, { Location } from "./Map";
import { Building } from "./CheckBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { Marker } from "@react-google-maps/api";
import * as data from "./drinking_machine.json";
import { AreaContainer, AreaContainerProps } from "./AreaContainer";
import { Col, Container, Row } from "react-bootstrap";

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
  } else if (type == Building.ALL) {
    center = {
      lat: 26.247959375749655,
      lng: 127.76733423620408,
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
    } else if (type == Building.ALL) {
      markersJsx.push(
        <Marker key={location.lat + location.lng} position={location} />
      );
    }
  }
  return markersJsx;
}

const App = (): JSX.Element => {
  const onChange = (area: Building) => {
    setCenterState(SetCenter(area));
    setMarkersJsxState(SelectMarkers(area));
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

  const checkBoxProps: AreaContainerProps = {
    areaRadioButtons: [
      {
        label: "全ての場所",
        area: Building.ALL,
        isChecked: true,
      },
      {
        label: "工学部周辺",
        area: Building.FACTORY_OF_ENGINEERING,
        isChecked: false,
      },
      {
        label: "共通教育棟周辺",
        area: Building.COMMON_EDUCATIONAL,
        isChecked: false,
      },
    ],
    onChangeRadioButton: onChange,
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Map center={centerState} markers={markersJsxState} />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <AreaContainer
              areaRadioButtons={checkBoxProps.areaRadioButtons}
              onChangeRadioButton={(area: Building) =>
                checkBoxProps.onChangeRadioButton(area)
              }
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
