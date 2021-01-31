<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $image_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Group extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'image_path'
    ];

    protected $appends = [
        'profile_picture'
    ];

    /**
     * Get group user's
     * @return mixed
     */
    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role_id', 'role_id');
    }

    public function invites(): HasMany
    {
        return $this->hasMany(Invite::class);
    }

    public function getProfilePictureAttribute()
    {
        $path = $this->attributes['image_path'] ?? null;

        if (!$path) {
            return null;
        }

        $url = Storage::url($path);

        return [
            'url' => $url
        ];
    }
}
