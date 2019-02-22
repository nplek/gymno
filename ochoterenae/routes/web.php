<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('welcome', function () {
    return view('welcome');
})->name('welcome');

Route:: get('/', function() {
    //return redirect('/login');
    return redirect('/app/#');
})->name('index');

//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Route::group(['middleware' => ['role:super|admin|user']], function () {
  
    /***************** */
    
//});
