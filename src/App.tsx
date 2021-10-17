import React from "react";
import Map, {MapProps} from "./Map";
import CheckBox, { CheckBoxProps, Building } from "./CheckBox";
import { MapContext } from "@react-google-maps/api";
const App = (): JSX.Element => {
  const checkBoxChanged = (isChecked: boolean, type: Building) => {
    console.log(isChecked);
    console.log("type is " + type.toString());
    console.log(MapContext);
  };
  const checkBoxProps: CheckBoxProps = 
    {
      label: "工学部",
      building: Building.FACTORY_OF_ENGINEERING,
      isChecked: false,
      toggleCheckBox: checkBoxChanged,
    }
  const checkBoxJsx: JSX.Element = 
        <CheckBox
          label={checkBoxProps.label}
          building={checkBoxProps.building}
          isChecked={checkBoxProps.isChecked}
          toggleCheckBox={checkBoxProps.toggleCheckBox}
          key={0}
        />
  return (
    <div>
      {checkBoxJsx}
    </div>
  );
};
export default App;