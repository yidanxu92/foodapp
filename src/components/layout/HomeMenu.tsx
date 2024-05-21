
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

    {
      _id: 4,
      name:"Matcha",
      description:"Green tea ice cream made with organic matcha powder.",
      image:"/assets/matcha.png",
      basePrice:5,
    },

    {
      _id: 5,
      name:"Mango",
      description:"Tropical mango ice cream made with fresh mangoes.",
      image:"/assets/mango.png",
      basePrice:5,
    },

    {
      _id: 6,
      name:"Coffee",
      description:"Rich coffee ice cream made with organic coffee beans.",
      image:"/assets/coffee.png",
      basePrice:5,
    }


    
  ];



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