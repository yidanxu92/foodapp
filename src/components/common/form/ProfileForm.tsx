import React, { FormEvent, useState } from 'react'
import ImageUploader from '../ImageUploader'
import { Avatar, Button, Checkbox } from '@nextui-org/react'
import { PencilIcon } from '@/icons/PencilIcon'
import UserProfile from '@/types/UserProfile'
import { useProfile } from '@/components/hooks/useProfile'
import AddressInputs from './AddressInputs'

interface ProfileFormProps {
  user: UserProfile | null,
  onSave: (event: FormEvent<HTMLFormElement>, data: UserProfile) => void
}

const ProfileForm = ({ user, onSave }: ProfileFormProps) => {

  const [userName, setUserName] = useState(user?.name || '');
  const [userImage, setUserImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [city, setCity] = useState(user?.city || '');
  const [state, setState] = useState(user?.state || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [country, setCountry] = useState(user?.country || '');
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName: string, value: string): void {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'city') setCity(value);
    if (propName === 'state') setState(value);
    if (propName === 'country') setCountry(value);
    if (propName === 'postalCode') setPostalCode(value);
  }

  return (
    <div className='grid grid-cols-6 gap-4'>
      <div className='col-span-2'>
        <ImageUploader setImageLink={setUserImage}>
          <div className='relative'>
            {userImage ? (
              <Avatar 
                src={userImage} 
                className="w-[160px] h-[160px]" 
                onError={() => console.error('Avatar image failed to load:', userImage)}
              />
            ) : (
              <Avatar src='' showFallback className="w-[160px] h-[160px]" />
            )}
            <div className='bg-primary text-dark rounded-full p-2 absolute right-11 bottom-6 hover:text-white'>
              <PencilIcon className={'w-5'} />
            </div>
          </div>
        </ImageUploader >
      </div>
      <form className='col-span-4' onSubmit={(e) => onSave(e, { 
        name: userName, 
        email: user?.email || '',
        image: userImage, 
        phone, 
        streetAddress, 
        postalCode, 
        city, 
        state, 
        country, 
        isAdmin 
      })}>
        <label> Full name</label>
        <input type="text" placeholder='Full name' value={userName ?? ''} onChange={e => setUserName(e.target.value)} className='input' />
        <label> Email</label>
        <input type="email" placeholder="Email" value={user?.email ?? ''} disabled className='input' />
        <label> Phone</label>
        <input type="text" placeholder="Phone" value={phone ?? ''} onChange={e => setPhone(e.target.value)} className='input' />
        <AddressInputs
          addressProps={{ streetAddress, city, state, country, postalCode }}
          setAddressProps={(propName: string, value: string) => handleAddressChange(propName, value)}
          disabled={{
            streetAddress: false,
            city: false,
            state: false,
            country: false,
            postalCode: false
          }}
          context="profile"
        />
        {loggedInUserData?.isAdmin && (
          <div className='my-2'>
            <Checkbox checked={isAdmin} defaultSelected={isAdmin} value={'1'} onChange={(e) => setIsAdmin(e.target.checked)}>Admin</Checkbox>
          </div>
        )}
        <Button type='submit' className='mt-2 font-semibold hover:text-white' fullWidth >Save All Changes</Button>
      </form>
    </div>
  )
}

export default ProfileForm