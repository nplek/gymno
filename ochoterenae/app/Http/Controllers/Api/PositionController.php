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
    public function index()
    {
        //if (Auth::user()->can('restore-position') ){
            //return new PositionCollection(Position::withTrashed()->paginate(50));
        //} else {
            return new PositionCollection(Position::paginate(50));
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
            'short_name'=>'required|max:10|min:3|unique:positions',
        ]);

        $position = Position::create([
            'name' => $request['name'],
            'short_name' => $request['short_name'],
            'parent_id' => $request['parent_id'],
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
            'short_name'=>'required|max:10|min:3',
        ]);
        $position = Position::findOrFail($id);
        $position->name = $request['name'];
        $position->short_name = $request['short_name'];
        $position->parent_id = $request['parent_id'];
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
