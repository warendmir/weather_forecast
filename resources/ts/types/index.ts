export interface ForecastItem {
    timestamp_dt: number;
    city_name: string;
    min_tmp: number;
    max_tmp: number;
    wind_spd: number;
    weather_description: string;
    weather_main: string;
    weather_icon: string;
    updated_at?: number;
}


export interface ForecastResponse {
    data: ForecastItem[];
    period?: {
        start: number;
        end: number;
    }
}
