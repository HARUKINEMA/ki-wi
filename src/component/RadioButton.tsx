import React from "react";

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
        onChange={props.onChanged}
      />
      <label> {props.label} </label>
    </div>
  );
};
