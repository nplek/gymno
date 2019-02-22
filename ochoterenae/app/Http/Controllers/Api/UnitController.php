<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Unit;
use App\Http\Resources\UnitCollection;
use App\Http\Resources\Unit as UnitResource;
use Auth;

class UnitController extends Controller
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
        //if (Auth::user()->can('restore-item') ){
            //return new ItemUnitCollection(Unit::withTrashed()->paginate(50));
            return new UnitCollection(Unit::where($query)->withTrashed()->paginate($pageSize));
        //} else {
            //return new UnitCollection(Unit::paginate(50));
        //}
    }

    public function list()
    {
        return UnitResource::collection(Unit::get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:10|unique:units',
        ]);


        /*$unit = Unit::create([
            'name' => $request['name'],
            'tname' => $request['name'],
        ]);*/
        $item = new Unit();
        $item->name = $request['name'];
        $item->tname = $request['tname'];
        $item->active = $request['active'];
        $item->save();

        return response()->json(['message' => 'store unit success.']);
    }

    public function show($id)
    {
        return new UnitResource(Unit::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:10',
        ]);
        $item = Unit::findOrFail($id);
        $item->name = $request['name'];
        $item->tname = $request['tname'];
        $item->active = $request['active'];
        $item->save();

        return new UnitResource($item);
    }

    public function destroy($id)
    {
        $item = Unit::findOrFail($id);
        $item->delete();
        return new UnitResource($item);
        //return response()->json(null, 204);
    }

    public function restore($id)
    {
        $item = Unit::onlyTrashed()->findOrFail($id);
        $item->restore();

        return new UnitResource($item);
    }
}
