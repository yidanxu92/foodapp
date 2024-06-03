import { UserIcon } from "@/icons/UserIcon";   
import { Input } from "@nextui-org/react";

interface NameInputProps{   
    nameValue:string;
    setName:(name:string)=>void;
    disabled:boolean;
    className?:string;  
}

const NameInput =({nameValue,setName,disabled,className}:NameInputProps)=>{
    return(
        <Input
            isRequired
            label='Name'
            labelPlacement='outside'
            placeholder='Enter your name'
            size='lg'
            value={nameValue}
            onChange={(e)=>setName(e.target.value)}
            isDisabled={disabled}
            className={className}
            classNames={{label:"pl-3"}}
            startContent={<UserIcon className="w-6 place-self-center" />}
        />
    )
}

export default NameInput
