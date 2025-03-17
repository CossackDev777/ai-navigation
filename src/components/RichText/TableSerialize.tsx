"use client"
import React, { useEffect } from 'react'
import type {
  SerializedTableCellNode,
  SerializedTableNode,
  SerializedTableRowNode,
} from '@payloadcms/richtext-lexical'
import { serializeLexical } from './serialize' // 既存のserializeLexical関数をインポート
import { cn } from '@/utilities/cn'
import styles from './TableSerialize.module.scss'
import ScrollHint from 'scroll-hint'
import 'scroll-hint/css/scroll-hint.css'

export const TableSerialize = ({ node }: { node: SerializedTableNode }) => {
  useEffect(() => {
    // ScrollHintを初期化
    new ScrollHint('.scrollable-container');
  }, []);

  const children = node.children.map((childNode, index) => (
    <TableRowSerialize key={index} node={childNode as SerializedTableRowNode} />
  ))

  return (
    <div className="lexical-table-container scrollable-container mb-6" style={{ overflowX: 'auto' }}>
      <table className="lexical-table my-0 min-w-[600px] w-auto md:w-full" style={{ borderCollapse: 'collapse' }}>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

const TableRowSerialize = ({ node }: { node: SerializedTableRowNode }) => {
  const children = node.children.map((childNode, index) => (
    <TableCellSerialize key={index} node={childNode as SerializedTableCellNode} />
  ))

  return <tr className={cn("lexical-table-row", styles.table_tr)}>{children}</tr>
}

const TableCellSerialize = ({ node }: { node: SerializedTableCellNode }) => {
  const children = serializeLexical({ nodes: node.children as any }) // 型を適切にキャスト

  const TagName = node.headerState > 0 ? 'th' : 'td'
  const headerStateClass = `lexical-table-cell-header-${node.headerState}`
  const style = {
    backgroundColor: node.backgroundColor || undefined,
  }

  const colSpan = node.colSpan && node.colSpan > 1 ? node.colSpan : undefined
  const rowSpan = node.rowSpan && node.rowSpan > 1 ? node.rowSpan : undefined

  const Th = TagName === 'th'
  const Td = TagName === 'td'
  return (
    <TagName
      className={cn(
        'lexical-table-cell',
        headerStateClass,
        styles.table_cell,
        Th && styles.th,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={style}
    >
      {children}
    </TagName>
  )
}
