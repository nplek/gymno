<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Position extends JsonResource
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
            'name' => $this->name,
            'short_name' => $this->short_name,
            'parent_id' => $this->parent_id,
            'active' => $this->active,
            'deleted_at' => $this->deleted_at,
            'parent' => $this->parent,
            'created_date' => $this->created_at,
        ];
    }
}
