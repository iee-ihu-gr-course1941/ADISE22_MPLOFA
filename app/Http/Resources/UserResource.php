<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)   {
        {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'points' => $this->points,
                'joined' => $this->when($request->user()->isAdmin(),date_format($this->created_at,"d/m/Y H:i:s")),
                'ca' => $this->when($this->isAdmin(),$this->isAdmin()),
                'isIEE' => $this->when($this->isIEE,$this->isIEE),
                'refUser' => $this->when(!is_null($this->refUser()),$this->refUser())
            ];
        }
    }
}
