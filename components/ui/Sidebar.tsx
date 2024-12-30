'use client'
import { sidebarLinks } from '@/constant'
import { cn } from '@/lib/utils'
//import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({user}: SiderbarProps) => {
    const pathname = usePathname();
  return (
    <section className="sidebar">
        <nav className='flex-col gap-4'>
        <Link href="/" className='mb-12 cursor-pointer flex items-center gap2'>
            <Image src="./icons/logo.svg" width={34} height={34} alt="Horizon logo" className='size-[24px] max-xl:size-14' />
            <h1 className='sidebar-logo'>DeChim</h1>
        </Link>
        {sidebarLinks.map((item) =>{
            const isActive =
            pathname === item.route || pathname.startsWith('${item.route}/')
            return(
                <Link href={item.route} key={item.label} className={cn('sidebar-link', {'bg-bank-gradient': isActive})}>
                    <div>
                        <Image src={item.imgURL}
                        alt={item.label} 
                        className={cn({'brighness-[3] invert-0': isActive})}
                        width={24} height={24} />
                    </div>
                    <p className={cn('sidebar-label', {'!text-white': isActive})}>
                        {item.label}
                    </p>
                 
                </Link>
            )
        })}
        USER
        </nav>
        FOOTER  
    </section>
  )
} 

export default Sidebar
