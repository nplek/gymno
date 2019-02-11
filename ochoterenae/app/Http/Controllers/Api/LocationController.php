<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Location;
use App\Http\Resources\LocationCollection;
use App\Http\Resources\Location as LocationResource;
use Auth;

class LocationController extends Controller
{
    public function index()
    {
        //if (Auth::user()->can('restore-location') ){
            //return new LocationCollection(Location::withTrashed()->paginate(50));
        //} else {
            return new LocationCollection(Location::paginate(50));
        //}
    }

    public function list()
    {
        return LocationResource::collection(Location::active()->get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:120',
            'short_name'=>'required|max:10|min:3|unique:locations'
        ]);

        $location = Location::create([
            "name" => $request['name'],
            "short_name" => $request['short_name'],
            "active" => $request['active'],
        ]);

        return new LocationResource($location);
    }

    public function show($id)
    {
        return new LocationResource(Location::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:100',
            'short_name'=>'required|max:10|min:3',
        ]);
        $location = Location::findOrFail($id);
        $location->name = $request['name'];
        $location->short_name = $request['short_name'];
        $location->active = $request['active'];
        $location->save();

        return new LocationResource($location);
    }

    public function destroy($id)
    {
        $location = Location::findOrFail($id);
        $location->delete();
        return new LocationResource($location);
    }

    public function restore($id)
    {
        $location = Location::onlyTrashed()->findOrFail($id);
        $location->restore();

        return new LocationResource($location);
    }
}
