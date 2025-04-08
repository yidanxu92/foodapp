/**
 * Address Input Component
 * 
 * A reusable form component for handling address input fields.
 * Key features:
 * - Manages street address, city, state, country, and postal code inputs
 * - Supports disabled states for individual fields
 * - Handles value changes through props
 * - Provides consistent styling across the application
 * 
 * Used in both profile editing and checkout flows, with different
 * field restrictions based on context.
 */

import React from 'react'

interface AddressInputsProps {
  addressProps: {
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  setAddressProps: (propName: string, value: string) => void;
  disabled: {
    streetAddress?: boolean;
    city?: boolean;
    state?: boolean;
    country?: boolean;
    postalCode?: boolean;
  };
  context: 'cart' | 'checkout' | 'orders' | 'profile';
}

const AddressInputs = ({ addressProps, setAddressProps, disabled, context }: AddressInputsProps) => {
  return (
    <>
      {/* Street Address Input */}
      <div>
        <label>Street Address:{context === 'cart' && <span className="text-red-500">*</span>}</label>
        <input
          type="text"
          placeholder="Street address"
          value={addressProps.streetAddress || ''}
          onChange={(e) => setAddressProps('streetAddress', e.target.value)}
          disabled={context === 'orders'}
        
          className='input'
        />
      </div>

      {/* City and State Inputs */}
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label>City{context === 'cart' && <span className="text-red-500">*</span>}</label>
          <input 
            type="text" 
            value={addressProps.city || ''} 
            disabled={disabled.city}
            className='input' 
          />
        </div>
        <div>
          <label>State{context === 'cart' && <span className="text-red-500">*</span>}</label>
          <input 
            type="text" 
            value={addressProps.state || ''} 
            disabled={disabled.state}
            className='input' 
          />
        </div>
      </div>

      {/* Country and Postal Code Inputs */}
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label>Country{context === 'cart' && <span className="text-red-500">*</span>}</label>
          <input 
            type="text" 
            value={addressProps.country || ''} 
            disabled={disabled.country}
            className='input' 
          />
        </div>
        <div>
          <label>Postal code{context === 'cart' && <span className="text-red-500">*</span>}</label>
          <input 
            type="text" 
            value={addressProps.postalCode || ''} 
            disabled={disabled.postalCode}
            className='input' 
          />
        </div>
      </div>
    </>
  )
}

export default AddressInputs