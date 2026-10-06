import ClassLayoutComponent from '@/features/class/class-layout'

import type { ReactNode } from 'react'

const ClassLayout = async ({ children, params }: { children: ReactNode, params: Promise<{id: string}> }) => {
  const {id} = await params; 
    
  return <ClassLayoutComponent id={id}>{children}</ClassLayoutComponent>
}

export default ClassLayout
