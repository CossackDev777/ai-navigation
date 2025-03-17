import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useWatch } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const value = useWatch({ name })
  return (
    <Width width={width}>
      <div className="field_wrap">
        <Label htmlFor={name} data-shrink={isFocused || !!value}>{label}</Label>
        <Input
          defaultValue={defaultValue}
          id={name}
          type="text"
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: requiredFromProps })}
          // onFocus={(e) => {
          //   setIsFocused(true)
          //   if (e.currentTarget instanceof HTMLInputElement) {
          //     e.currentTarget.onfocus?.()
          //   }
          // }}
          // onBlur={(e) => {
          //   setIsFocused(false)
          //   if (e.currentTarget instanceof HTMLInputElement) {
          //     e.currentTarget.onblur?.()
          //   }
          // }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
