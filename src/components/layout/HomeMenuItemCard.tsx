
import MenuItem from '@/types/MenuItem';
import { Button} from '@nextui-org/react'


const HomeMenuItemCard = ({menuItem}: {menuItem: MenuItem}) => {



    return (
      <div className='grid grid-cols-2 '>
        <div style={{ backgroundImage: `url(${menuItem.image})` }} className='bg-cover bg-center bg-no-repeat'></div>
        <div className="flex items-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3))" }}>
          <div className='flex flex-col gap-4 p-10'>
            <h3>{menuItem.name}</h3>
            <p className='text-gray-400 line-clamp-3'>{menuItem.description}</p>
            <div className='flex items-center gap-4'>
              <p className='text-primary'>
  
                ${(menuItem.basePrice as number).toFixed(2)}
              </p>
              <Button radius='none' size='sm' className='bg-transparent border hover:bg-primary hover:text-dark'>Order</Button>
            </div>
          </div>
        </div>
      </div>
    )
  
}

export default HomeMenuItemCard