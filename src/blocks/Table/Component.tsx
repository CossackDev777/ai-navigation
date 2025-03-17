import React from 'react'
import type { TableBlock as TableBlockType } from '@/payload-types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RichText from '@/components/RichText'

export type Props = TableBlockType & {
  className?: string
}
export const TableBlock: React.FC<Props> = (props) => {
  const {
    rows,
    className
  } = props

  return (
    <Table className={className}>
      <TableBody>
        {props.rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.label}</TableCell>
            <TableCell>
              {row.value && <RichText content={row.value} enableGutter={false} enableProse={false} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
