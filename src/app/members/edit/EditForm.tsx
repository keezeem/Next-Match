'use client';

import { memberEditSchema, MemberEditSchema } from '@/lib/schemas/memberEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Member } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form';

type Props = {
    member: Member
}

export default function EditForm({ member }: Props) {
 
    const { register, handleSubmit, reset, setError,
        formState: { isValid, isDirty, isSubmitting, errors } } = useForm<MemberEditSchema>({
            resolver: zodResolver(memberEditSchema), 
            mode: 'onTouched'
        });
  return (
    <div>
      EditForm
    </div>
  )
}
