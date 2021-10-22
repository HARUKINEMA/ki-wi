import React, { useState } from "react";
import Map, { MapProps, Location } from "./Map";
import CheckBox, { CheckBoxProps, Building } from "./CheckBox";

const App = (): JSX.Element => {
  const checkBoxChanged = (isChecked: boolean, type: Building) => {
    if (!isChecked) {
      return;
    }
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
    setCenterState(center);
  };

  const MapCenter: MapProps = {
    center: {
      lat: 26.25334632814227,
      lng: 127.76666539719781,
    },
  };

  const [centerState, setCenterState] = useState<Location>(MapCenter.center);

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
      <Map center={centerState} />
      {checkBoxJsx}
    </div>
  );
};

export default App;
