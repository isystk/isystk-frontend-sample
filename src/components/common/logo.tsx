import React from 'react'
import Link from 'next/link'
import { URL } from '@/common/constants/url'

const Logo: React.FC = () => {
  return (
    <div className="header-logo">
      <Link href={URL.HOME}>
        <a>Isystk&apos;s Frontend Sample</a>
      </Link>
    </div>
  )
}

export default Logo
