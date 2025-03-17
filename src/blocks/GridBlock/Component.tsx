import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'
import { GridBlock as GridBlockType } from '@/payload-types'
import { CardBlock } from '../Card/Component'
import { IconBlock } from '../IconBlock/Component'
import './Component.scss'

const blockComponents = {
  cardBlock: CardBlock,
  iconBlock: IconBlock,
}

export const GridBlock: React.FC<GridBlockType> = (props) => {
  const { item, columns, className } = props
  const isCol1 = columns === "1"
  const isCol2 = columns === "2"
  const isCol3 = columns === "3"
  const isCol4 = columns === "4"
  const gridItems = item
  const hasBlocks = gridItems && Array.isArray(gridItems) && gridItems.length > 0


  if (hasBlocks) {
    return (
      <div className={cn(
        `block__grid gap-4 grid lg:grid-cols-${columns} columns__0${columns}`,
        isCol4 && "md:grid-cols-2",
        className
        )}>
        {gridItems?.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={cn("block__grid_item", "lg:col-span-1")} key={index}>
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </div>
    )
  }
  return null
}
