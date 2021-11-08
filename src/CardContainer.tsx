import React, { useState } from "react";
import { CardRadioButton } from "./component/CardRadioButton";

export enum Card {
  Yes = 3,
  No = 4,
  All = 5,
}

export interface CardContainerProps {
  cardRadioButtons: CardRadioButton[];
  CardOnChangeRadioButton: (card: Card) => void;
}

function MakeCardRadioButtonJSX(
  cardRadioButtons: CardRadioButton[],
  CardOnChange: (card: Card) => void
): JSX.Element[] {
  return cardRadioButtons.map((value: CardRadioButton, idx: number) => {
    return (
      <CardRadioButton
        cardRadioButton={value}
        CardonChanged={() => CardOnChange(value.card)}
        key={idx}
      />
    );
  });
}

export const CardContainer = (props: CardContainerProps): JSX.Element => {
  const onChange = (card: Card): void => {
    const selectCardButton = props.cardRadioButtons.map((cardRadioButton) => {
      cardRadioButton.isChecked = card == cardRadioButton.card;
      return cardRadioButton;
    });

    const cardRadioButtonJSX = MakeCardRadioButtonJSX(
      selectCardButton,
      onChange
    );
    SetCardRadioButtonJSXState(cardRadioButtonJSX);
    props.CardOnChangeRadioButton(card);
  };

  const cardRadioButtonJSX = MakeCardRadioButtonJSX(
    props.cardRadioButtons,
    onChange
  );

  const [cardRadioButtonJSXState, SetCardRadioButtonJSXState] =
    useState<JSX.Element[]>(cardRadioButtonJSX);

  return <>{cardRadioButtonJSXState}</>;
};
