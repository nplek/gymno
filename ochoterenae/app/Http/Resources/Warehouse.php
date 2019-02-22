<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Warehouse extends JsonResource
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
            'whs_code' => $this->whs_code,
            'whs_name' => $this->whs_name,
            'active' => $this->active,
            'created_at' => $this->created_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
