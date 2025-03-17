import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  dark?: boolean
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    dark } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="AI navi"
      width={180}
      height={47}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[110px] md:max-w-[9.375rem] w-full h-auto', className)}
      src={dark ? '/api/media/file/Logo_dark.svg' : '/api/media/file/Logo_light.svg'}
    />
  )
}
