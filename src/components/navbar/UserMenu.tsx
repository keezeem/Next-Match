'use client';

import { signOutUser } from '@/app/actions/authActions';
import { transformImageUrl } from '@/lib/utils';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

type Props = {
    userInfo: {name: string | null; image: string | null;} | null
}

export default function UserMenu({userInfo}: Props) {
  return (
    <Dropdown placement='bottom-end'>
        <DropdownTrigger>
            <Avatar 
                isBordered
                as='button'
                className='transition-transform'
                color='secondary'
                name={userInfo?.name || 'user avatar'}
                size='sm'
                src={transformImageUrl(userInfo?.image) || '/images/user.png'}
            />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username' key={''}>
                    Signed in as {userInfo?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownItem as={Link} href='/members/edit' key={''}>
                Edit profile
            </DropdownItem>
            <DropdownItem color='danger' onClick={async () => signOutUser()} key={''} >
                Log out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}