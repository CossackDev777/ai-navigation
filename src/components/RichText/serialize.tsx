import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RelationshipFeature } from '@/blocks/RelationshipFeature/Component'
import { TableSerialize } from './TableSerialize'
import React, { Fragment, JSX } from 'react'
import { CMSLink } from '@/components/Link'
import { DefaultNodeTypes, SerializedBlockNode, SerializedTableCellNode, SerializedTableNode, SerializedTableRowNode} from '@payloadcms/richtext-lexical'
import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Post, Page } from '@/payload-types';

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import type {
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  RelationshipFeatureProps,
} from '@/payload-types'

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>
  | SerializedTableNode
  | SerializedTableRowNode
  | SerializedTableCellNode

type Props = {
  nodes: NodeTypes[]
}


export function serializeLexical({ nodes }: Props): JSX.Element {
  let h2Counter = 0;
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }
        if (node.type === 'table') {
          return <TableSerialize key={index} node={node as SerializedTableNode} />
        }
        if (node.type === 'relationship') {
          const { relationTo, value } = node;
          console.log('RelationPostData', value);
          if (relationTo === 'posts') {
            const post = value as Post;
            // console.log('Related Post in Serizalize:', post);
            return (
              <RelationshipFeature
                key={index}
                id={post?.id}
                title={post?.title}
                isFeature={post?.isFeature || false}
                slug={post?.slug || ''}
                relationTo={relationTo}
                type="relationship"
                value={post}
              />
            );
          } else if (relationTo === 'pages') {
            const page = value as Page;
            return (
              <RelationshipFeature
                key={index}
                id={page?.id}
                title={page?.title}
                isFeature={false} // PageにはisFeatureがないのでデフォルト値を使用
                slug={page?.slug || ''}
                relationTo={relationTo}
                type="relationship"
                value={page}
              />
            );
          }

        }
        if (node.type === 'text') {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        if (node.type === 'block') {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }

          switch (blockType) {
            case 'cta':
              return <CallToActionBlock key={index} {...block} />
            case 'mediaBlock':
              return (
                <MediaBlock
                  className="col-start-1 col-span-3"
                  imgClassName="m-0"
                  key={index}
                  {...block}
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                  disableInnerContainer={true}
                />
              )
            case 'banner':
              return <BannerBlock className="col-start-2 mb-4" key={index} {...block} />
            case 'code':
              return <CodeBlock className="col-start-2" key={index} {...block} />
            default:
              return null
          }
        } else {
          switch (node.type) {
            case 'linebreak': {
              return <br className="col-start-2" key={index} />
            }
            case 'paragraph': {
              return (
                <p className="col-start-2" key={index}>
                  {serializedChildren}
                </p>
              )
            }
            case 'heading': {
              const Tag = node?.tag
              if (Tag === 'h2') {
                h2Counter++;
              }
              return (
                <Tag
                  className={`col-start-2 ${
                    Tag === 'h1' ? 'posc__title posc__title_h1 text-post-h1 font-bold mb-6' :
                    Tag === 'h2' ? 'posc__title posc__title_h2 text-post-h2 font-bold mb-6' :
                    Tag === 'h3' ? 'posc__title posc__title_h3 text-post-h3 font-bold mb-4' :
                    Tag === 'h4' ? 'posc__title posc__title_h4 text-post-h4 font-bold mb-3' : ''
                  }`}
                  key={index}
                  id={Tag === 'h2' ? `section-${h2Counter}` : undefined}
                >
                  <span className="prf"></span>{serializedChildren}
                </Tag>
              )
            }
            case 'list': {
              const Tag = node?.tag
              const listType = node?.listType // 'bullet', 'number', 'check'
              return (
                <Tag
                className={cn(
                  "list col-start-2",
                  listType === 'check' ? 'list-check' : '',
                  listType === 'number' ? 'list-number' : '',
                  listType === 'bullet' ? 'list-bullet' : ''
                  )}
                  key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case 'listitem': {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? 'true' : 'false'}
                    className={` ${node.checked ? '' : ''}`}
                    key={index}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                )
              } else {
                return (
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                )
              }
            }
            case 'quote': {
              return (
                <blockquote className="col-start-2" key={index}>
                  {serializedChildren}
                </blockquote>
              )
            }
            case 'link': {
              const fields = node.fields

              return (
                <CMSLink
                  key={index}
                  newTab={Boolean(fields?.newTab)}
                  reference={fields.doc as any}
                  type={fields.linkType === 'internal' ? 'reference' : 'custom'}
                  url={fields.url}
                >
                  {serializedChildren}
                </CMSLink>
              )
            }

            default:
              return null
          }
        }
      })}
    </Fragment>
  )
}
