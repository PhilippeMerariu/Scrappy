<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

/**
 * @method static InviteStatus PENDING(): InviteStatus
 * @method static InviteStatus APPROVED(): InviteStatus
 * @method static InviteStatus REJECTED(): InviteStatus
 */
class InviteStatus extends Enum
{
    private const PENDING = 'pending';
    private const APPROVED = 'approved';
    private const REJECTED = 'rejected';
}
