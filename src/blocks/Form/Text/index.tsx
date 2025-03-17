import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useWatch } from 'react-hook-form'
import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
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
    <Width width={width} type="text">
      <div className="field_wrap">
        <Label htmlFor={name} data-shrink={isFocused || !!value}>{label}</Label>
        <Input
          defaultValue={defaultValue}
          id={name}
          type="text"
          {...register(name, { required: requiredFromProps })}
          // onFocus={(e) => {
          //   setIsFocused(true)
          //   e.currentTarget.onFocus?.()
          // }}
          // onBlur={(e) => {
          //   setIsFocused(false)
          //   e.currentTarget.onBlur?.()
          // }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
