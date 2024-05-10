import Logo from '@/assets/images/logo.png'
import { Image } from '@mantine/core'
export default function Banner(){
    return (
        <div className='w-11/12 h-5/6 item mx-auto mt-5 bg-[#C5DDFF] rounded-lg'>
            <Image src={Logo} radius="lg" h={600} fit="contain"/>
        </div>
    )
}