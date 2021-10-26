import React from "react";
import CheckBox, { Building, CheckBoxProps } from "./CheckBox";
import { RadioButton, RadioButtonProps } from "./Component/RadioButton";

export interface RadioButtonContainerProps {
  areaButtonsProps: AreaRadioButton[];
}

export interface AreaRadioButton {
  isChecked: boolean;
  label: string;
  onChanged: () => void;
  area: Building;
}

export const RadioButtonContainer = (
  props: RadioButtonContainerProps
): JSX.Element => {
  const onChange = (): void => {};
  const radioButtonPropsJsx: JSX.Element[] = props.areaButtonsProps.map(
    (radioButtonProps: RadioButtonProps, idx: number) => {
      return (
        <RadioButton
          label={radioButtonProps.label}
          isChecked={radioButtonProps.isChecked}
          onChanged={onChange}
          key={idx}
        />
      );
    }
  );
};
