"use client"

import { AppSidebar } from '@/components/app-sidebar'
import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar'

import type {SidebarLinks} from '@/components/nav-main'
import type { ReactNode } from 'react'
import {HomeIcon} from 'lucide-react'

type ClassLayoutProps = {
  children: ReactNode;
  id: string;
}

const ClassLayout = ({ children, id }: ClassLayoutProps) => {
  const sidebarLinks: SidebarLinks = [
    {label: "Home", url: `/class/${id}`, icon: HomeIcon}
  ]


  return <SidebarProvider>
    <AppSidebar links={sidebarLinks} />

    <SidebarInset>
      {children}
    </SidebarInset>
  </SidebarProvider>
}

export default ClassLayout
