
import { SectionProps } from '@/types/SectionProps'
import React from 'react'

const AboutSection = ({className}:SectionProps) => {
  return (
    <section id="about" className={className}>
      <div className='grid grid-cols-2'>
        <div className="bg-[url('/assets/about.jpeg')] bg-center bg-no-repeat bg-cover"></div>
        <div className="p-24">
          <h1 className="mb-4">Welcome to <span className=" text-melba">Melba</span></h1>
          <div className='text-dark-500'>
            <p className='mb-4'>
              At Melba, our story is a delightful journey of passion and flavor.
              It all began with a love for crafting the perfect ice cream, blending tradition with innovation.
            </p>
            <p>
              With a commitment to excellence, we have built a community that cherishes every scoop.
              Join us on this gastronomic adventure, where every order is a chapter in our story—a story of taste,
              tradition, and the joy of sharing exceptional ice cream
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection