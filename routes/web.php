<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return redirect()->route('login');
});

Auth::routes(['verify' => true]);

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::group([
    'middleware' => ['auth'],
], function () {
    Route::get('/h', [App\Http\Controllers\HomeController::class, 'redirectToApp'])->name('redirect-to-app');
    Route::get('/h/{groupId}', [App\Http\Controllers\HomeController::class, 'showApp'])->name('show-app');
    Route::get('/storage/group_profile/{path}', [GroupController::class, 'showProfilePicture'])->name('show-profile-picture');
    Route::get('/storage/group_contents/{group}/{path}', [ContentController::class, 'showContent'])->name('show-group-content');
});
