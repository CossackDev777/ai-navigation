"use client"

import React, { useState, useEffect, useCallback, CSSProperties, useMemo } from 'react'
import type { SliderBlock as SliderBlockProps, CaseStudies } from '@/payload-types'
import { Title } from '@/components/Section/Title'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/cn'
import './index.scss'
import { title } from 'process'


type Props = SliderBlockProps & {
  cases: CaseStudies[]
  imgClassName?: string
  staticImage?: StaticImageData
}

const ContentSlideCard = ({ items, className = "", style = {} as CSSProperties }) => {
  return (
    <div className={cn("case__list", className)} style={style}>
      {items.map((item, index) => {
        return (
          <div key={index} className={cn("case__list-item", item.slug)}>
            <span
              className={cn(`label label__${item.slug}`)}
              >{item.label}</span>
            <RichText
            className={cn(`value value__${item.slug}`)}
            content={item.value}
            enableGutter={false}
            enableProse={false}
            />
          </div>
        )
      })}
    </div>
  )
}

export const SliderComponent: React.FC<Props> = (props) => {
  const {
    richTitle,
    caption,
    cases
  } = props

  const [activeIndex, setActiveIndex] = useState(0);

  const imagesArray = useMemo(() => cases.map(caseItem => caseItem.coverImage) || [], [cases]);
  const contentArray = useMemo(() => cases.map(caseItem => caseItem.repeatFields) || [], [cases]);
  // To generate Slider Navigation
  const titleSlugArray = useMemo(() => {
    return cases.map(caseItem => ({
      title: caseItem.title,
      slug: caseItem.slug,
    })) || [];
  }, [cases]);

// useEffect(() => {
//   console.log('Slider Image Array:', imagesArray);
//   console.log('Slider Content Array:', contentArray);
//   console.log('Slider Navigation Array:', titleSlugArray);
// }, [imagesArray, contentArray, titleSlugArray]);

  const clickNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex === cases.length - 1 ? 0 : prevIndex + 1));
  }, [cases.length]);

  const clickPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? cases.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      clickNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [clickNext]);

  return (
    <div className="cslider">
      <div className="cslider__col cslider__col_images flex overflow-hidden">
        <div
          className="cslider__image flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {imagesArray.map((image, idx) => (
            <div
              key={idx}
              className="w-full h-full min-h-[320px] md:min-h-[480px] object-cover flex-shrink-0"
              style={{ width: '100%' }}
            >
              {image && typeof image !== 'string' &&
              <Media
                className="cslider__media w-full h-full object-cover"
                resource={image}
              />}
            </div>
          ))}
        </div>
      </div>
      <div className="cslider__col cslider__col_content">
        {richTitle && <Title caption={caption}>
            <RichText className="sec_title" content={richTitle} enableGutter={false} />
        </Title>}
        {titleSlugArray.length > 1 && (
          <div role="tablist" className="cslider__nav">
            {titleSlugArray.map((titleSlug, idx) => (
              <button
              key={idx}
              role="tab"
              data-state={activeIndex === idx ? 'active' : 'inactive'}
              onClick={() => setActiveIndex(idx)}
              className={cn('cslider__nav-item',activeIndex === idx ? 'active' : '')}
              >{titleSlug.title}</button>
            ))}
          </div>
        )}
        {contentArray.length > 1 && (
          <div className="card__content overflow-hidden relative">
            <div
              className={cn("cslider__content flex transition-transform duration-300 ease-in-out")}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {contentArray.map((content, idx) => {
                  if (Array.isArray(content)) {
                    return (
                      <ContentSlideCard
                        key={idx}
                        items={content} // contentはrepeatFields[]型であることを期待
                        className={cn(
                          "w-full object-cover flex-shrink-0 fade-in",
                          idx === activeIndex ? "fade-in-active" : ""
                        )}
                      />
                    );
                  }
                  return "No contentArray";
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
