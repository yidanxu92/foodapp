'use client'

import { SectionProps } from "@/types/SectionProps"
import Image from "next/image";

const ServicesSection = ({className}:SectionProps) => {
    return(
        <section className={`bg-[url('/assets/bg_green.png')] bg-repeat text-dark ${className}`}>
            <div className='container py-12'>
                <div className='container max-w-4xl text-center mb-10'>
                    <h1 className="font-semibold mb-4">Our Services</h1>
                    <p>
                        What we can do for you
                        </p>
                </div>

                <div className='grid grid-cols-3 gap-6'>
                    <div className='flex flex-col gap-3 text-center p-6'>
                        <div className="flex items-center text-center justify-center mb-5">
                        <Image src="/assets/option_1.png" alt="option1" width={100} height={100} layout="responsive"/>
                        </div>
                        <h3 className='uppercase mb-4'>Scoops</h3>
                        <div>Two scoops of ice cream on a waffle cone</div>
                        </div>
                        
                        <div className='flex flex-col gap-3 text-center p-6'>
                            <div className="flex items-center text-center justify-center mb-5">
                                <Image src="/assets/option_2.png" alt="option2" width={100} height={100} layout="responsive"/>
                                </div>
                                <h3 className='uppercase mb-4'>Ice cream flight</h3>
                                <div>Our ice cream flights let you enjoy four fabulicious flavors all at once</div>
                                </div>
                                
                                <div className='flex flex-col gap-3 text-center p-6'>
                                    <div className="flex items-center text-center justify-center mb-5">
                                        <Image src="/assets/option_3.png" alt="option3" width={100} height={100} layout="responsive"/>
                                        </div>
                                        <h3 className='uppercase mb-4'>Milkshake</h3>
                                        <div>A large size malted milkshake</div>
                                        </div>
                                        </div>
                                        </div>
                                        </section>









            
    )
}
export default ServicesSection