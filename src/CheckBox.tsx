import React from "react";

interface CheckBoxProps {
  label: string;
  handleLocationChange: (values: number) => void;
}

const CheckBox = (props: CheckBoxProps): JSX.Element => {
  const toggleCheckBox = () => {
    props.handleLocationChange(1);
  };

  return (
    <div>
      <label> {props.label} </label>
      <input type="checkbox" name="hoge" onChange={toggleCheckBox}></input>
    </div>
  );
};

export default CheckBox;
