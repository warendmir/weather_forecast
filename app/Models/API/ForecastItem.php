<?php
namespace App\Models\API;

use Illuminate\Support\Str;

class ForecastItem
{
    public int $timestamp_dt;
    public float $min_tmp;
    public float $max_tmp;
    public float $wind_spd;
    public string $weather_description;
    public string $weather_icon;
    public string $weather_main;
    public string $city_name;

    public bool $withoutIconUrl = false;

    public function __construct(array $data, string $cityName, bool $withoutIconUrl = false)
    {
        if (!empty($data)) {
            if (isset($data['timestamp_dt'])) {
                foreach ($this->getExpectedKeys() as $key) {
                    if (isset($data[$key])) {
                        $this->{$key} = $data[$key];
                    }
                }

            } else {
                $this->timestamp_dt = $data['dt'];
                $this->min_tmp = $data['main']['temp_min'];
                $this->max_tmp = $data['main']['temp_max'];
                $this->wind_spd = $data['wind']['speed'];
                $this->weather_description = $data['weather'][0]['description'];
                $this->weather_icon = $data['weather'][0]['icon'];
                $this->weather_main = $data['weather'][0]['main'];
            }
        }

        $this->city_name = $cityName;
        $this->withoutIconUrl = $withoutIconUrl;
    }

    public function toArray(): array
    {
        return [
            'timestamp_dt' => $this->timestamp_dt,
            'city_name' => $this->city_name,
            'min_tmp' => $this->min_tmp,
            'max_tmp' => $this->max_tmp,
            'wind_spd' => $this->wind_spd,
            'weather_main' => $this->weather_main,
            'weather_description' => $this->weather_description,
            'weather_icon' => $this->getIconUrl(),
        ];
    }

    private function getExpectedKeys(): array
    {
        return [
            'timestamp_dt',
            'min_tmp',
            'max_tmp',
            'wind_spd',
            'weather_description',
            'weather_icon',
            'weather_main',
        ];
    }

    /**
     * Convert icon name to icon url when take value
     * @return string
     */
    private function getIconUrl()
    {
        if ($this->withoutIconUrl) {
            return $this->weather_icon;
        }

        $domain = config('app.weather.icon_domain');
        return sprintf("$domain%s@2x.png", $this->weather_icon);
    }
}
