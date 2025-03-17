import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'
import { useWatch } from 'react-hook-form'
import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const value = useWatch({ name })
  return (
    <Width width={width}>
      <div className="field_wrap">
        <Label htmlFor={name} data-shrink={isFocused || !!value}>{label}</Label>

        <TextAreaComponent
          defaultValue={defaultValue}
          id={name}
          rows={rows}
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
