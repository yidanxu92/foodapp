import {MailIcon} from "@/icons/MailIcon";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, {useMemo} from 'react'

interface EmailInputProps { 
    emailValue:string;
    setEmail:(email:string)=>void;  
    disabled:boolean;  
    className?:string;  
}

const EmailInput =({emailValue,setEmail,disabled,className}:EmailInputProps)=>{
    const validateEmail = (email:string)=>{ 
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const isInvalid = useMemo(()=> {
        if (emailValue === '') return false;
        return !validateEmail(emailValue);
    },[emailValue]);

    return(
            <Input
            isRequired
            label = 'Email'
            labelPlacement='outside'
            placeholder='Enter your email'
            type='email'
            size='lg'
            value={emailValue}
            onChange={(e)=>setEmail(e.target.value)}
            isDisabled={disabled}
            className={className}
            classNames={{label:"pl-3"}}
            errorMessage={isInvalid ? "Please enter a valid email":""}
            endContent={
                <MailIcon
                className={`w-6 place-self-center ${isInvalid ? "stroke-red-500" : ""}`} />
            }
          />           
    )
}

export default EmailInput