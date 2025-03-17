import React from 'react';
import type { ArchiveBlock as ArchiveBlockProps, CaseStudies, Post, SliderBlock as SliderBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cn } from "@/utilities/cn"
import { SliderComponent } from "@/components/CollectionSlider"

export const SliderBlock: React.FC<
  SliderBlockProps & {
    id?: string
  }
> = async (props) => {

  const {
    richTitle,
    caption,
    id,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    className
  } = props

  // console.log('SliderBlock props:', props)

  const limit = limitFromProps || 3

  let posts: CaseStudies[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })


    const fetchedPosts = await payload.find({
      collection: 'cases',
      depth: 1,
      limit,
    })
    posts = fetchedPosts.docs
    console.log('Case Studies Posts:', posts)
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as CaseStudies[]

      posts = filteredSelectedPosts
    }
  }

  return <SliderComponent richTitle={richTitle} caption={caption} cases={posts} blockType='slider' />;
};
