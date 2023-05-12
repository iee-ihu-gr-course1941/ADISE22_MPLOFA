<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kicked extends Model  {
    use HasFactory;
    protected $table = 'kicked';
    protected $fillable = [
        'user_id',
        'room_id',
        'reason',
    ];
    protected $hidden = [
        'updated_at'
    ];

    public function reason() {
       return $this->reason;
    }
    public function user() {
       return User::find($this->user_id);
    }
    public function room() {
       return Room::find($this->room_id);
    }
}
