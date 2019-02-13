<?php

namespace App;

use Laratrust\Models\LaratrustRole;
use App\Permission;
use Spatie\Activitylog\Traits\LogsActivity;

class Role extends LaratrustRole
{
    use LogsActivity;
    protected static $logName = 'security';
    protected static $logOnlyDirty = true;
    protected static $logAttributes = [
        'name', 
        'display_name',
        'description',
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }
}
