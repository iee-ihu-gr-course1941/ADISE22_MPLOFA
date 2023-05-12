<?php

namespace App\Http\Resources;

use App\Models\Game;
use App\Models\Move;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class GameStateResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     *
     */
    public function __construct($resource, $last_Move)
    {
        // Ensure you call the parent constructor
        parent::__construct($resource);
        $this->resource = $resource;

        $this->Last_move = $last_Move;
    }
    public function toArray($request) {
        if($this->bluff_has_been_called) {
            $Cards_played = 'Bluff_Called';
        }
        else {
            if($this->cards_played === []) {
                $Cards_played = 'Passed';
            }
            else {
                if(is_string(json_decode($this->cards_played)))
                    if(is_array(json_decode(json_decode($this->cards_played)))){
                        if(json_decode(json_decode($this->cards_played))===[])
                            $Cards_played = 'Passed';
                    }else{
                        $Cards_played = (object)json_decode(json_decode($this->cards_played))->as;
                    }

                else
                    $Cards_played = json_decode($this->cards_played)->as;

            }
        }
        $User = $request->user()->id;
        $cards_down = json_decode($this->cards_down);
        $cards_down_count = count($cards_down->cards_down);
        $Game = Game::find($this->game_id);
        $Players = $Game->players();
        $Player_Cards = $this->getPlayerCards(json_decode($this->player_cards),$User);
        $Last_Move = $this->Last_move;
        return [
            'game_id' => $this->game_id,
            'sequence_number' => $this->sequence_number,
            'next_player' => is_string($this->next_player) ? User::find($this->next_player) : $this->next_player,
            'cards_down' => $cards_down_count,
            'status' => $this->status,
            'player_cards' => $Player_Cards,
            'cards_played' => $Cards_played,
            'previous_move' => $this->when(!is_null($Last_Move),new MoveResource($Last_Move)),
            'test' => $this->test,
        ];
    }

    protected function getPlayerCards($players,$player_id) {
        $current_user_cards = $enemy_user_cards = $enemy_user_id =  null;
        foreach (is_string($players) ? json_decode($players) : $players as $player) {
            if($player->id === $player_id) {
                $current_user_cards = $player->cards;
            }
            else {
                $enemy_user_id = $player->id;
                $enemy_user_cards = count((array)$player->cards);
            }
        }
        return ['player1'=>['id'=>$player_id,'cards'=>(array)$current_user_cards], 'player2'=>['id'=>$enemy_user_id,'count'=>$enemy_user_cards]];
    }
}
