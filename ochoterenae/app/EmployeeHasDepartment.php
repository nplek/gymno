<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class EmployeeHasDepartment extends Model
{
    use LogsActivity;
    protected static $logName = 'system';
    protected static $logOnlyDirty = true;
    protected static $logAttributes = [
        'department_id', 
        'employee_id',
    ];

    protected $fillable = [
        'department_id', 'employee_id'
    ];
}
