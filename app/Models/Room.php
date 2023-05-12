<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model {
    use HasFactory,HasUuids;

    protected $fillable = [
        'Name',
        'Password',
        'Capacity',
        'OwnerId',
        'PlayerId',
        'OwnerReady',
        'PlayerReady',
        'Game_Active',
        'InviteOnly'
    ];
    protected $hidden =[
      'Password'
    ];
    public function Name() {
        return $this->Name;
    }
    public function Capacity() {
        return $this->Capacity;
    }
    public function Owner() {
        return User::find($this->OwnerId);
    }
    public function Player() {
        $Player = $this->PlayerId !==null ? User::find($this->PlayerId) : null;
        return $Player;
    }
    public function OwnerReadyBool() {
        return $this->OwnerReady;
    }
    public function PlayerReadyBool() {
        return $this->PlayerReady;
    }
    public function Active() {
        return $this->GameActive;
    }
    public function isInviteOnly() {
        return $this->InviteOnly;
    }
    public function Game() {
        return $this->hasOne(Game::class,'GamedId');
    }
}
