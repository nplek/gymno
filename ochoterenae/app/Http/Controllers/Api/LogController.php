<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Activitylog\Models\Activity;
use App\Http\Resources\ActivityCollection;
use App\Http\Resources\Activity as ActivityResource;

class LogController extends Controller
{
    public function activityLogsIndex()
    {
        return new ActivityCollection(Activity::where('log_name','=','system')->orderBy('id', 'desc')->paginate(50));
    }

    public function destroyLog($id)
    {
        $activity = Activity::findOrFail($id);
        $activity->delete();
        return new ActivityResource($activity);
    }

    public function accessLogsIndex()
    {
        return new ActivityCollection(Activity::where('log_name','=','auth')->orderBy('id', 'desc')->paginate(50));
    }

    public function securityLogsIndex()
    {
        return new ActivityCollection(Activity::where('log_name','=','security')->orderBy('id', 'desc')->paginate(50));
    }
}
