import React, { useState } from "react";

export const SearchForm = (): JSX.Element => {
  const [query, setQuery] = useState<string>();
  return (
    <input
      type="text"
      value={query}
      onChange={(event) => {
        console.log(event.target.value);
        setQuery(event.target.value);
      }}
    />
  );
};
