<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\RoleUser as RoleUserResource;
use App\Http\Resources\Employee as EmployeeResource;
use App\Http\Resources\Role as RoleResource;

class User extends JsonResource
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
            'email' => $this->email,
            'employee_id' => $this->employee_id,
            'employee' => new EmployeeResource($this->employee),
            'active' => $this->active,
            //'userroles' => RoleUserResource::collection($this->roleusers),
            'user_type' => $this->user_type,
            'roles' => RoleResource::collection($this->roles),
            'last_login_ip' => $this->last_login_ip,
            'last_login_at' => $this->last_login_at,
            'last_logout_at' => $this->last_logout_at,
            'deleted_at' => $this->deleted_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
