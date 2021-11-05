import React from "react";

export enum Building {
  FACTORY_OF_ENGINEERING = 0,
  COMMON_EDUCATIONAL = 1,
  ALL = 2,
}

export enum Card {
  Yes = 3,
  No = 4,
  All = 5,
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
