<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class BugResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        $user = User::find($this->user);
        return [
            'id' => $this->id,
            'user' => $user,
            'encountered_at' => $this->encountered_at,
            'description' => $this->description,
            'resolved' => $this->resolved,
            'placed' => date_format($this->created_at,"d/m/Y H:i:s")
        ];
    }
}
