<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RoomController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function store(Request $request) {
        $input = $request->only(['Name','Capacity','Password']);
        $Room = new Room;
        $Room->OwnerId = $request->user()->id;
        $Room->Name = $input['Name'];
        $Room->Capacity = $input['Capacity'];
        $Room->Password = $input['Password'] === '' ? null : $input['Password'];
        $Room->save();
        return Redirect::route('Initialize_Game',['RoomId'=>$Room->id])->with('Room',$Room);
    }

    /**
     * Display the specified resource.
     *
     * @param Room $room
     * @return Response
     */
    public function show(Room $room) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Room $room
     * @return Response
     */
    public function edit(Room $room) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Room $room
     * @return Response
     */

    public function update(Request $request, Room $room) {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param Room $room
     * @return Response
     */
    public function destroy(Request $request) {
        $input = $request->only(['room_id']);
        Room::destroy($input['room_id']);
    }

    public function pollRoom(Request $request) {
        $input = $request->only('RoomId');
        $Room = Room::find($input['RoomId']);
//        ,'NRoom'=>Inertia::lazy(fn()=>new RoomResource(Room::find($Room->id)))
        return Inertia::render('Game/GameWaitingRoom',['Room'=>new RoomResource($Room)]);
    }

    public function setReady(Request $request, Room $room) {
       $User = $request->user()->id;

       if($User === $room->Player1()) {
           $room->Player1Ready = !$room->Player1Ready();
//           if($room->Player1Ready() && $room->Player2Ready()) {
//           }
       }
       elseif($User === $room->Player2()) {
           $room->Player2Ready = !$room->Player2Ready();
//           if($room->Player1Ready() && $room->Player2Ready()) {
//           }
       }
       return false;
    }

    public function Ready(Request $request) {
        $input = $request->only(['RoomId']);
        $Room = Room::find($input['RoomId']);
        if($request->user()->id === $Room->Owner()->id) {
            $Room->OwnerReady = true;
            $Room->save();
        }
        else if ($request->user()->id === $Room->Player()->id) {
            $Room->PlayerReady = true;
            $Room->save();
        }
//        return Redirect::route('Check_For_New_Player',['RoomId'=>$Room->id]);
    }

    public function Join(Request $request) {
        $input = $request->only(['RoomId']);
        $Room = Room::find($input['RoomId']);
        if(is_null($Room))
            return Redirect::route('home')->withErrors(['Room_Doesnt_Exist'=>true]);
        $Room->PlayerId = $request->user()->id;
        $Room->save();
        return Inertia::render('Game/GameWaitingRoom',['Room'=>new RoomResource($Room)]);
    }

    public function Leave(Request $request) {
        $input = $request->only(['RoomId']);
        $Room = Room::find($input['RoomId']);
        if($request->user()->id === $Room->Owner()->id) {
            $Room->OwnerId = null;
            if($Room->OwnerReadyBool())
                $Room->OwnerReady = false;
            if(!is_null($Room->Player())) {
                $Room->OwnerId = $Room->Player()->id;
                $Room->PlayerId = null;
                if($Room->PlayerReadyBool()) {
                    $Room->OwnerReady = true;
                    $Room->PlayerReady = false;
                }
                $Room->save();
                return Redirect::route('home');
            }
            if(is_null($Room->Owner()) && is_null($Room->Player()))
                $Room->delete();
            else
                $Room->save();
            return Redirect::route('home');
        }
        else if($request->user()->id === $Room->Player()->id) {
            $Room->PlayerId = null;
            if($Room->PlayerReadyBool())
                $Room->PlayerReady = false;
            if(is_null($Room->Owner()) && is_null($Room->Player()))
                $Room->delete();
            else
                $Room->save();
        }
        return Redirect::route('home');
    }

    public function Activate(Request $request) {
        $input = $request->only(['RoomId']);
        $Room = Room::find($input['RoomId']);
            if(!$Room->Active() && $request->user()->id === $Room->Owner()->id) {
                $Room->GameActive = true;
                $Room->save();
            }
        return Redirect::route('Play',['Room'=>$Room->id]);
//            ->with('Room',$Room);
    }
}
