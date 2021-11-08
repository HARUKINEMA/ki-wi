import React, { useState } from "react";
import { Building } from "./component/RadioButton";
import { AreaRadioButton } from "./component/AreaRadioButton";

export interface AreaContainerProps {
  areaRadioButtons: AreaRadioButton[];
  onChangeRadioButton: (area: Building) => void;
}

function MakeAreaRadioButtonJSX(
  areaRadioButtons: AreaRadioButton[],
  onChange: (area: Building) => void
): JSX.Element[] {
  return areaRadioButtons.map((value: AreaRadioButton, idx: number) => {
    return (
      <AreaRadioButton
        areaRadioButton={value}
        onChanged={() => onChange(value.area)}
        key={idx}
      />
    );
  });
}

export const AreaContainer = (props: AreaContainerProps): JSX.Element => {
  const onChange = (area: Building): void => {
    const selectAreabutton = props.areaRadioButtons.map((areaRadioButton) => {
      areaRadioButton.isChecked = area == areaRadioButton.area;
      return areaRadioButton;
    });
    const areaRadioButtonJSX = MakeAreaRadioButtonJSX(
      selectAreabutton,
      onChange
    );
    SetAreaRadioButtonJSXState(areaRadioButtonJSX);
    props.onChangeRadioButton(area);
  };

  const areaRadioButtonJSX = MakeAreaRadioButtonJSX(
    props.areaRadioButtons,
    onChange
  );

  const [areaRadioButtonJSXState, SetAreaRadioButtonJSXState] =
    useState<JSX.Element[]>(areaRadioButtonJSX);

  return <>{areaRadioButtonJSXState}</>;
};
