import React from "react";
import CheckBox, { CheckBoxProps, Building } from "./CheckBox";
import { MapContext } from "@react-google-maps/api";
/*<select>を使えば地図が1つのまま複数選択できるかも?*/
/*Mapをstateで変化させるにはcheckBox:親,Map:子とする必要があるけどそれだとcheckboxごとにMapを描画することになるためcheckboxのインスタンスは1つにしたい*/
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
    Maplng: 127.76666539719781,
    Maplat: 26.25334632814227,
  }
  
  const checkBoxJsx: JSX.Element = 
    <CheckBox
      label={checkBoxProps.label}
      building={checkBoxProps.building}
      isChecked={checkBoxProps.isChecked}
      toggleCheckBox={checkBoxProps.toggleCheckBox}
      key={0} 
      Maplng={checkBoxProps.Maplng} 
      Maplat={checkBoxProps.Maplat}    
    />

  return (
    <div>
      {checkBoxJsx}
    </div>
  );
};

export default App;
