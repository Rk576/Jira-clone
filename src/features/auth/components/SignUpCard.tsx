"use client"
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form,FormControl,FormField,FormItem,FormMessage } from "@/components/ui/form"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {registerSchema} from "@/features/auth/schemas";
import {useRegister} from "@/features/auth/api/use-register";
import {signUpWithGithub, signUpWithGoogle} from "@/lib/oauth";



const SignUpCard=()=>{
    const form=useForm<z.infer<typeof registerSchema>>({
        resolver:zodResolver(registerSchema),
        defaultValues:{name:"",email:"",password:"",},
    });
    const {mutate , isPending}=useRegister();
    const onSubmit = (values:z.infer<typeof registerSchema>)=>{
        mutate({json:values});
    }
    return(
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Sign Up
                </CardTitle>
                <CardDescription className="">
                    By signing up, you agree to our{" "}
                    <Link href="/">
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link>{" "}
                    and{" "}
                    <Link href="/">
                        <span className="text-blue-700">Terms Of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter your email address"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        <Button disabled={isPending} size="lg" className="w-full ">Register</Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7 mb-7">
                <DottedSeparator/>
            </div>
            <CardContent className="px-7 flex flex-col gap-y-4">
                <Button onClick={()=>signUpWithGoogle()} variant="secondary" size="lg" className="w-full " disabled={isPending}>
                    <FcGoogle className="mr-2 size-5"/>
                    Login with Google
                </Button>
                <Button onClick={()=>signUpWithGithub()} variant="secondary" size="lg" className="w-full " disabled={isPending}>
                    <FaGithub className="mr-2 size-5"/>
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700">
                           {" "} Sign In
                        </span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}
export default SignUpCard;