<?php

return [
    'role_structure' => [
        'super' => [
            'users' => 'c,r,u,d',
            'acl' => 'c,r,u,d',
            'profile' => 'r,u'
        ],
        'admin' => [
            'profile' => 'r,u',
            'user' => 'c,r,u,v',
            'role' => 'c,r,u,v',
            'permission' => 'c,r,u,v',
            'team' => 'c,r,u,v',
            'activitylog' => 'r,d,v',
            'accesslog' => 'r,d,v',
            'securitylog' => 'r,d,v',
            'organization' => 'v',
            'company' => 'c,r,u,v',
            'department' => 'c,r,u,v',
            'location' => 'c,r,u,v',
            'employee' => 'c,r,u,v',
            'position' => 'c,r,u,v',
        ],
        'user' => [
            'profile' => 'r,u'
        ],
    ],
    'permission_structure' => [
        'cru_user' => [
            'profile' => 'c,r,u'
        ],
    ],
    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
        's' => 'restore',
        'v' => 'view',
        'r' => 'review',
        'a' => 'approval',
        'cc' => 'cancel',
        'rj' => 'reject',
        'aj' => 'adjust',
    ]
];
