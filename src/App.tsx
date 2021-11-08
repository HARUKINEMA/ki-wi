import React, { useState } from "react";
import Map, { Location } from "./Map";
import "bootstrap/dist/css/bootstrap.min.css";
import { InfoWindow, Marker } from "@react-google-maps/api";
import * as data from "./drinking_machine.json";
import { Building, AreaContainer, AreaContainerProps } from "./AreaContainer";
import { Col, Container, Row } from "react-bootstrap";
import { Card, CardContainer, CardContainerProps } from "./CardContainer";
function SetCenter(type: Building): Location {
  let center: Location = { lat: 0, lng: 0 };
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

const App = (): JSX.Element => {
  const [popup, setPopup] = useState<JSX.Element>();
  const [zoomSize, nSetSize] = useState<number>(17);
  const markersJsx: JSX.Element[] = InitMarkers(MakePopup());
  const center = { lat: 26.25334632814227, lng: 127.76666539719781 };
  const [centerState, setCenterState] = useState<Location>(center);
  const [markersJsxState, setMarkersJsxState] =
    useState<JSX.Element[]>(markersJsx);
  let area: Building | Card;
  area = Building.ALL;
  let card: Building | Card;
  card = Card.All;

  function MakeMarker(idx: number, popupsJSX: JSX.Element[]) {
    const locationMarker = {
      lng: data.machines[idx].location[0],
      lat: data.machines[idx].location[1],
    };
    return (
      <Marker
        key={idx}
        position={locationMarker}
        onClick={() => {
          setPopup(popupsJSX[idx]);
          nSetSize(18);
          nSetSize(19);
        }}
      />
    );
  }
  function InitMarkers(popupsJSX: JSX.Element[]) {
    return data.machines.map((machine, idx) => {
      const location = {
        lng: machine.location[0],
        lat: machine.location[1],
      };
      return (
        <Marker
          key={idx}
          position={location}
          onClick={() => {
            setPopup(popupsJSX[idx]);
            nSetSize(18);
            nSetSize(19);
          }}
        />
      );
    });
  }
  function MakePopup(): JSX.Element[] {
    return data.machines.map((machine, idx) => {
      const locationPopup = {
        lng: machine.location[0],
        lat: machine.location[1] + 0.00008,
      };
      return (
        <InfoWindow
          key={idx}
          position={locationPopup}
          onCloseClick={() => {
            setPopup(<div />);
            nSetSize(17);
          }}
        >
          <div>
            メーカー：{machine.type}
            <br />
            場所：{machine.place}
          </div>
        </InfoWindow>
      );
    });
  }

  function SelectMarkers(
    type: Building | Card,
    popupsJSX: JSX.Element[]
  ): JSX.Element[] {
    let markers: JSX.Element[] = [];

    if (type <= 2) {
      area = type;
      markers = data.machines.map((machine, idx) => {
        if (area == Building.ALL) {
          if (card == Card.All) {
            return MakeMarker(idx, popupsJSX);
          } else if (card == Card.No && machine.card == "No") {
            return MakeMarker(idx, popupsJSX);
          } else if (card == Card.Yes && machine.card == "Yes") {
            return MakeMarker(idx, popupsJSX);
          } else {
            return <></>;
          }
        } else if (
          area == Building.FACTORY_OF_ENGINEERING &&
          machine.area == "工学部"
        ) {
          if (card == Card.All) {
            return MakeMarker(idx, popupsJSX);
          } else if (card == Card.No && machine.card == "No") {
            return MakeMarker(idx, popupsJSX);
          } else if (card == Card.Yes && machine.card == "Yes") {
            return MakeMarker(idx, popupsJSX);
          } else {
            return <></>;
          }
        } else if (
          area == Building.COMMON_EDUCATIONAL &&
          machine.area == "共通教育棟"
        ) {
          if (card == Card.All) {
            return MakeMarker(idx, popupsJSX);
          } else if (card == Card.No && machine.card == "No") {
            return MakeMarker(idx, popupsJSX);
          } else if (card == Card.Yes && machine.card == "Yes") {
            return MakeMarker(idx, popupsJSX);
          } else {
            return <></>;
          }
        } else {
          return <></>;
        }
      });
    } else if (type >= 3) {
      card = type;
      markers = data.machines.map((machine, idx) => {
        if (card == Card.All) {
          if (area == Building.ALL) {
            return MakeMarker(idx, popupsJSX);
          } else if (
            area == Building.COMMON_EDUCATIONAL &&
            machine.area == "共通教育棟"
          ) {
            return MakeMarker(idx, popupsJSX);
          } else if (
            area == Building.FACTORY_OF_ENGINEERING &&
            machine.area == "工学部"
          ) {
            return MakeMarker(idx, popupsJSX);
          } else {
            return <></>;
          }
        } else if (card == Card.No && machine.card == "No") {
          if (area == Building.ALL) {
            return MakeMarker(idx, popupsJSX);
          } else if (
            area == Building.COMMON_EDUCATIONAL &&
            machine.area == "共通教育棟"
          ) {
            return MakeMarker(idx, popupsJSX);
          } else if (
            area == Building.FACTORY_OF_ENGINEERING &&
            machine.area == "工学部"
          ) {
            return MakeMarker(idx, popupsJSX);
          } else {
            return <></>;
          }
        } else if (card == Card.Yes && machine.card == "Yes") {
          if (area == Building.ALL) {
            return MakeMarker(idx, popupsJSX);
          } else if (
            area == Building.COMMON_EDUCATIONAL &&
            machine.area == "共通教育棟"
          ) {
            return MakeMarker(idx, popupsJSX);
          } else if (
            area == Building.FACTORY_OF_ENGINEERING &&
            machine.area == "工学部"
          ) {
            return MakeMarker(idx, popupsJSX);
          } else {
            return <></>;
          }
        } else {
          return <></>;
        }
      });
    }
    return markers;
  }

  const onChange = (area: Building) => {
    setCenterState(SetCenter(area));
    setMarkersJsxState(SelectMarkers(area, MakePopup()));
  };
  const CardonChange = (card: Card) => {
    setMarkersJsxState(SelectMarkers(card, MakePopup()));
  };
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

  const CardcheckBoxProps: CardContainerProps = {
    cardRadioButtons: [
      {
        label: "全ての場所",
        card: Card.All,
        isChecked: true,
      },
      {
        label: "使用可能",
        card: Card.Yes,
        isChecked: false,
      },
      {
        label: "使用不可",
        card: Card.No,
        isChecked: false,
      },
    ],
    CardonChangeRadioButton: CardonChange,
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Map
              center={centerState}
              markers={markersJsxState}
              popup={popup}
              nSize={zoomSize}
            />
          </Col>
        </Row>
        <Row>
          <p>エリア選択</p>
          <Col md={4}>
            <AreaContainer
              areaRadioButtons={checkBoxProps.areaRadioButtons}
              onChangeRadioButton={(area: Building) =>
                checkBoxProps.onChangeRadioButton(area)
              }
            />
          </Col>
        </Row>
        <Row>
          <p>カード使用選択</p>
          <Col md={4}>
            <CardContainer
              cardRadioButtons={CardcheckBoxProps.cardRadioButtons}
              CardonChangeRadioButton={(card: Card) =>
                CardcheckBoxProps.CardonChangeRadioButton(card)
              }
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default App;
