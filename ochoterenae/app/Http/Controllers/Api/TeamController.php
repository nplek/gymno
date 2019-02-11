<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Team;
use App\Http\Resources\TeamCollection;
use App\Http\Resources\Team as TeamResource;

class TeamController extends Controller
{
    public function index() {
        return new TeamCollection(Team::paginate(50));
    }

    public function list()
    {
        return TeamResource::collection(Team::all());
    }

    public function store(Request $request) {
        $this->validate($request, [
            'name'=>'required|max:50|unique:teams',
            'display_name' => 'max:100',
            'description' => 'max:100',
            ]
        );

        $name = $request['name'];
        $display_name = $request['display_name'];
        //$description = $request['description'];

        $team = new Team();
        $team->name = $name;
        $team->display_name = $display_name;
        //$team->description = $description;
        $team->description = $request['description'];
        $team->save();
        
        return new TeamResource($team);
    }

    public function show($id) {
        return new TeamResource(Team::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $this->validate($request, [
            'name'=>'required|max:50,'.$id,
            'display_name' => 'max:100',
            'description' => 'max:100',
        ]);
        $team = Team::findOrFail($id);
        $name = $request['name'];
        $display_name = $request['display_name'];
        $description = $request['description'];
        
        $team->name = $name;
        $team->display_name = $display_name;
        $team->description = $description;
        $team->save();

        return new TeamResource($team);
    }

    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();
        return new TeamResource($team);
    }
}
