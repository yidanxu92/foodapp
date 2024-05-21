'use client'
import { SectionProps } from "@/types/SectionProps";
import Map from "../../common/Map";
import ContactForm from "../../common/Form/ContactForm";



const ContactSection =({className}:SectionProps) => {
    return(
        <section id="contact"  className={`bg-[url('/assets/bg_beige.png')] bg-repeat text-dark ${className}`}>
            <div className="grid grid-cols-2">
                <div className="flex flex-col justify-center items-center gap-5">
                    <Map /> 
                </div>
                <div className="container py-20 max-w-4xl">
                    <div className="text-center mb-10">
                        <h1 className="mb-2">Contact Us</h1>
                        <p className="text-gray-500">We&apos;d love to talk about how we can help you.</p>
                        <ContactForm />
                        </div>

                        </div>
                        </div>
                        </section>

    )
   
}

export default ContactSection