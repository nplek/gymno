<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Unit extends Model
{
    use LogsActivity;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected static $logName = 'system';
    protected static $logOnlyDirty = true;
    protected static $logAttributes = ['name', 'tname','active'];

    protected $fillable = [
        'name', 'tname','active'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', 'A');
    }
}
