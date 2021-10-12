import React from "react";
import Map from "./Map";
import CheckBox, { CheckBoxProps, CheckBoxType } from "./CheckBox";

const App = (): JSX.Element => {
  const checkBoxChanged = (isChecked: boolean, type: CheckBoxType) => {
    console.log(isChecked);
    console.log("type is " + type.toString());
  };

  const checkBoxProps: CheckBoxProps[] = [
    {
      label: "工学部",
      type: CheckBoxType.FACTORY_OF_ENGINEERING_BUILDING,
      isChecked: false,
      handleLocationChange: checkBoxChanged,
    },
    {
      label: "共通教育",
      type: CheckBoxType.COMMON_EDUCATIONAL_BUILDING,
      isChecked: false,
      handleLocationChange: checkBoxChanged,
    },
  ];

  const checkBoxJsx: JSX.Element[] = checkBoxProps.map((checkBox, idx) => {
    return (
      <CheckBox
        label={checkBox.label}
        type={checkBox.type}
        isChecked={checkBox.isChecked}
        handleLocationChange={checkBox.handleLocationChange}
        key={idx}
      />
    );
  });

  return (
    <div>
      <Map />
      {checkBoxJsx}
    </div>
  );
};

export default App;
