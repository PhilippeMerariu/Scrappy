<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

/**
 * @method static UserPermissions EDIT_GROUPS(): UserPermissions
 */
class Permissions extends Enum
{

    private const EDIT_GROUPS = 'edit_groups';

    public static function getAllPermissions(): array
    {
        return array_values(static::values());
    }

    public static function getAdminPermissions(): array
    {
        return [
            static::EDIT_GROUPS,
        ];
    }

    public static function getBasicPermissions(): array
    {
        return [];
    }
}
