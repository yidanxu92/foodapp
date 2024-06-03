import ContactForm from '@/common/form/ContactForm'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='py-20 container'>
      <div className="grid grid-cols-2">
        <div className="container flex flex-col gap-8">
          <h1 className='mb-4 text-dark'>Contact Information</h1>
          <p >Address: <span className='text-gray-500'>2685 Lawrenceville Rd,Lawrenceville,NJ,08648</span></p>
          <p>Phone: <span className='text-gray-500'>(609) 512 4003</span></p>
          <p>Email: <span className='text-gray-500'>info@melba.com</span></p>
          <p>Business Hours: <span className='text-gray-500'>Thursday-Sunday 2:00pm - 8:00pm</span></p>
        </div>
        <div className='container'>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ContactPage