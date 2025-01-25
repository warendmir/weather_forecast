import React from "react";
import Inputs from "./Inputs";
import City from "./City";
import Logo from "./Logo";
import useForecastData from "../../hooks/useForecastData";

export default function Header() {
    const isData = useForecastData((state) => !!state.data.length);
    return (
        <>
            <Logo />
            <Inputs />
            {isData && <City />}
        </>
    );
}
