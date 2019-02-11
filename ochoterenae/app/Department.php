<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Department extends Model
{

    use LogsActivity;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected static $logName = 'system';
    protected static $logOnlyDirty = true;
    protected static $logAttributes = ['name', 'short_name','company_id','active'];

    protected $fillable = [
        'name', 'short_name','company_id','active'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', 'A');
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class,'user_has_departments',
        'department_id','user_id')->withTimestamps();
    }
}
