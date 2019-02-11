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
    public function index()
    {
        //if (Auth::user()->can('restore-bps') ){
            //return new WarehouseCollection(Warehouse::withTrashed()->paginate(50));
        //} else {
            return new WarehouseCollection(Warehouse::paginate(50));
        //}
    }

    public function list()
    {
        return WarehouseList::collection(Warehouse::get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'whs_code'=>'required|max:20|min:3|unique:items',
            'whs_name'=>'required|min:3|max:50',
        ]);

        $whs = new Warehouse();
        $whs->whs_code = $request['whs_code'];
        $whs->whs_name = $request['whs_name'];
        $whs->save();

        return new Warehouse($whs);
    }

    public function show($id)
    {
        return new WarehouseResource(Warehouse::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'whs_name'=>'required|min:3|max:50',
        ]);
        $whs = Warehouse::findOrFail($id);
        $whs->whs_name = $request['whs_name'];
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
