<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array|\JsonSerializable|\Illuminate\Contracts\Support\Arrayable {
        return [
            'id' => $this->id,
            'Name' => $this->Name(),
            'Capacity' => $this->Capacity,
            'Owner' => $this->Owner(),
            'Player' => $this->Player(),
            'OwnerReady' => $this->OwnerReadyBool(),
            'PlayerReady' => $this->PlayerReadyBool(),
            'Game_Active' => $this->Active(),
            'GameId' => $this->GameId,
        ];
    }
}
