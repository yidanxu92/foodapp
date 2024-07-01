//这个register页面的主要目的是收集用户的注册信息，然后将其发送到服务器以创建新用户。
//这里用到了 useref，以方便递交成功清零的时候可以一键清空

'use client';
import GoogleIcon from "@/icons/GoogleIcon";
import { Button, Link } from "@nextui-org/react";
import Divider from '@mui/material/Divider';    
import { FormEvent, useState, useRef } from "react";
import EmailInput from "@/components/common/form/EmailInput";
import PasswordInput from "@/components/common/form/PasswordInput";
import NameInput from "@/components/common/form/NameInput";
import { useRouter } from "next/navigation";
import ModalContainer from "@/components/common/ModalContainer";
import { signIn} from "next-auth/react";
import {useEffect} from "react";

const RegisterPage = () => {    
    const [name,setName]=useState('');  
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');   
    const [error, setError] = useState(''); 
    const [userCreated,setUserCreated]=useState(false);  
    const [creatingUser, setCreatingUser] = useState(false);   
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

     // 添加 console.log 语句来跟踪 isOpen 和 userCreated 状态变化
     useEffect(() => {
        console.log('isOpen changed:', userCreated);
    }, [userCreated]); // 当 userCreated 状态变化时触发
    
    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setCreatingUser(true);
        setError('');

        try{
            const response = await fetch(`/api/register`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
              })

              // 打印响应的原始内容
              /*const text = await response.text();
              console.log('Response text:', text);
              
              const data = JSON.parse(text);*/

              const data = await response.json();

              if (response.ok) {
                setUserCreated(true);
                formRef.current?.reset(); // 重置表单
                // 重置状态
                setName('');
                setEmail('');
                setPassword('');
              } else {
                setError(data.message);
              }
            } catch (error) {
              console.error('Error:', error);
              setError('An unexpected error occurred.');
            } finally {
              setCreatingUser(false);
            }

        }


     /*   const response = await fetch(`/api/register`, {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json());*/


   /*     if (response.error) {
          setError(response.message);
        } else {
          setUserCreated(true);
        }
        setCreatingUser(false);
      }*/
    

    
    return(
        <section className="pt-12 pb-20">
            <h1 className="text-center text-dark text-4xl my-4">
                Sign up
            </h1>
            <form className="flex flex-col gap-2 max-w-lg mx-auto mt-12" onSubmit={handleFormSubmit}>
                <NameInput nameValue={name} setName={setName} disabled={creatingUser} className={"mb-4"}/>
                <EmailInput emailValue={email} setEmail={setEmail} disabled={creatingUser} className={"mb-4"} />
                <PasswordInput passwordValue={password} setPassword={setPassword} disabled={creatingUser} />
                <div className="text-danger my-2">{error}</div>
                <Button type="submit" color="primary" fullWidth isLoading={creatingUser} isDisabled={creatingUser}
                className='font-semibold'> Sign up</Button> 
               <div className="text-center mt-4 text-gray-400">
                Already have an account?{' '}   
                <Link href="/login" isDisabled={creatingUser} className="text-dark">
                    Login
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

                <ModalContainer
                isOpen={userCreated}   
                title={"Account created successfully"}  
                content={"Your account has been created successfully. You can now login with your email and password."}  
                confirmText={"OK"}
                onConfirm={()=>setUserCreated(false)}
                closeText="Login"
                onClose={()=>router.push('/login')} 
                />
        </section>  
    )
}

export default RegisterPage


        
             



