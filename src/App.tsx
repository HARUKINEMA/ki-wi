import React from "react";
import Map from "./Map";
import CheckBox from "./CheckBox";

const App = (): JSX.Element => {
  const handleLocationChange = (value: number) => {
    console.log(value);
  };

  return (
    <div>
      <Map />
      <CheckBox
        label="this is label"
        handleLocationChange={handleLocationChange}
      />
    </div>
  );
};

export default App;
