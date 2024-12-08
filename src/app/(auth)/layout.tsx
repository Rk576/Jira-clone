"use client"
import React from "react";
import Link from "next/link"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}:AuthLayoutProps) => {
    const pathName=usePathname();
    return (
        <div className="bg-neutral-100 min-h-screen ">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Image src="/jiralogo.png" height={50 } width={50} alt="logo" />
                    <Button asChild variant="secondary">
                        <Link href={pathName==="/sign-in" ? "/sign-up" : "/sign-in"}>
                        {pathName==="/sign-in" ? "Sign Up" : "Login"}
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
                {children}
                </div>
            </div>

        </div>
    );
}
export default AuthLayout;