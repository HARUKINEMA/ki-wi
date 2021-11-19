import React from "react";

export interface RadioButtonProps {
  isChecked: boolean;
  label: string;
  onChanged: () => void;
}

export const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const inputStyle = {
    marginRight: "4px",
    width: "17px",
    height: "17px",
  };

  const labelStyle = {
    marginTop: "2px",
  };

  return (
    <div>
      <input
        type={"radio"}
        checked={props.isChecked}
        onChange={() => props.onChanged()}
        style={inputStyle}
      />

      <label style={labelStyle}> {props.label} </label>
    </div>
  );
};
