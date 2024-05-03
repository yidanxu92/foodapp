
import React from 'react'
import MenuItem from '@/types/MenuItem'
import HomeMenuItemCard from './HomeMenuItemCard'
import SectionHeader from './SectionHeader'
import { SectionProps } from '@/types/SectionProps'

const HomeMenu = ({ className }: SectionProps) => {
  const menuItems = [
    {
      _id: 1,
      name: "vanilla",
      description: "Classic vanilla ice cream.",
      image: "/assets/vanilla.png",
      basePrice: 5,
  
    },
    {
      _id: 2,
      name: "chocolate",
      description: "Delicious milk chocolate ice cream made with valhora chocolate.",
      image: "/assets/chocolate.png",
      basePrice: 5,

    },

    {
      _id: 3,
      name: "strawberry",
      description: "Fresh strawberry ice cream made with organic strawberries.",
      image: "/assets/strawberry.png",
      basePrice: 5,

    },


    // Add more menu items as needed
  ];



  return (
    <section className={className}>
      <SectionHeader
        header={'Flavors of Today'}
        description={'Check out our newest flavors!'}
      />
      <div className='grid md:grid-cols-3 md:gap-0 grid-cols-1 gap-4'>
        {menuItems && menuItems.map((menuItem, index) => (
          <HomeMenuItemCard key={menuItem._id} menuItem={menuItem} />
        ))}
      </div>
    </section>
  )
}

export default HomeMenu