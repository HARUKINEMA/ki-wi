import React, { useState } from "react";
import Map, { Location } from "./Map";
import { Building, Card } from "./component/RadioButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { InfoWindow, Marker } from "@react-google-maps/api";
import * as data from "./drinking_machine.json";
import { AreaContainer, AreaContainerProps } from "./AreaContainer";
import { Col, Container, Row } from "react-bootstrap";
import { CardContainer, CardContainerProps } from "./CardContainer";
function SetCenter(type: Building): Location {
  let center: Location = {lat: 0,lng: 0,};
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
  function InitMarkers(popupsJSX: JSX.Element[]){
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

/* 表示されるマーカー(markerjsxstate)と実際に存在するマーカー別の配列にしてinitで表示されるマーカー=実際に存在するマーカーに,selectで都合よく改竄する*/

  function Select(type: string, markersJsxState: JSX.Element[]): JSX.Element[] {
    return markersJsx.map(
      (idx) => {
        return(
          <></>
        );
      }
    );
  }








  function SelectMarkers(type: Building, popupsJSX: JSX.Element[]): JSX.Element[] {
    return data.machines.map((machine, idx) => {
      const location = {
        lng: machine.location[0],
        lat: machine.location[1],
      };

      if (type == Building.FACTORY_OF_ENGINEERING && machine.area == "工学部") {
        return (
          <Marker
            key={location.lat + location.lng}
            position={location}
            onClick={() => {
              setPopup(popupsJSX[idx]);
              nSetSize(18);
              nSetSize(19);
            }}
          />
        );
      } else if (
        type == Building.COMMON_EDUCATIONAL &&
        machine.area == "共通教育棟"
      ) {
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
      } else if (type == Building.ALL) {
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
      } else {
        return <></>;
      }
    });
  }

  function CardSelectMarkers(
    type: Card,
    popupsJSX: JSX.Element[]
  ): JSX.Element[] {
    return data.machines.map((machine, idx) => {
      const location = {
        lng: machine.location[0],
        lat: machine.location[1],
      };

      if (type == Card.No && machine.card == "No") {
        return (
          <Marker
            key={location.lat + location.lng}
            position={location}
            onClick={() => {
              setPopup(popupsJSX[idx]);
              nSetSize(18);
              nSetSize(19);
            }}
          />
        );
      } else if (
        type == Card.Yes &&
        machine.card == "Yes"
      ) {
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
      } else if (type == Card.All) {
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
      } else {
        return <></>;
      }
    });
  }

  const onChange = (area: Building) => {
    setCenterState(SetCenter(area));
    setMarkersJsxState(SelectMarkers(area, MakePopup()));
  };

  const CardonChange = (card: Card) => {
    setMarkersJsxState(CardSelectMarkers(card, MakePopup()));
  };

  const [popup, setPopup] = useState<JSX.Element>();
  const [nSize, nSetSize] = useState<number>(17);











  const markersJsx: JSX.Element[] = InitMarkers(MakePopup());











  const center = {
    lat: 26.25334632814227,
    lng: 127.76666539719781,
  };

  const [centerState, setCenterState] = useState<Location>(center);
  const [markersJsxState, setMarkersJsxState] = useState<JSX.Element[]>(markersJsx);

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
        label: "ダメ",
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
              nSize={nSize}
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