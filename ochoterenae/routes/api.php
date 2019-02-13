<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Route::group(['middleware' => 'auth:api'], function(){
    Route::namespace('Api')->group(function(){
        Route::name('api.')->group(function(){
            ///api/auth/login
            Route::post('auth/login','LoginController@login')->name('auth.login');
            Route::post('auth/sign-out','LoginController@signout')->name('auth.signout');
            Route::post('auth/reset-pass','LoginController@resetpass')->name('auth.resetpass');

            Route::post('companies/{id}/restore','CompanyController@restore')->name('companies.restore');
            Route::get('companies/list','CompanyController@list')->name('companies.list');
            Route::resource('companies', 'CompanyController',['except' => ['create','edit']]);

            Route::post('departments/{id}/restore','DepartmentController@restore')->name('departments.restore');
            Route::get('departments/list','DepartmentController@list')->name('departments.list');
            Route::get('departments/active','DepartmentController@list')->name('departments.active');
            Route::resource('departments', 'DepartmentController',['except' => ['create','edit']]);

            Route::post('locations/{id}/restore','LocationController@restore')->name('locations.restore');
            Route::get('locations/list','LocationController@list')->name('locations.list');
            Route::resource('locations', 'LocationController',['except' => ['create','edit']]);
            
            Route::post('users/{id}/restore','UserController@restore')->name('users.restore');
            Route::post('users/list','UserController@list')->name('users.list');
            Route::put('users/{id}/reset', 'UserController@reset_update')->name('users.reset');
            Route::put('users/{id}/active', 'UserController@active_user')->name('users.active');
            Route::put('users/{id}/inactive', 'UserController@inactive_user')->name('users.inactive');
            Route::get('users/roles/{id}','UserController@listUserRole')->name('users.roles.list');
            Route::get('users/roles/{uid}/{rid}','UserController@showUserRole')->name('users.roles.show');
            Route::post('users/roles/{uid}','UserController@storeUserRole')->name('users.roles.create');
            Route::delete('users/roles/{uid}/{rid}/{tid}','UserController@destroyUserRole')->name('users.roles.delete');
            Route::post('users/passport/{uid}','UserController@reset_passport')->name('users.passport.reset');
            Route::resource('users', 'UserController',['except' => ['create','edit']]);

            Route::post('employees/manager/list','EmployeeController@listManager')->name('employees.manager.list');
            Route::post('employees/staff/list','EmployeeController@listStaff')->name('employees.staff.list');
            Route::get('employees/list','EmployeeController@list')->name('employees.list');
            Route::get('employees/active','EmployeeController@list')->name('employees.active');
            Route::resource('employees', 'EmployeeController',['except' => ['create','edit']]);

            Route::get('roles/list','RoleController@list')->name('roles.list');
            Route::resource('roles', 'RoleController',['except' => ['create','edit']]);
            
            Route::get('permissions/list','PermissionController@list')->name('permissions.list');
            Route::resource('permissions', 'PermissionController',['except' => ['create','edit']]);
            
            Route::post('teams/list','TeamController@list')->name('teams.list');
            Route::resource('teams', 'TeamController',['except' => ['create','edit']]);

            Route::resource('units', 'UnitController',['except' => ['create','edit']]);
            
            Route::get('logs/activitylogs', 'LogController@activityLogsIndex')->name('logs.activity.index');
            Route::get('logs/accesslogs', 'LogController@accessLogsIndex')->name('logs.access.index');
            Route::get('logs/securitylogs', 'LogController@securityLogsIndex')->name('logs.security.index');
            Route::delete('logs/{id}', 'LogController@destroyLog')->name('logs.delete');

            Route::post('positions/{id}/restore','PositionController@restore')->name('positions.restore');
            Route::get('positions/list','PositionController@list')->name('positions.list');
            Route::resource('positions', 'PositionController',['except' => ['create','edit']]);

            Route::post('items/{id}/restore','ItemController@restore')->name('items.restore');
            Route::post('items/list','ItemController@list')->name('items.list');
            Route::resource('items', 'ItemController',['except' => ['create','edit']]);

            Route::post('whs/{id}/restore','WarehouseController@restore')->name('whs.restore');
            Route::post('whs/list','WarehouseController@list')->name('whs.list');
            Route::resource('whs', 'WarehouseController',['except' => ['create','edit']]);
        });
    });
//});