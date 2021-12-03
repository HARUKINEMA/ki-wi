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
  const uId = getUniqueStr();
  return (
    <div>
      <input
        id={(props.label + uId) as string}
        type={"radio"}
        checked={props.isChecked}
        onChange={() => props.onChanged()}
      />
      <label htmlFor={(props.label  + uId) as string}> {props.label} </label>
    </div>
  );
};
