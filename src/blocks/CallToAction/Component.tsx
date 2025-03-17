import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import './Component.scss'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container__block">
      <div className="cta__card">
        <div className="cta__card_content max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" content={richText} enableGutter={false} />}
        </div>
        <div className="cta__card_links flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="xl" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
