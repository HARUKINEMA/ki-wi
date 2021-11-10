import React from "react";
import { Card } from "../CardContainer";
import { RadioButton } from "./RadioButton";

export interface CardRadioButton {
  isChecked: boolean;
  label: string;
  card: Card;
}

export interface CardRadioButtonProps {
  cardRadioButton: CardRadioButton;
  CardonChanged: (card: Card) => void;
}

export const CardRadioButton = (props: CardRadioButtonProps): JSX.Element => {
  return (
    <RadioButton
      isChecked={props.cardRadioButton.isChecked}
      label={props.cardRadioButton.label}
      onChanged={() => {
        props.CardonChanged(props.cardRadioButton.card);
      }}
    />
  );
};
