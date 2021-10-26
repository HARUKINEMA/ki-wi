import React from "react";
import CheckBox, { Building, CheckBoxProps } from "./CheckBox";
import {
  AreaRadioButton,
  AreaRadioButtonProps,
} from "./Component/AreaRadioButton";
import { RadioButton, RadioButtonProps } from "./Component/RadioButton";

export interface RadioButtonContainerProps {
  areaButtonsProps: AreaRadioButtonProps[];
}

export const AreaRadioButtonContainer = (
  props: RadioButtonContainerProps
): JSX.Element => {
  const onChange = (area: Building): void => {
    return;
  };
  const radioButtonPropsJsx: JSX.Element[] = props.areaButtonsProps.map(
    (radioButtonProps: AreaRadioButtonProps, idx: number) => {
      return (
        <AreaRadioButton
          isChecked={radioButtonProps.isChecked}
          label={radioButtonProps.label}
          area={radioButtonProps.area}
          onChanged={() => onChange}
          key={idx}
        />
      );
    }
  );

  return <>{radioButtonPropsJsx}</>;
};
