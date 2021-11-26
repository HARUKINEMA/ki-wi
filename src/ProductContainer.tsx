import React, { useState } from "react";

export interface SearchFormProps{
  onChange: (query: string) => void;
}

export const SearchForm = (props: SearchFormProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  return (
    <input
      type="text"
      value={query}
      onChange={(event) => {
        console.log(event.target.value);
        setQuery(event.target.value);
        props.onChange(event.target.value);
      }}
    />
  );
};
