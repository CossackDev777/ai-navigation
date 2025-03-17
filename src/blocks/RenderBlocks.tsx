import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { SectionBlock } from '@/blocks/Section/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import './RenderBlocks.scss'
import { spacingField } from '../fields/spacing';

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  section: SectionBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  className?: string
  title?: string
  subTitle?: string
  slug?: string
}> = (props) => {
  const { slug, blocks, className, title, subTitle } = props

  // console.log('blocks rendering:', blocks)

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          const spacing = (block as any).spacing || 'default'
          // console.log('blockType:', blockType)
          // console.log('blockSpacing:', spacing)

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            const Wrapper = blockType === 'section' ? 'section' : 'div'
            const blockId = block.idName ? block.idName : null

            if (Block) {
              return (
                <Wrapper
                  {...(blockId && { id: blockId })}
                  className={cn(
                    'block__render',
                    slug && `block__${slug}`,
                    {
                      'py-8': spacing === 'small',
                      'py-16 lg:py-24': spacing === 'default',
                      'py-24 lg:py-32': spacing === 'large',
                      'py-0': spacing === 'none',
                    },
                    className,
                    (block as any).className,
                  )}
                  key={index}
                >
                  {/* @ts-expect-error */}
                  <Block {...block} title={title} subTitle={subTitle} />
                </Wrapper>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
