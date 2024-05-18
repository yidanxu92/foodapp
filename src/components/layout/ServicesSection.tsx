'use client'

import { SectionProps } from "@/types/SectionProps"
import { motion } from "framer-motion";

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
                            <motion.span
                                initial={{ rotate:0}}
                                whileHover={{rotate:225, transition:{duration:1,ease:'easeInOut'}}}
                                className='w-[100px]h-[100px] border border-dark/20 flex justify-center items-center hover:bg-light relative'>
                                    </motion.span>  
                                    <span className='absolute'>Option 1</span>
                                    </div>

                                    <h3 className='uppercase mb-4'>Scoops</h3>
                                    <div>Two scoops of ice cream on a waffle cone</div>
                                    </div>

                                    <div className='flex flex-col gap-3 text-center p-6'>
                                        <div className="flex items-center text-center justify-center mb-5">
                                            <motion.span
                                                initial={{ rotate:0}}
                                                whileHover={{rotate:225, transition:{duration:1,ease:'easeInOut'}}}
                                                className='w-[100px]h-[100px] border border-dark/20 flex justify-center items-center hover:bg-light relative'>
                                                    </motion.span>  
                                                    <span className='absolute'>Option 2</span>
                                                    </div>
                                                    <h3 className='uppercase mb-4'>Ice cream flight</h3>
                                                    <div>Our ice cream flights let you enjoy four fabulicious flavors all at once</div>
                                                    </div>

                                                    <div className='flex flex-col gap-3 text-center p-6'>
                                                        <div className="flex items-center text-center justify-center mb-5">
                                                            <motion.span
                                                                initial={{ rotate:0}}
                                                                whileHover={{rotate:225, transition:{duration:1,ease:'easeInOut'}}}
                                                                className='w-[100px]h-[100px] border border-dark/20 flex justify-center items-center hover:bg-light relative'>
                                                                    </motion.span>  
                                                                    <span className='absolute'>Option 3</span>
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