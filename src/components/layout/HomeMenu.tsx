'use client'
import React ,{ useEffect, useState }from 'react'
import MenuItem from '@/types/MenuItem'
import HomeMenuItemCard from './HomeMenuItemCard'
import SectionHeader from './SectionHeader'
import { SectionProps } from '@/types/SectionProps'

const HomeMenu = ({ className }: SectionProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    fetch("/api/menu-items")
    .then(res => res.json())
    .then(menuItems => setMenuItems(menuItems.slice(0,6)))
  }, [])

  return (
    <section className={className}>
      <SectionHeader
        header={'Flavors of Today'}
        description={'Check out our newest flavors! All Flavors Available by the Pint - $5 per Pint!'}
      />
      <div className='grid md:grid-cols-3 md:gap-0 grid-cols-1 gap-4'>
        {menuItems.map((menuItem, index) =>{
          return <HomeMenuItemCard key={menuItem._id} menuItem={menuItem} index={index} />
})}
      </div>
    </section>
  )
}

export default HomeMenu