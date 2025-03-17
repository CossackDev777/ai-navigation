import { cn } from '@/utilities/cn'
import './index.scss'
import RichText from '@/components/RichText'
import React from 'react'
import { CMSLink } from '@/components/Link'
export const BgAnimation: React.FC<{
  title?: string
  content?: any
  links?: any
  blendMode?: boolean
}> = (props) => {
  return (
    <>
    <div className={cn('gradient-bg', props.blendMode ? "mix-blend-hard-light" : null)}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className={cn('g1')} />
        <div className={cn('g2')} />
        <div className={cn('g3')} />
        <div className={cn('g4')} />
        <div className={cn('g5')} />
        <div className="interactive"></div>
      </div>
    </div>
    <div className={cn("text-container", "pt-[60px] lg:pt-[88px]")}>
      <div className="text-center">
        {props.title && <h1 className={cn("text-post-h1")}>{props.title}</h1>}
        {props.content && <RichText className="" content={props.content} enableGutter={false} />}
        {Array.isArray(props.links) && props.links.length > 0 && (
            <ul className="hero__links">
              {props.links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink size="lg" className="hero__button" {...link} />
                  </li>
                )
              })}
            </ul>
          )}
      </div>
    </div>
    </>
  )
}
