<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Item extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'item_code' => $this->item_code,
            'name' => $this->name,
            'unit_name' => $this->unit_name,
            'description' => $this->description,
            'deleted_at' => $this->deleted_at,
            'created_at' => $this->created_at,
            'active' => $this->active,
        ];
    }
}
