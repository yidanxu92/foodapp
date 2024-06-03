"use client";
import GoogleIcon from "@/icons/GoogleIcon";
import {Button, Link } from "@nextui-org/react";
import Divider from '@mui/material/Divider';
import {FormEvent, useState } from "react";
import EmailInput from "@/common/form/EmailInput";
import PasswordInput from "@/common/form/PasswordInput";  
import { useRouter } from "next/navigation";
import ModalContainer from "@/common/ModalContainer";



const LoginPage=()=>{  
    const router = useRouter(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [error, setError] = useState(''); 
    const [creatingUser, setCreatingUser] = useState(false);   



    return(
        <section className="pt-12 pb-20">
            <h1 className="text-center text-dark text-4xl my-4">
                Login
            </h1>
            <form className="flex flex-col gap-2 max-w-lg mx-auto mt-12">
                <EmailInput emailValue={email} setEmail={setEmail} disabled={creatingUser} className={"mb-4"} />
                <PasswordInput passwordValue={password} disabled={creatingUser} setPassword={setPassword} />
                <div className="text-danger my-2">{error}</div>
                <Button type="submit" color="primary" fullWidth isLoading={creatingUser} isDisabled={creatingUser}
                className='font-semibold'> Login</Button> 
                <div className="text-center mt-4 text-gray-400">
                Doesn't have an account?{' '}   
                <Link href="/register" isDisabled={creatingUser} className="text-dark">
                    Sign up
                </Link> 
                </div>

                <div className="flex items-center my-3">
                    <Divider className="flex-grow" />
                    <span className="px-2 text-gray-400">OR</span>
                    <Divider className="flex-grow" />
                </div>  

                <Button fullWidth disabled={creatingUser} onClick={()=>signIn('google', {callbackUrl:"/"})}
                className="font-semibold text-dark bg-white border border-black" startContent={<GoogleIcon className={"w-6"}/>}>
                    Sign up with Google 
                </Button>
                
                </form>
            
        </section>

    )
}   

export default LoginPage