import React, { useState } from "react";

export enum CheckBoxType {
  FACTORY_OF_ENGINEERING_BUILDING,
  COMMON_EDUCATIONAL_BUILDING,
}

export interface CheckBoxProps {
  label: string;
  type: CheckBoxType;
  isChecked: boolean;
  handleLocationChange: (isCheck: boolean, type: CheckBoxType) => void;
}

const CheckBox = (props: CheckBoxProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);

  const toggleCheckBox = (): void => {
    // https://ja.reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    props.handleLocationChange(!isChecked, props.type);
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
