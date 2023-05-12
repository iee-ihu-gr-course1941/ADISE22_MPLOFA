<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomCollection;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class HomeController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request) {
        $InviteLink = URL::route('register', ['refId' => $request->user()->id]);
        $Kicked = $request->session()->get('Kicked');
        $Rooms = Room::where('GameActive',0)->where('InviteOnly',0)->get();
        return Inertia::render('Dashboard',['Rooms'=> fn ()=> new RoomCollection($Rooms),
            'InviteLink'=>$InviteLink,'Kicked' => fn()=>$Kicked]);
    }
}
