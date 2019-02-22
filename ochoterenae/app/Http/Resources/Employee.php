<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Location as LocationResource;
use App\Http\Resources\Position as PositionResource;
use App\Http\Resources\Department as DepartmentResource;
use App\Http\Resources\EmployeePositionList as empPostion;
class Employee extends JsonResource
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
            'employee_id' => $this->employee_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'mobile' => $this->mobile,
            'phone' => $this->phone,
            'photo' => $this->photo,
            'positions' => PositionResource::collection($this->positions),
            //'positions' => empPostion::collection($this->positions),
            'manager_id' => $this->manager_id,
            'manager' => new EmployeeList($this->manager),
            'type' => $this->type,
            //'employeeType' => $this->type,
            'email' => $this->email,
            'active' => $this->active,
            'department_id' => $this->department_id,
            'department' => new DepartmentResource($this->department),
            'departments' => DepartmentResource::collection($this->departments),
        ];
    }
}
