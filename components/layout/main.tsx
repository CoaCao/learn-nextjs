import { LayoutProps } from '@/models/index'
import React from 'react'

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
