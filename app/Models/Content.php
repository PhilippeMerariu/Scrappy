<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\Content
 *
 * @property int $id
 * @property int $group_id
 * @property int $user_id
 * @property string $path
 * @property mixed $user
 * @property mixed $group
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Content extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'group_id',
        'user_id',
        'path',
        'caption'
    ];

    protected $appends = [
        'content_picture'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function group()
    {
        return $this->hasOne(Group::class);
    }

    public function getContentPictureAttribute()
    {
        $path = $this->attributes['path'] ?? null;

        if (!$path) {
            return null;
        }

        $url = Storage::url($path);

        return [
            'url' => $url
        ];
    }
}
