import React from "react";
import { Building } from "../CheckBox";
import { RadioButton } from "./RadioButton";

export interface AreaRadioButton {
  isChecked: boolean;
  label: string;
  area: Building;
}

export interface AreaRadioButtonProps {
  areaRadioButton: AreaRadioButton;
  onChanged: (area: Building) => void;
}

export const AreaRadioButton = (props: AreaRadioButtonProps): JSX.Element => {
  return (
    <RadioButton
      isChecked={props.areaRadioButton.isChecked}
      label={props.areaRadioButton.label}
      onChanged={() => {
        props.onChanged(props.areaRadioButton.area);
      }}
    />
  );
};
