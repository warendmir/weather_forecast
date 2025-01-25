import { ForecastItem } from "../../types";
import fetchApi from "../fetchApp";

export default async function saveCityForecast(
    data: ForecastItem
): Promise<boolean> {
    if (!data) return false;

    try {
        const response = await fetchApi("POST", "/forecast/save", data);

        return !!response.data?.status;
    } catch (error) {
        return false;
    }
}
