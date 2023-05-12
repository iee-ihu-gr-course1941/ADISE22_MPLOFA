<?php

use App\Http\Controllers\BugController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MoveController;
use App\Http\Controllers\ReviewController;
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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('Game/Play', [GameController::class, 'store'])->middleware(['auth'])->name('Play');
//Route::post('Game/CanvasHasRendered',[GameController::class,'setCanvasRendered'])->name('Set_Canvas_Rendered');
Route::get('Game/Winner', [GameController::class, 'showWinner'])->middleware(['auth'])->name('Winner');
Route::post('Game/Play/Make_Move',[MoveController::class,'store'])->middleware(['auth'])->name('Make_Move');
Route::get('Game/Play/checkEnemyMove',[GameController::class, 'checkEnemyMove'])->name('Check_Enemy_Move');
Route::post('Room/New',[RoomController::class,'store'])->name('New_Room');
Route::post('Room/Join',[RoomController::class,'Join'])->name('Join_Room');
Route::post('Room/Link_Join/{RoomId?}/{Password?}',[RoomController::class,'Join_By_Link'])->middleware(['auth'])
    ->defaults('RoomId',null)->defaults('Password',null)->name('Join_Room_By_Link');
Route::post('Room/Leave',[RoomController::class,'Leave'])->name('Leave_Room');
Route::post('Room/Ready',[RoomController::class,'Ready'])->name('Ready');
Route::post('Room/Activate',[RoomController::class,'Activate'])->name('Activate_Room');
Route::delete('Room/Delete',[RoomController::class,'destroy'])->middleware(['admin'])->name('Delete_Room');
Route::patch('Room/Kick_Player',[RoomController::class,'Kick_Player'])->name('Room_Kick_Player');
Route::get('Room/Initialize_Game',[GameController::class,'create'])->name('Initialize_Game');
Route::get('Room/Poll_Room',[RoomController::class,'pollRoom'])->name('Check_For_New_Player');
Route::post('Reviews/Submit',[ReviewController::class,'store'])->name('Submit_Review');
Route::get('Room/RedirectIfRoomDoesntExist',[RoomController::class,'RedirectIfRoomDoesntExist'])->name('Room_Exists');
Route::post('Bug/New_Bug',[BugController::class,'store'])->name('New_Bug');
Route::post('Bug/Resolve',[BugController::class,'resolve'])->name('Resolve_Bug');


Route::get('Game/Play/Make_Move',function (){});
require __DIR__.'/auth.php';
