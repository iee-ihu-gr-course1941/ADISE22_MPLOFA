<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MoveController;
use App\Http\Controllers\RoomController;
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
//Route::get('/', [WelcomeController::class,'welcome']);
Route::get('/dashboard',[DashboardController::class,'Dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Auth::routes();



Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/Game/Play', [GameController::class, 'store'])->middleware(['auth'])->name('Play');
Route::get('/Game/Winner', [GameController::class, 'showWinner'])->middleware(['auth'])->name('Winner');
Route::post('Game/Play/Make_Move',[MoveController::class,'store'])->middleware(['auth'])->name('Make_Move');
Route::get('Game/Play/checkEnemyMove',[GameController::class, 'checkEnemyMove'])->name('Check_Enemy_Move');
Route::post('Room/New',[RoomController::class,'store'])->name('New_Room');
Route::post('Room/Join',[RoomController::class,'Join'])->name('Join_Room');
Route::post('Room/Leave',[RoomController::class,'Leave'])->name('Leave_Room');
Route::post('Room/Ready',[RoomController::class,'Ready'])->name('Ready');
Route::post('Room/Activate',[RoomController::class,'Activate'])->name('Activate_Room');
Route::get('Room/Initialize_Game',[GameController::class,'create'])->name('Initialize_Game');
Route::get('Room/Poll_Room',[RoomController::class,'pollRoom'])->name('Check_For_New_Player');

Route::get('Game/Play/Make_Move',function (){});
require __DIR__.'/auth.php';
