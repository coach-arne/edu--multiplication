import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center">
      <div className="w-full max-w-2xl min-h-screen flex flex-col px-4 py-6">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
