import React from "react";
import { Building } from "../CheckBox";
import { RadioButton } from "./RadioButton";

export interface AreaRadioButtonProps {
  isChecked: boolean;
  label: string;
  area: Building;
  onChanged: (area: Building) => void;
}

export const AreaRadioButton = (props: AreaRadioButtonProps): JSX.Element => {
  return (
    <RadioButton
      isChecked={props.isChecked}
      label={props.label}
      onChanged={() => props.onChanged(props.area)}
    />
  );
};
