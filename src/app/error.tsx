"use client"

import {AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = ()=>{
    return(
        <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
            <AlertTriangle className="size-5"/>
            <p className="text-sm ">
                    Chud gaye guru
            </p>
            <Button variant="secondary" size="sm">
                <Link href="/">
                    Lamba saas le bidu
                </Link>
            </Button>
        </div>
    )
}

export default ErrorPage;