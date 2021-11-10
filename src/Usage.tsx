import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

export const Usage = (): JSX.Element => {
  const [usage, setUsage] = useState<string>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const DETAIL =
    "琉球大学に設置されている自動販売機の位置を確認することができるサイトです";
  const onChange = (): void => {
    if (isClicked) {
      setIsClicked(false);
      setUsage("");
    } else {
      setIsClicked(true);
      setUsage(DETAIL);
    }
  };

  return (
    <div>
      <p>
        <Button
          className={"btn btn-primary"}
          type={"button"}
          onClick={() => onChange()}
        >
          サイトの説明
        </Button>
      </p>
      <Card>{usage}</Card>
    </div>
  );
};
