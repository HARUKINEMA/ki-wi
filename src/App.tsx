import React from "react";
import Map from "./Map";
import CheckBox, { CheckBoxProps, Building } from "./CheckBox";
import { MapContext } from "@react-google-maps/api";

const App = (): JSX.Element => {
  const checkBoxChanged = (isChecked: boolean, type: Building) => {
    console.log(isChecked);
    console.log("type is " + type.toString());
    console.log(MapContext);
  };

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
      <Map />
      {checkBoxJsx}
    </div>
  );
};

export default App;
