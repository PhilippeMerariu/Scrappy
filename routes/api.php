<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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

Route::post('login', [LoginController::class, 'apiLogin']);

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('user-groups', [UserController::class, 'getUserGroups'])->name('get-user-groups');
    Route::get('user-invites', [UserController::class, 'getUserInvites'])->name('see-user-invites');
    Route::get('group-users/{group}', [GroupController::class, 'getGroupUsers'])->name('get-group-users');
    Route::post('group', [GroupController::class, 'store'])->name('store-group');
    Route::get('group-content/{group}', [GroupController::class, 'getGroupContents'])->name('get-group-contents');
    Route::post('group/leave/{group}', [GroupController::class, 'leaveGroup'])->name('leave-group');
    Route::post('content/{group}', [ContentController::class, 'storeContent'])->name('store-content');
    Route::post('invite/{group}', [InviteController::class, 'inviteUser'])->name('invite-user');
    Route::patch('invite/{invite}', [InviteController::class, 'patchInvite'])->name('patch-invite');
});
