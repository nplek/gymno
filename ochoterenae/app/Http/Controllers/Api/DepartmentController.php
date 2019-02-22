<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Department;
use App\Http\Resources\DepartmentCollection;
use App\Http\Resources\Department as DepartmentResource;
use Auth;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $query = [];
        if ($request['active_like']){
            $search = $request['active_like'];
            array_push($query,['active','=',$search]);
        }

        if ($request['short_name_like']) {
            $search = $request['short_name_like'];
            array_push($query,['short_name', 'like', '%'.$search.'%']);
        }

        if ($request['name_like']) {
            $search = $request['name_like'];
            array_push($query,['name', 'like', '%'.$search.'%']);
        }

        $pageSize = min($request['page_size'],50);
        //if (Auth::user()->can('restore-department') ){
            //return new DepartmentCollection(Department::withTrashed()->paginate(50));
            return new DepartmentCollection(Department::where($query)->withTrashed()->paginate($pageSize));
        //} else {
            //return new DepartmentCollection(Department::paginate($pageSize));
        //}
    }

    public function list()
    {
        return DepartmentResource::collection(Department::active()->get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:120',
            'short_name'=>'required|max:10|min:3|unique:departments',
            'company_id' => 'required'
        ]);

        $department = Department::create([
            "name" => $request['name'],
            "short_name" => $request['short_name'],
            "company_id" => $request['company_id'],
            "active" => $request['active'],
        ]);

        return new DepartmentResource($department);
    }

    public function show($id)
    {
        //return Department::findOrFail($id);
        return new DepartmentResource(Department::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:120',
            'short_name'=>'required|max:10|min:3',
            'company_id' => 'required'
        ]);

        $department = Department::findOrFail($id);
        $department->name = $request['name'];
        $department->short_name = $request['short_name'];
        $department->company_id = $request['company_id'];
        //$department->company_id = $request['company'];
        $department->active = $request['active'];
        $department->save();

        return new DepartmentResource($department);
    }

    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return new DepartmentResource($department);
    }

    public function restore($id)
    {
        $department = Department::onlyTrashed()->findOrFail($id);
        $department->restore();

        return new DepartmentResource($department);
    }
}
