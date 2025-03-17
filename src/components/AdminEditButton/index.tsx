'use client'

import React, { useEffect, useState } from 'react'
import { EditIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'

const AdminEditButton = ({ type, id, isFixed = true }) => {
  const [role, setRole] = useState<String>('')

  useEffect(() => {
    fetch('/api/cookie')
      .then((res) => res.json())
      .then((data) => setRole(data.role))
  }, [])

  if (!role) return null

  if (role === 'editor' && type === 'pages') return null

  return (
    <div className={cn('z-50', isFixed ? 'fixed bottom-8 right-8' : 'absolute left-2 top-2')}>
      <Link target='_blank' href={`/admin/collections/${type}/${id}`}>
        <div className={cn("bg-primary bg-opacity-50 rounded-full w-fit", isFixed ? 'p-4' : 'p-2')}>
          <EditIcon color="white" className={cn(!isFixed && 'w-4 h-4')} />
        </div>
      </Link>
    </div>
  )
}

export default AdminEditButton
