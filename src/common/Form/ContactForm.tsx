'use client'
import { Button, Input, Textarea } from "@nextui-org/react";
import { FormEvent,useState } from "react";


const ContactForm = () => {
    const[submit,setSubmit] = useState(false);
    const[email,setEmail]=useState('');

   return (
    <form className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-4">
            <Input 
            isRequired
            label="Name" 
            labelPlacement="outside"
            type="text" 
            placeholder=" " 
            />
        </div>  

        <div className="grid grid-cols-1 gap-4">
            <Input 
            isRequired
            label="Email" 
            labelPlacement="outside"
            type="email" 
            placeholder=" "
            />
            
        </div>

        <Textarea
            isRequired
            label="Message"
            labelPlacement="outside"
            placeholder="Type your message here"
            rows={5}
        />
        <div>
            <Button type="submit" radius="sm" size="md">Send Email</Button>
            <p className="text-gray-500 mt-3">We&apos;ll get back to you in 1-2 business days.</p>
            </div>
    </form>
   )
}

export default ContactForm  