import Link from "next/link";
import Image from "next/image";
import {DottedSeparator} from "@/components/dotted-separator";
import {Navigation} from "@/components/navigation";
import {WorkSpaceSwitcher} from "@/components/WorkSpaceSwitcher";

export const Sidebar = ()=>{
return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
        <Link href="/">
            <Image src="/logoipsum-222.svg" alt="logo" width={164} height={48} />
        </Link>
        <DottedSeparator className="my-4"/>
        <WorkSpaceSwitcher/>
        <DottedSeparator className="my-4"/>
        <Navigation/>
    </aside>
)
}
export default Sidebar;