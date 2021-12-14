import React from "react";

export interface RadioButtonProps {
  isChecked: boolean;
  label: string;
  onChanged: () => void;
}

function getUniqueStr(myStrong?: number): string {
  let strong = 1000;
  if (myStrong) strong = myStrong;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
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

  const uId = getUniqueStr();
  return (
    <div>
      <input
        id={(props.label + uId) as string}
        type={"radio"}
        checked={props.isChecked}
        onChange={() => props.onChanged()}
        style={inputStyle}
      />
      <label style={labelStyle} htmlFor={(props.label + uId) as string}>
        {props.label}
      </label>
    </div>
  );
};
