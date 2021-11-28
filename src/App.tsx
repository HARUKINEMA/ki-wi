import React, { useState } from "react";
import Map, { Location } from "./Map";
import "bootstrap/dist/css/bootstrap.min.css";
import { InfoWindow, Marker } from "@react-google-maps/api";
import * as data from "./drinking_machine.json";
import { Building, AreaContainer, AreaContainerProps } from "./AreaContainer";
import { Col, Container, Row } from "react-bootstrap";
import { Card, CardContainer, CardContainerProps } from "./CardContainer";
import { Usage } from "./Usage";
import { Footer } from "./Footer";
import logo from "./logo.png";
import { SearchForm } from "./ProductContainer";
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

export function AreaSelect(
  area: Building,
  tmpMarkers: number[],
  machines: DrinkMachine[]
): number[] {
  const areaTmp: number[] = [];
  if (area == Building.ALL) {
    tmpMarkers.map((id) => {
      areaTmp.push(id);
    });
  } else if (area == Building.COMMON_EDUCATIONAL) {
    tmpMarkers.map((id) => {
      if (machines[id].area == "共通教育棟") {
        areaTmp.push(id);
      }
    });
  } else if (area == Building.FACTORY_OF_ENGINEERING) {
    tmpMarkers.map((id) => {
      if (machines[id].area == "工学部") {
        areaTmp.push(id);
      }
    });
  }
  return areaTmp;
}

export function CardSelect(
  card: Card,
  tmpMarkers: number[],
  machines: DrinkMachine[]
): number[] {
  const cardTmp: number[] = [];
  if (card == Card.ALL) {
    tmpMarkers.map((id) => {
      cardTmp.push(id);
    });
  } else if (card == Card.YES) {
    tmpMarkers.map((id) => {
      if (machines[id].card == "Yes") {
        cardTmp.push(id);
      }
    });
  } else if (card == Card.NO) {
    tmpMarkers.map((id) => {
      if (machines[id].card == "No") {
        cardTmp.push(id);
      }
    });
  }
  return cardTmp;
}

export function ProductSelect(
  input: string,
  machinesId: number[],
  machines: DrinkMachine[]
): number[] {
  const TargetString = input.replace(/\s{2,}/g, " ");
  if (
    TargetString == "" ||
    TargetString == " " ||
    TargetString == "　" ||
    TargetString == undefined
  ) {
    return machinesId;
  } else {
    const splittingInput1: string[] = [];
    for (let i = 0; i < TargetString.split(" ").length; i++) {
      splittingInput1.push(TargetString.split(" ")[i]);
    }
    const splittingInput2: string[] = [];
    for (let k = 0; k < splittingInput1.length; k++) {
      for (let j = 0; j < splittingInput1[k].split("　").length; j++) {
        splittingInput2.push(splittingInput1[k].split("　")[j]);
      }
    }
    const selectedId: number[] = [];
    machinesId.map((id) => {
      for (let i = 0; i < machines[id].contents.length; i++) {
        for (let j = 0; j < machines[id].contents[i].length; j++) {
          for (let k = 0; k < splittingInput2.length; k++) {
            const re = splittingInput2[k];
            if (machines[id].contents[i].match(re)) {
              if (selectedId.length == 0) {
                selectedId.push(id);
              } else {
                for (let l = 0; l < selectedId.length; l++) {
                  if (selectedId[l] == machines[id].id) {
                    break;
                  } else if (
                    selectedId[l] != machines[id].id &&
                    l == selectedId.length
                  ) {
                    selectedId.push(id);
                  }
                }
              }
            }
          }
        }
      }
    });
    return selectedId;
  }
}

const App = (): JSX.Element => {
  const [popup, setPopup] = useState<JSX.Element>();
  const [zoomSize, SetZoomSize] = useState<number>(17);
  const markersJsx: JSX.Element[] = InitMarkers(MakePopup());
  const center = { lat: 26.25334632814227, lng: 127.76666539719781 };
  const [centerState, setCenterState] = useState<Location>(center);
  const [markersJsxState, setMarkersJsxState] =
    useState<JSX.Element[]>(markersJsx);

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
          SetZoomSize(18);
          SetZoomSize(19);
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
            SetZoomSize(18);
            SetZoomSize(19);
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
            SetZoomSize(17);
          }}
        >
          <div>
            メーカー：{machine.type}
            <br />
            場所：{machine.place}
            <br />
            <img src={machine.image} width="100%" height="100%" />
          </div>
        </InfoWindow>
      );
    });
  }

  /** 1 新しい検索条件を保持する変数の追加*/
  let area: Building;
  area = Building.ALL;
  let card: Card;
  card = Card.ALL;
  let productQuery: string;
  productQuery = "";

  function SelectMarkers(
    type: Building | Card | string /** 2, 1に応じてtypeの型追加 */,
    popupsJSX: JSX.Element[]
  ): JSX.Element[] {
    /** 3, 2に応じて1の変数を変更するif文の追加 */
    if (typeof type == "string") {
      productQuery = type;
    } else if (type <= 2) {
      area = type as Building;
    } else if (2 < type && type <= 5) {
      card = type as Card;
    }
    let tmpMarkers: number[] = data.machines.map((idx) => {
      return idx.id;
    });
    /** 4 作成した〇〇Select(type,tmpMarkers):number[]をtmpMarkersに対して実行*/
    tmpMarkers = AreaSelect(area, tmpMarkers, data.machines as DrinkMachine[]);
    tmpMarkers = CardSelect(card, tmpMarkers, data.machines as DrinkMachine[]);
    tmpMarkers = ProductSelect(
      productQuery,
      tmpMarkers,
      data.machines as DrinkMachine[]
    );
    return tmpMarkers.map((idx) => {
      return MakeMarker(idx, popupsJSX);
    });
  }

  const onChange = (area: Building) => {
    setCenterState(SetCenter(area));
    setMarkersJsxState(SelectMarkers(area, MakePopup()));
  };
  const cardOnChange = (card: Card) => {
    setMarkersJsxState(SelectMarkers(card, MakePopup()));
  };
  const inputOnChange = (query: string) => {
    setMarkersJsxState(SelectMarkers(query, MakePopup()));
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

  const CardCheckBoxProps: CardContainerProps = {
    cardRadioButtons: [
      {
        label: "全ての場所",
        card: Card.ALL,
        isChecked: true,
      },
      {
        label: "使用可能",
        card: Card.YES,
        isChecked: false,
      },
      {
        label: "使用不可",
        card: Card.NO,
        isChecked: false,
      },
    ],
    CardOnChangeRadioButton: cardOnChange,
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={5} />
          <Col md={4}>
            <img src={logo} alt={"non"} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Usage />
          </Col>
          <Col md={12}>
            <a href="https://forms.gle/kETEXwQpzEgjS9cx6">
              フィードバックリンク:このサイトの改善にご協力ください(googleアカウントが必要です)
            </a>
          </Col>
        </Row>
        <p>エリア選択</p>
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
        <br />
        <p>カード使用選択</p>
        <Row>
          <Col md={4}>
            <CardContainer
              cardRadioButtons={CardCheckBoxProps.cardRadioButtons}
              CardOnChangeRadioButton={(card: Card) =>
                CardCheckBoxProps.CardOnChangeRadioButton(card)
              }
            />
          </Col>
        </Row>
        <br />
        <p>商品検索</p>
        <Row>
          <Col md={12}>
            <SearchForm
              onChange={(query: string) => inputOnChange(query)}
            ></SearchForm>
          </Col>
        </Row>
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
          <Col md={12}>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default App;
