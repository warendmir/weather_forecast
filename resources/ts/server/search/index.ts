import { ForecastResponse } from "../../types";
import fetchApi from "../fetchApp";

export default async function searchCityForecast(
    cityName: string,
    isGetFromDb: boolean = false
): Promise<ForecastResponse> {
    try {
        const response = await fetchApi("POST", "/forecast/search", {
            cityName,
            isGetFromDb,
        });
        if (
            response.status !== 200 ||
            !response.data?.data ||
            !Array.isArray(response.data?.data)
        ) {
            return { data: [] };
        }

        return {
            ...response.data,
            isGetFromDb: isGetFromDb,
        };
    } catch (error) {
        return { data: [] };
    }
}
