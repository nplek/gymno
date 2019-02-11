<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Item;
use App\Http\Resources\ItemCollection;
use App\Http\Resources\Item as ItemResource;
use Auth;

class ItemController extends Controller
{
    public function index()
    {
        //if (Auth::user()->can('restore-item') ){
            //return new ItemCollection(Item::withTrashed()->paginate(50));
        //} else {
            return new ItemCollection(Item::paginate(50));
        //}
    }

    public function list()
    {
        return ItemResource::collection(Item::get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'item_code'=>'required|max:20|min:3|unique:items',
            'name'=>'required|min:3|max:50',
            'main_unit'=>'required',
            'unit_id'=>'required',
        ]);

        $item = new Item();
        $item->item_code = $request['item_code'];
        $item->name = $request['name'];
        $item->description = $request['description'];
        $item->unit_name = $request['main_unit'];
        //$item->unit_id = $request['unit_id'];
        $item->save();

        return new ItemResource($item);
    }

    public function show($id)
    {
        return new ItemResource(Item::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name'=>'required|min:3|max:50',
            'main_unit'=>'required',
            'unit_id'=>'required',
        ]);
        $item = Item::findOrFail($id);
        $item->name = $request['name'];
        $item->description = $request['description'];
        $item->main_unit = $request['main_unit'];
        $item->unit_id = $request['unit_id'];
        $item->save();
        return new ItemResource($item);
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return new ItemResource($item);
    }

    public function restore($id)
    {
        $item = Item::onlyTrashed()->findOrFail($id);
        $item->restore();

        return new ItemResource($item);
    }

}
