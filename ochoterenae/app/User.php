<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laratrust\Traits\LaratrustUserTrait;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable
{
    use LaratrustUserTrait;
    use LogsActivity;
    use Notifiable;
    use SoftDeletes;

    protected static $logName = 'system';
    protected static $logOnlyDirty = true;

    protected static $logAttributes = [
        'name', 
        'email',
        'active',
        'password',
    ];
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','active'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($password)
    {   
        $this->attributes['password'] = Hash::make($password);
    }

    public function scopeActive($query)
    {
        return $query->where('active', 'A');
    }

    public function roleusers()
    {
        return $this->hasmany(RoleUser::class);
    }

    public function employee()
    {
        return $this->hasOne(Employee::class,'id','employee_id');
    }
}
