import {Input} from "@nextui-org/react";
import {useState} from "react";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";

interface PasswordInputProps{
    passwordValue:string;
    setPassword:(password:string)=>void;
    disabled:boolean;
    className?:string;  
}

const PasswordInput =({passwordValue,setPassword,disabled,className}:PasswordInputProps)=>{ 
    const[isVisible,setIsVisible]=useState(false);
    return(
        <Input
            isRequired
            label = 'Password'
            labelPlacement='outside'
            placeholder='Enter your password'
            type={isVisible ? 'text' : 'password'}
            size='lg'
            value={passwordValue}
            onChange={(e)=>setPassword(e.target.value)}
            isDisabled={disabled}
            className={className}
            classNames={{label:"pl-3"}}
            endContent={
                <div
                className="w-6 place-self-center cursor-pointer"
                onClick={()=>setIsVisible(!isVisible)}>
                {isVisible?(
                    <EyeSlashFilledIcon className="w-full" />
                ):(
                    <EyeFilledIcon className="w-full" />
                )}
                </div>
            }
            />
    )

        }
        
export default PasswordInput