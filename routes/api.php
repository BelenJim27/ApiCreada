<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\productController;
use App\Http\Controllers\Api\UserController;

Route::get('/products', [productController::class,'index']);


Route::get('/products/{id}', [productController::class,'show']);

Route::post('/products',  [productController::class,'store']);

Route::put('/products/{id}', [productController::class, 'update']);


Route::patch('/products/{id}', [productController::class,'updateParcial']);

Route::delete('/products/{id}', [productController::class,'destroy']);


/*Route::middleware('auth:api')->group(function () {
    Route::apiResource('products', ProductController::class);

});

Route::get('/products', [productController::class,'index']);*/
Route::apiResource('users', UserController::class);
//Route::apiResource('products', ProductController::class);