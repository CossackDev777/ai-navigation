import { cn } from 'src/utilities/cn'
import React from 'react'

import type { SectionBlock as SectionBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Title } from '@/components/Section/Title'
import { CallToActionBlock } from '../CallToAction/Component'
import { GridBlock } from '../GridBlock/Component'
import { RichTextBlock } from '../RichTextBlock/Component'
import { TableBlock } from '../Table/Component'
import { CodeBlock } from '../Code/Component'
import { ArchiveBlock } from '../ArchiveBlock/Component'
import { FormBlock } from '../Form/Component'
import { SliderBlock } from '../SliderBlock/Component'
import './Component.scss'

const blockComponents = {
  cta: CallToActionBlock,
  grid: GridBlock,
  richTextBlock: RichTextBlock,
  code: CodeBlock,
  archive: ArchiveBlock,
  formBlock: FormBlock,
  slider: SliderBlock,
  table: TableBlock,
}

export const SectionBlock: React.FC<SectionBlockProps> = (props) => {
  const { richTitle, caption, sectionContentNew, className, idName, spacing } = props
  const cusClass = className
  const cusId = idName
  const Blocks = sectionContentNew
  const hasBlocks = Blocks && Array.isArray(Blocks) && Blocks.length > 0
  const noSpace = spacing === 'none'

  const SectionTitles = () => {
    return (
      <Title caption={caption}>
          <RichText className="sec_title" content={richTitle} enableGutter={false} />
      </Title>
    )
  }
  // console.log('section id + spacing:', `spacing:${spacing} id:${cusId}`)

  return (
    <div className={cn("block__section", !noSpace && 'container', cusId && `section__${cusId}`, cusClass)}>
      {hasBlocks && (
        <div className="block__section_content">
          {Blocks.map((block, index) => {
            const { blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              if (Block) {
                const isRich = blockType === 'richTextBlock'
                const isSlider = blockType === 'slider'
                return (
                  <div className={cn("block__section_item", `btype__${blockType}`)} key={index}>
                    {!(isRich || isSlider) && richTitle && index === 0 && <SectionTitles />}
                    <Block
                    {...block}
                    {...((isRich || isSlider) && index === 0 && { richTitle, caption })}
                    />
                  </div>
                )
              }
            }
            return null
          })}
        </div>
      )}

    </div>
  )
}
