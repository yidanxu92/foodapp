import Link from "next/link"
import { FaceBookIcon } from "@/icons/FaceBookIcon"
import { PhoneIcon } from "@/icons/PhoneIcon"
import { TwitterIcon } from "@/icons/TwitterIcon"
import { LocationIcon } from "@/icons/LocationIcon"

const Footer = () => {  
    return (
        <footer style={{ backgroundImage: 'url(./assets/bg_purple.png)' }} className='bg-cover bg-center bg-no-repeat'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mb-6 px-10 lg:px-48'>
                <div className="col-span-full lg:col-span-1 lg:block">
                <Link href="/" className='text-primary text-2xl font-josefin'>Melba</Link>
                <div className="mt-6 flex gap-6 text-gray-100">
                    <TwitterIcon className={"w-6"} />
                    <FaceBookIcon className={"w-6"} />  
                    <PhoneIcon className={"w-6"} />
                </div>
            </div>

            <div>
                <h4 className="uppercase text-green-300">About Us</h4>
                <p className="mt-6 text-blue-500">We make world class ice cream!</p>
            </div>

            <div>
                <h4 className="uppercase text-green-300">Opening Hours</h4>
                <p className="mt-6 text-blue-500">Thursday - Sunday</p>
                <p className="mt-2 text-blue-500">2:00pm - 8:00pm</p>
            </div>

            <div>
                <h4 className="uppercase text-green-300">Have a question?</h4>
                <div className="mt-6 text-blue-500">
                    <ul className="space-y-2">
                        <li className="inline-flex space-x-4">
                            <span><LocationIcon className={"w-6"} /></span>
                            <span>2685 Lawrenceville Rd, Lawrence Township, NJ</span>
                        </li>

                        <li className="inline-flex space-x-4">
                            <span><PhoneIcon className={"w-6"} /></span>
                            <span>(609) 512-4003</span>
                        </li>

                    </ul>
                </div>
            </div>
            </div>

            <div className="pt-5 border-t border-gray-700 text-center">
                <p className="mt-4 text-gray-200">Copyright &copy; {new Date().getFullYear()} All rights reserved</p>
                </div>

           
    

        </footer>
    )
}

export default Footer   
