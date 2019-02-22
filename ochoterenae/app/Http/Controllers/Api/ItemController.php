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
            //return new ItemCollection(Item::withTrashed()->paginate(50));
            return new ItemCollection(Item::where($query)->withTrashed()->paginate($pageSize));
        //} else {
            //return new ItemCollection(Item::paginate(50));
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
            'name'=>'required|min:3|max:100',
            'description'=>'max:200',
            'unit_name'=>'required|max:10',
        ]);

        $item = new Item();
        $item->item_code = $request['item_code'];
        $item->name = $request['name'];
        $item->description = $request['description'];
        $item->unit_name = $request['unit_name'];
        $item->active = $request['active'];
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
            'description'=>'max:200',
            'unit_name'=>'required|max:10',
        ]);
        $item = Item::findOrFail($id);
        //$item->item_code = $request['item_code'];
        $item->name = $request['name'];
        $item->description = $request['description'];
        $item->unit_name = $request['unit_name'];
        $item->active = $request['active'];
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
