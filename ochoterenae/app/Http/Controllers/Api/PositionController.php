<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Position;
use App\Http\Resources\PositionCollection;
use App\Http\Resources\Position as PositionResource;
use Auth;

class PositionController extends Controller
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
        //if (Auth::user()->can('restore-position') ){
            //return new PositionCollection(Position::withTrashed()->paginate(50));
            return new PositionCollection(Position::where($query)->withTrashed()->paginate($pageSize));
        //} else {
            //return new PositionCollection(Position::paginate(50));
        //}
    }

    public function list()
    {
        return PositionResource::collection(Position::active()->get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:120',
            'short_name'=>'required|max:10|min:2|unique:positions',
        ]);

        $position = Position::create([
            'name' => $request['name'],
            'short_name' => $request['short_name'],
            'active' => $request['active'],
        ]);

        return new PositionResource($position);
    }

    public function show($id)
    {
        return new PositionResource(Position::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:100',
            'short_name'=>'required|max:10|min:2',
        ]);
        $position = Position::findOrFail($id);
        $position->name = $request['name'];
        $position->short_name = $request['short_name'];
        $position->active = $request['active'];
        $position->save();

        return new PositionResource($position);
    }

    public function destroy($id)
    {
        $position = Position::findOrFail($id);
        $position->delete();

        return new PositionResource($position);
    }

    public function restore($id)
    {
        $position = Position::onlyTrashed()->findOrFail($id);
        $position->restore();

        return new PositionResource($position);
    }
}
