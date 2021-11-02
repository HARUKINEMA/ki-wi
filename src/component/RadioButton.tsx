import React from "react";

export enum Building {
  FACTORY_OF_ENGINEERING,
  COMMON_EDUCATIONAL,
  ALL,
}

export enum Card {
  No,
  Yes,
  All,
}

export interface RadioButtonProps {
  isChecked: boolean;
  label: string;
  onChanged: () => void;
}

export const RadioButton = (props: RadioButtonProps): JSX.Element => {
  return (
    <div>
      <input
        type={"radio"}
        checked={props.isChecked}
        onChange={() => props.onChanged()}
      />
      <label> {props.label} </label>
    </div>
  );
};
