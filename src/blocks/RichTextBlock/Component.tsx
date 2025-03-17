import React from 'react'
import { Title } from '@/components/Section/Title'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { RichTextBlock as RichTextBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import './Component.scss'

export const RichTextBlock: React.FC<RichTextBlockType> = ({
  richText,
  enableLink,
  link,
  enableImage,
  image,
  imagePosition,
  richTitle,
  caption
}) => {
const imagePos = {
  cases: {
    "right": "right",
    "left": "left",
    "top": "top",
    "bottom": "bottom",
  }
}

const imageInfo = {
  media: image,
  position: imagePosition || "left",
  enable: enableImage
}

const imgLeft = imageInfo.position === "left";
const imgCenter = imageInfo.position === "top" || imageInfo.position === "bottom";

const imageClass = `col-span-1 pos-${imagePos.cases[imageInfo.position]}`;
const contentClass = `col-span-1`;

  return (
    <div className={cn("block__richTextBlock grid", imgCenter ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2")}>
      {enableImage &&
        <Media
          className={cn("sec_image", imageClass)}
          resource={imageInfo.media}
        />
      }
      <div className={cn("sec_content", contentClass)}>
        {richTitle && <Title caption={caption}>
            <RichText className="sec_title" content={richTitle} enableGutter={false} />
        </Title>}

        <div className="block__richtext">
          {richText && <RichText content={richText} enableProse={false} enableGutter={false} />}
          {enableLink && <CMSLink {...link} />}
        </div>
      </div>
    </div>
  )
}
