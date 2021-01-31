<?php

namespace App\Enums;

use Illuminate\Support\Arr;
use MyCLabs\Enum\Enum;

/**
 * @method static Roles BASIC(): Roles
 * @method static Roles ADMIN(): Roles
 */
class Roles extends Enum
{
    private const BASIC = 'basic';
    private const ADMIN = 'admin';
}
