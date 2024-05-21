
import MenuItem from '@/types/MenuItem';
import { Button} from '@nextui-org/react'

interface HomeMenuItemCardProps {
  menuItem: MenuItem;
  index: number;
}

const HomeMenuItemCard = ({ menuItem, index }: HomeMenuItemCardProps) => {
  const isLeftAligned = index % 6 < 3;
  return (
  <div className='grid grid-cols-2'>
    {isLeftAligned && (
    <div style={{ backgroundImage: `url(${menuItem.image})` }} className='bg-cover bg-center bg-no-repeat'></div>
    )}
    
    <div className="flex items-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1))" }}>
        <div className={`flex flex-col gap-4 p-10 ${isLeftAligned ? '' : 'text-end'}`}>
            <h3>{ menuItem.name}</h3>
            <p className='text-gray-700 line-clamp-3'>{menuItem.description}</p>
            <div className={`flex items-center gap-4 ${isLeftAligned ? '' : 'justify-end'}`}>
              <p className='text-dark'>
                ${(menuItem.basePrice as number).toFixed(2)}
              </p>
              <Button radius='none' size='sm' className='bg-transparent border hover:bg-primary hover:text-dark'>Order</Button>
            </div>
          </div>
        </div>
        {!isLeftAligned && (
          <div style={{ backgroundImage: `url(${menuItem.image})` }} className='bg-cover bg-center bg-no-repeat'></div>
  )}
  </div>
  )
  
}

export default HomeMenuItemCard