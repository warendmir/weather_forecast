<?php

namespace App\Services;

use App\Models\API\ForecastData;
use Illuminate\Support\Facades\Http;
use Exception;

class WeatherService
{
    private string $apiUrl;
    private string $apiAppId;

    public function __construct()
    {
        $this->apiUrl = config('app.weather.api_url');
        $this->apiAppId = config('app.weather.api_app_id');
    }

    public function forecast(string $cityName): array
    {
        $url = sprintf("%s?q=%s&units=metric&appid=%s", $this->apiUrl, urlencode($cityName), $this->apiAppId);

        try {
            $response = Http::withoutVerifying()->get($url);
            if (!$response->ok() || $response->json('cod') !== "200") {
                return [
                    'error' => 'Invalid API response format.'
                ];
            }

            try {
                $data = new ForecastData($response->json());
            } catch (Exception $e) {
                return [
                    'error' => $e->getMessage()
                ];
            }

            return $this->getForecastData($data);
        } catch (Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }

    private function getForecastData(ForecastData $data): array
    {
        return [
            'period' => [
                'start' => $data->start,
                'end' => $data->end,
            ],
            'data' => $data->list,
        ];
    }
}
