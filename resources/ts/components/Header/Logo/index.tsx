import React from "react";
import logo from "../../../../images/logo.png";

export default function Logo() {
    return (
        <img
            className="h-96 max-w-[400px] object-cover object-center"
            src={logo}
            alt="logo"
        />
    );
}
