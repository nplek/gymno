<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Warehouse extends Model
{
    use LogsActivity;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected static $logName = 'system';
    protected static $logOnlyDirty = true;
    protected static $logAttributes = ['whs_code', 'whs_name','active'];

    protected $fillable = [
        'whs_code', 'whs_name','active'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', 'A');
    }
}
