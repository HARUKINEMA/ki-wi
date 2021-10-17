import React, { useState } from "react";
import { MapContext } from "@react-google-maps/api";
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
}
const CheckBox = (props: CheckBoxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);
  const toggleCheckBox = (): void => {
    props.toggleCheckBox(!isChecked, props.building);
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <label> {props.label} </label>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onChange={toggleCheckBox}
      />
      <Map lngprop={127.76666539719781} latprop={26.25334632814227} />
    </div>
  );
};
export default CheckBox;