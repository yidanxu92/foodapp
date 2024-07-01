'use client'
import { Button, Input, Textarea } from "@nextui-org/react";
import { FormEvent,useRef,useMemo,useState } from "react";
import emailjs from '@emailjs/browser' 
import toast from 'react-hot-toast';


const ContactForm = () => {
    const[submit,setSubmit] = useState(false);
    const[email,setEmail]=useState('');
    const validateEmail = (email: string) => {
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
      };

    //useMemo is used to memoize the result of a function
    const isInvalid = useMemo(() => {
        if (email === '') return false;
        return validateEmail(email) ? false : true;
      }, [email]);

      const form = useRef<HTMLFormElement>();

      const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmit(true);
      
        try {
          const result = await emailjs.sendForm(
            'service_pxjcido',
            'template_0z3l7zr',
            form.current as HTMLFormElement,
            '6w57IChQXVAKB8j_x'
          );
      
          if (result.status === 200) {
            toast.success("Email sent successfully!");
            form.current?.reset(); // 重置表单
          } else {
            throw new Error("Failed to send email");
          }
        } catch (error) {
          toast.error("Error sending email");
          console.error("Error sending email:", error);
        } finally {
          setSubmit(false);
        }
      };
    

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
            isInvalid={isInvalid}
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            errorMessage={isInvalid && "Please enter a valid email address"}
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
            <Button type="submit" radius="sm" size="md" isLoading={submit}>Send Email</Button>
            <p className="text-gray-500 mt-3">We&apos;ll get back to you in 1-2 business days.</p>
            </div>
    </form>
   )
}

export default ContactForm  