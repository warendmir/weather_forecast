import { Button, Input } from "@material-tailwind/react";
import React, { useCallback, useState } from "react";
import searchCityForecast from "../../../server/search";
import useForecastData from "../../../hooks/useForecastData";

export default function Inputs() {
    const [city, setCity] = useState("");

    const setData = useForecastData((state) => state.setData);

    const getFromApi = useCallback(
        async (isFromDb?: boolean) => {
            const response = await searchCityForecast(city, isFromDb);
            try {
                setData(response);
            } catch (error) {
                console.error(error);
            }

        },
        [city]
    );
    return (
        <div className="flex flex-row my-2 gap-4">
            <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="Enter city name here (e.g New York)"
            />
            <Button
                className="min-w-[200px] p-05"
                ripple={true}
                onClick={() => getFromApi()}
            >
                Get from API
            </Button>
            <Button
                className="min-w-[200px] p-05"
                ripple={true}
                variant="outlined"
                onClick={() => getFromApi(true)}
            >
                Get from DB
            </Button>
        </div>
    );
}
