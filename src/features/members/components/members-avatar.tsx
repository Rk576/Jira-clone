import {cn} from "@/lib/utils";
import {Avatar , AvatarFallback} from "@/components/ui/avatar";

interface MemberAvatarProps {
    className?:string;
    name:string;
    fallbackClassName?:string;
}

export const MemberAvatar = ({className,name,fallbackClassName}:MemberAvatarProps) => {

    return(
        <Avatar className={cn("size-5 transition border border-neutral-300 rounded-full" , className)}>
            <AvatarFallback className={cn(
                "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
                fallbackClassName
            )}>
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}