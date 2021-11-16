import React, { useState } from "react";

interface IState {
    srh: string;
    onChange: (value: string) => void;
}


export const SearchForm = (props: IState) => {
    return (
        <input
            type="text"
            value={props.srh}
            onChange={event => props.onChange(event.target.value)} />
    );
}


