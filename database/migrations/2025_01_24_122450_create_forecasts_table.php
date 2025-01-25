<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForecastsTable extends Migration
{
    public function up()
    {
        Schema::create('forecasts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('timestamp_dt');
            $table->string('city_name');
            $table->float('min_tmp');
            $table->float('max_tmp');
            $table->float('wind_spd');
            $table->string('weather_description');
            $table->string('weather_icon');
            $table->string('weather_main');
            $table->timestamps();

            $table->unique(['city_name'], 'unique_city_name');
        });
    }

    public function down()
    {
        Schema::dropIfExists('forecasts');
    }
}
