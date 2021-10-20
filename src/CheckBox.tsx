import React, { useState } from "react";
import Map, {MapProps} from "./Map";
export enum Building {
  FACTORY_OF_ENGINEERING,
  COMMON_EDUCATIONAL,
}

export interface CheckBoxProps {
  label: string;
  building: Building;
  isChecked: boolean;
  toggleCheckBox: (isCheck: boolean, type: Building) => void;
  Maplng:number;
  Maplat:number;
}

const CheckBox = (props: CheckBoxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);

  const setCenter = () =>{
    alert("cuienvcuso");
  }

  const toggleCheckBox = (): void => {
    // https://ja.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    props.toggleCheckBox(!isChecked, props.building);
    setIsChecked(!isChecked);
    setCenter;
  };

  return (
    <div>
      <label> {props.label} </label>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onChange={toggleCheckBox}
      />
      <Map lngprop={props.Maplng} latprop={props.Maplat} setCenter={setCenter}/>
    </div>
  );
};

export default CheckBox;
