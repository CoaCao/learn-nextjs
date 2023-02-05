import { LayoutProps } from '@/models/index'

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
