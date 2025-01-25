<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForecastController;

Route::post('/forecast/search', [ForecastController::class, 'search'])
    ->name('forecast.search');

Route::post('/forecast/save', [ForecastController::class, 'save'])
    ->name('forecast.save');


Route::get('/', function () {
    return view('welcome');
});
