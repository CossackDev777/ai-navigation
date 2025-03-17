'use client'

import React from 'react'
import { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import './Component.scss'

export type StepsBlockType = {
  blockName?: string
  blockType?: 'stepsBlock'
  steps: {
    image: Media
    title: string
    text?: string
    stepNumber?: number
  }[]
}

export const StepsBlock: React.FC<{
  id?: string
} & StepsBlockType> = (props) => {
  const { steps } = props

  return (
    <ol className="step-list">
        {steps.map((step, i) => (
          <li key={i} className={cn("step-list__item")}>
            {step.image && (
              <div className="step-list__image">
                <Image
                  src={step.image.url || ''}
                  alt={`Step ${step.stepNumber}`}
                  width={step.image.width || 0}
                  height={step.image.height || 0}
                />
              </div>
            )}
            <div className="step-list__content">
              <p className="step-list__title">{step.title}</p>
              {step.text && <p className="step-list__text">{step.text}</p>}
            </div>
          </li>
        ))}
      </ol>
  )
}
