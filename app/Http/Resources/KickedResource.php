<?php

namespace App\Http\Resources;

use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class KickedResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        return [
            'kicked_user' => $this->user(),
            'kicked_from' => $this->room(),
            'reason' => $this->reason(),
        ];
    }
}
