<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use function Termwind\render;

class Game extends Model {

    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'winner',
        'graded',
        'players',
    ];

    public function players() {
        return json_decode($this->players);
    }

    public function uuid() {
        return $this->id;
    }

    public function graded() {
        return $this->graded === 1;
    }

    public function hasEnded() {
        return !is_null($this->winner);
    }
}
