<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Warehouse;
use App\Http\Resources\WarehouseCollection;
use App\Http\Resources\Warehouse as WarehouseResource;
use App\Http\Resources\WarehouseList;
use Auth;

class WarehouseController extends Controller
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
        //if (Auth::user()->can('restore-bps') ){
            //return new WarehouseCollection(Warehouse::withTrashed()->paginate(50));
            return new WarehouseCollection(Warehouse::where($query)->withTrashed()->paginate($pageSize));
        //} else {
            //return new WarehouseCollection(Warehouse::paginate(50));
        //}
    }

    public function list()
    {
        return WarehouseList::collection(Warehouse::get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'whs_code'=>'required|max:20|min:3|unique:warehouses',
            'whs_name'=>'required|min:3|max:50',
            'active'=>'required',
        ]);

        $whs = new Warehouse();
        $whs->whs_code = $request['whs_code'];
        $whs->whs_name = $request['whs_name'];
        $whs->active = $request['active'];
        $whs->save();

        return new WarehouseResource($whs);
    }

    public function show($id)
    {
        return new WarehouseResource(Warehouse::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'whs_name'=>'required|min:3|max:50',
            'active'=>'required',
        ]);
        $whs = Warehouse::findOrFail($id);
        //$whs->whs_code = $request['whs_code'];
        $whs->whs_name = $request['whs_name'];
        $whs->active = $request['active'];
        $whs->save();

        return new WarehouseResource($whs);
    }

    public function destroy($id)
    {
        $whs = Warehouse::findOrFail($id);
        $whs->delete();
        return new WarehouseResource($whs);
    }

    public function restore($id)
    {
        $whs = Warehouse::onlyTrashed()->findOrFail($id);
        $whs->restore();

        return new WarehouseResource($whs);
    }
}
