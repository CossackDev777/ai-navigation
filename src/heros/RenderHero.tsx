import React from 'react'

import type { Page } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import RichText from '@/components/RichText'
import type { Media } from '@/payload-types'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

type HeroProps = {
  type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
  title?: string
  subTitle?: string
  catchPhrase?: any
  richText?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [key: string]: unknown
      }[]
      direction: 'ltr' | 'rtl' | null
      format: '' | 'center' | 'left' | 'start' | 'right' | 'end' | 'justify'
      indent: number
      version: number
      [key: string]: unknown
    }
    [key: string]: unknown
  } | null
  coverImage?: string | Media | null
}

export const RenderHero: React.FC<HeroProps> = (props) => {
  const { type, title, subTitle, catchPhrase, coverImage } = props || {}
  // console.log('RenderHero props:', props)

  if (!type || type === 'lowImpact') return (
    <div className="page__header bg-odd-row">
     <div className={cn("container", catchPhrase && "flex flex-col gap-6 lg:gap-main lg:grid lg:grid-cols-12 lg:items-end")}>
      <div className={cn("page__header_title_container", catchPhrase && "lg:col-span-8")}>
       {subTitle ? (
       <>
       <div className="page__header_title page__title_en">{subTitle}</div>
        <h1 className="page__header_title_sub page__title_sub">{title}</h1>
       </>

      ) : <h1 className="page__header_title page__title">{title}</h1>}
      </div>
      {catchPhrase && (
        <div className="page__header_desc page__desc lg:col-span-4">
          <RichText
              content={catchPhrase}
              className="page__header_catchphrase"
            />
        </div>
      )}
     </div>

    </div>
  )

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
