<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameState extends Model {
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'game_id',
        'sequence_number',
        'is_bluffed',
        'bluff_has_been_called',
        'cards_down',
        'next_player',
        'status',
        'player_cards',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'cards_down',
        'is_bluffed',
        'bluff_has_been_called',
    ];

    public function game_id() {
        return $this->game_id;
    }
    public function sequence() {
        return $this->sequence_number;
    }
    public function is_bluffed() {
        return $this->is_bluffed;
    }
    public function bluff_called() {
        return $this->bluff_has_been_called;
    }
    public function cards_down() {
        return json_decode($this->cards_down);
    }
    public function next_player() {
        return $this->next_player;
    }
    public function status() {
        return $this->status;
    }
    public function cards_played() {
       return  is_string(json_decode($this->cards_played)) ? json_decode(json_decode($this->cards_played)) : json_decode($this->cards_played);
    }
    public function player_cards() {
       return $this->player_cardsjson_encode($this->player_cards);
    }

}
