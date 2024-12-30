"use client"
import React from 'react'
import Image from 'next/image'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { sidebarLinks } from '@/constant';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const MobileNav = ({user}: MobileNavProps) => {
  const pathname = usePathname();

  return (
  <section className="w-full max-w-[264px]">
    <Sheet>
      <SheetTrigger>
        <Image src="/icons/hamburger.svg" width={30} height={30} alt='menu' className="cursorpointer"/>
        </SheetTrigger>
        <SheetContent side="left" className='border-none bg-white'>
        <SheetHeader>
            <SheetTitle>Portal</SheetTitle>
            <SheetDescription>Hi, {user.firstName}</SheetDescription>
        <Link href="/" className='mb-12 cursor-pointer flex items-center gap-2'>
            <Image src="./icons/logo.svg" width={34} height={34} alt="Horizon logo" />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>DeChim</h1>
        </Link>
        </SheetHeader>
        <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                  {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                return (
                  <SheetClose asChild key={item.route}>
                    <Link href={item.route} key={item.label}
                      className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
                    >
                        <Image 
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            'brightness-[3] invert-0': isActive
                          })}
                        />
                      <p className={cn("text-16 font-semibold text-black-2", { "text-white": isActive })}>
                        {item.label}
                      </p>
                    </Link>
                  </SheetClose>
                )
              })}

              USER
              </nav>
            </SheetClose>
            FOOTER
          </div>        
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
