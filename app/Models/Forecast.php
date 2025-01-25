<?php

namespace App\Models;

use App\Models\API\ForecastItem;
use App\Services\WeatherService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Class Forecast
 * @package App\Models
 *
 * @property int $id
 * @property int $timestamp_dt
 * @property string $city_name
 * @property float $min_tmp
 * @property float $max_tmp
 * @property float $wind_spd
 * @property string $weather_description
 * @property string $weather_icon
 * @property string $weather_main
 * @property string  $updated_at
 */
class Forecast extends Model
{
    protected $fillable = [
        'timestamp_dt',
        'city_name',
        'min_tmp',
        'max_tmp',
        'wind_spd',
        'weather_description',
        'weather_icon',
        'weather_main',
    ];

    /**
     * Create or update forecast data by city name
     * @param string $cityName
     * @param array $weatherData
     * @return static
     */
    public static function createByCity(string $cityName, array $weatherData): self
    {
        return self::updateOrCreate(
            ['city_name' => $cityName],
            $weatherData
        );
    }

    /**
     * Get ForecastData
     *
     * @param string $cityName
     * @param bool $isGetFromDb
     * @return array
     */
    public static function getForecastData(string $cityName, bool $isGetFromDb = false): array
    {
        if ($isGetFromDb) {
            $model = self::where('city_name', $cityName)->first();
            return [
                'data' => $model ? [$model->toArray()] : []
            ];
        }

        return (new WeatherService())->forecast($cityName);
    }

    public function toArray()
    {
        return [
            'timestamp_dt' => $this->timestamp_dt,
            'city_name' => $this->city_name,
            'min_tmp' => $this->min_tmp,
            'max_tmp' => $this->max_tmp,
            'wind_spd' => $this->wind_spd,
            'weather_description' => Str::ucfirst($this->weather_description),
            'weather_icon' => $this->weather_icon,
            'weather_main' => $this->weather_main,
            'updated_at' => $this->updated_at,
        ];
    }
}
