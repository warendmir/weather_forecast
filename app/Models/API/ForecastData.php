<?php
namespace App\Models\API;

class ForecastData
{
    public string $city_name;
    /** @var ForecastItem[] */
    public array $list = [];

    public $start;
    public $end;

    public function __construct(array $data)
    {
        if (!isset($data['city']['name']) || !isset($data['list'])) {
            throw new \Exception("Invalid API response format.");
        }
        $this->city_name = $data['city']['name'];
        $this->start = $data['list'][0]['dt'];
        $this->end = $data['list'][count($data['list']) - 1]['dt'];
        $this->list = array_map(fn($item) => (new ForecastItem($item, $data['city']['name']))->toArray(), $data['list']);
    }
}
