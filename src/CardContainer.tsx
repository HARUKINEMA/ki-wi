import React, { useState } from "react";
import { Card } from "./CheckBox";
import { CardRadioButton } from "./component/CardRadioButton";

export interface CardContainerProps {
  cardRadioButtons: CardRadioButton[];
  CardonChangeRadioButton: (card: Card) => void;
}

function MakeCardRadioButtonJSX(
  cardRadioButtons: CardRadioButton[],
  CardonChange: (card: Card) => void
): JSX.Element[] {
  return cardRadioButtons.map((value: CardRadioButton, idx: number) => {
    return (
      <CardRadioButton
        cardRadioButton={value}
        CardonChanged={() => CardonChange(value.card)}
        key={idx}
      />
    );
  });
}

export const CardContainer = (props: CardContainerProps): JSX.Element => {
  const onChange = (card: Card): void => {
    const selectCardbutton = props.cardRadioButtons.map((cardRadioButton) => {
      cardRadioButton.isChecked = card == cardRadioButton.card;
      return cardRadioButton;
    });

    const cardRadioButtonJSX = MakeCardRadioButtonJSX(selectCardbutton, onChange);
    SetCardRadioButtonJSXState(cardRadioButtonJSX);
    props.CardonChangeRadioButton(card);
  };

  const cardRadioButtonJSX = MakeCardRadioButtonJSX(
    props.cardRadioButtons,
    onChange
  );

  const [cardRadioButtonJSXState, SetCardRadioButtonJSXState] =
    useState<JSX.Element[]>(cardRadioButtonJSX);

  return <>{cardRadioButtonJSXState}</>;
};
