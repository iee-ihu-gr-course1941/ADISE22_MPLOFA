<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource   {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)   {
        $user = User::find($this->user);
        return [
            'id' => $this->id,
            'user' => !is_null($user) ? $user->name : 'User is Inactive !',
            'rating' => $this->rating,
            'comment' => $this->comment,
            'placed' => date_format($this->created_at,"d/m/Y H:i:s"),
        ];
    }
}
