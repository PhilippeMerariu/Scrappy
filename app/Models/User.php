<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string|null $api_token
 * @property string|null $email_verified_at
 * @property string|null $remember_token
 * @property mixed $groups
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Generate api token
     * @return void
     */
    public function generateApiToken()
    {
        if (empty($this->api_token)) {
            $apiToken = hash('sha256', Str::random(60));
            $this->api_token = $apiToken;
            $this->save();
        }
    }

    /**
     * Get user's groups
     * @return mixed
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class)
            ->withPivot('role_id', 'role_id');
    }

    public function invites(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Invite::class);
    }

    /**
     * Check if user is part of a group
     * @param $groupId
     * @return bool
     */
    public function isPartOfGroup($groupId): bool
    {
        $isPart = false;

        /** @var Group $group */
        foreach ($this->groups as $group) {
            if ($group->id == $groupId) {
                $isPart = true;
            }
        }

        return $isPart;
    }
}
