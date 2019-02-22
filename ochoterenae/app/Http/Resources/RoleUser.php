<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
//use App\Http\Resources\TeamList as TeamResource;
use App\Http\Resources\UserList as UserResource;
use App\Http\Resources\RoleList as RoleResource;
class RoleUser extends JsonResource
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
            'user' => new UserResource($this->user),
            'role' => new RoleResource($this->role),
            //'team' => new TeamResource($this->team),
        ];
    }
}
