import React, { useState } from "react";

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

export interface CheckBoxProps {
  label: string;
  building: Building;
  isChecked: boolean;
  toggleCheckBox: (isCheck: boolean, type: Building) => void;
}

const CheckBox = (props: CheckBoxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);

  const toggleCheckBox = (): void => {
    // https://ja.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    props.toggleCheckBox(!isChecked, props.building);
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label> {props.label} </label>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onChange={toggleCheckBox}
      />
    </div>
  );
};

export default CheckBox;
