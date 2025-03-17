'use client'

import { Button } from '@payloadcms/ui'
import { signin } from 'payload-auth-plugin/client'
import React from 'react'

const AfterLogin: React.FC = () => {
  return (
    <Button onClick={() => signin('google')} type="button">
      Sign in with Google
    </Button>
  )
}

export default AfterLogin
