import Link from "next/link";
import Image from "next/image";
import {UserButton} from "@/features/auth/components/user-button";

interface StandAloneLayoutProps{
    children:React.ReactNode;
}

const StandAloneLayout =({children} : StandAloneLayoutProps) => {
    return(
        <main className="bg-neutral-100 min-h-screen ">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center h-[73px]">
                    <Link href="/">
                        <Image src="/logoipsum-222.svg" height={300} width={170} alt="logo" />
                    </Link>
                    <UserButton/>
                </nav>
                <div className="flex flex-col items-center justify-center py-4">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default StandAloneLayout;