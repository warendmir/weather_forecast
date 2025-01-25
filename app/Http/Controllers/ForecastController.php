<?php

namespace App\Http\Controllers;

use App\Models\Forecast;
use App\Models\API\ForecastItem;
use Illuminate\Http\Request;

class ForecastController extends Controller
{
    /**
     * Search forecast by city name.
     *
     * @param Request $request
     * @return array
     */
    public function search(Request $request): array
    {
        $cityName = $request->input('cityName', '');
        $isGetFromDb = $request->input('isGetFromDb', false);

        if (empty($cityName) || strlen($cityName) < 3) {
            return [];
        }

        try {
            return Forecast::getForecastData($cityName, $isGetFromDb);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Save forecast to db.
     *
     * @param Request $request
     * @return array
     */
    public function save(Request $request): array
    {
        $data = $request->only([
            'timestamp_dt',
            'city_name',
            'min_tmp',
            'max_tmp',
            'wind_spd',
            'weather_description',
            'weather_main',
            'weather_icon',
        ]);

        if (empty($data['city_name']) || empty($data['timestamp_dt'])) {
            return ['saved' => false];
        }

        try {
            $forecastItem = new ForecastItem(
                $data,
                $data['city_name'],
                true
            );

            Forecast::createByCity($data['city_name'], $forecastItem->toArray());
            return ['saved' => true];
        } catch (\Exception $e) {
            return ['saved' => false];
        }
    }
}
