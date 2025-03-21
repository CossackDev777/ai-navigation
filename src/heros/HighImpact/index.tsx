'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

// import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
// import RichText from '@/components/RichText'
import './index.scss'
import { BgAnimation } from '@/components/BgAnimation'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, coverImage }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="hero__highImpact"
      data-theme="dark"
    >
      {/* <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] text-center">
          {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div> */}
      <div className="min-h-[80vh] lg:min-h-[620px] select-none">
        {(coverImage || (media && typeof media === 'object')) && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            priority={false}
            loading="lazy"
            resource={coverImage || media}
          />
        )}
      </div>
      <BgAnimation links={links} content={richText} blendMode={media ? true : false} />
    </div>
  )
}
