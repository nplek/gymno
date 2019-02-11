<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Permission;
use App\Http\Resources\PermissionCollection;
use App\Http\Resources\Permission as PermissionResource;

class PermissionController extends Controller
{
    public function index() {
        return new PermissionCollection(Permission::paginate(50));
    }

    public function list()
    {
        return PermissionResource::collection(Permission::all());
    }

    public function store(Request $request) {
        $this->validate($request, [
            'name'=>'required|max:50|unique:Permissions',
            'display_name' => 'max:100',
            'description' => 'max:100',
            ]
        );

        $permission = new Permission();
        $permission->name = $request['name'];
        $permission->display_name = $request['display_name'];
        $permission->description = $request['description'];
        $permission->save();
        
        return new PermissionResource($permission);
    }

    public function show($id) {
        return new PermissionResource(Permission::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $this->validate($request, [
            'name'=>'required|max:50,'.$id,
            'display_name' => 'max:100',
            'description' => 'max:100',
        ]);
        $permission = Permission::findOrFail($id);
        
        $permission->name = $request['name'];
        $permission->display_name = $request['display_name'];
        $permission->description = $request['description'];
        $permission->save();

        return new PermissionResource($permission);
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();
        return new PermissionResource($permission);
    }
}
