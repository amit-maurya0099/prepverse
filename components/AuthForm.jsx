"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const authFormSchema = (type) =>
    z.object({
      name: type === "sign-up" ? z.string().min(2,"Name must be of at least 2 characters") : z.string().optional(),
      email: z.string().email("Invalid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    });
   

const AuthForm = ({ type }) => {

   const router=useRouter();
     
    const formSchema = authFormSchema(type);
  

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: type === "sign-up" ? "" : undefined,
        email: "",
        password: "",
      },
    });
    useEffect(() => {
        if (Object.keys(form.formState.errors).length > 0) {
            Object.values(form.formState.errors).forEach((error) => {
                if (error?.message) {
                    toast.error(error.message);
                }
            });
        }
    }, [form.formState.errors]);
    

    const onSubmit = async (data) => {

        try {
          if (type === "sign-up") {
            const { name, email, password } = data;
            if (!email || !password || (type === "sign-up" && !name)) {
                toast.error("All fields are required!");
                return;
              }
    
            // const userCredential = await createUserWithEmailAndPassword(
            //   auth,
            //   email,
            //   password
            // );
    
            // const result = await signUp({
            //   uid: userCredential.user.uid,
            //   name: name!,
            //   email,
            //   password,
            // });
    
            // if (!result.success) {
            //   toast.error(result.message);
            //   return;
            // }
    
            toast.success("Account created successfully. Please sign in.");
            router.push("/sign-in");
          } else {
            const { email, password } = data;
    
            // const userCredential = await signInWithEmailAndPassword(
            //   auth,
            //   email,
            //   password
            // );
    
            // const idToken = await userCredential.user.getIdToken();
            // if (!idToken) {
            //   toast.error("Sign in Failed. Please try again.");
            //   return;
            // }
    
            // await signIn({
            //   email,
            //   idToken,
            // });
    
            toast.success("login successfull");
            router.push("/");
          }
        } catch (error) {
          console.log(error);
          toast.error(`There was an error: ${error}`);
        }
      };
    

    return (
        <div className="card-border lg:min-w-[400px]">
            <div className="flex flex-col gap-4 card py-14 px-10">
                <div className="flex  justify-center">
                    <img src="/logo.png" className="h-12" />
                </div>
                <h3 className="text-lg text-center font-semibold">Practice Job interviews with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-2 form">
                        {type === "sign-up" && 
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Enter your full name"
                                type="text"
                                
                            />}
                        <FormField
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                            /> 
                        <FormField
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your Password"
                                type="password"
                            /> 
                        <Button type="submit" className="btn">{type === "sign-in" ? "Sign in" : "Create an account"}</Button>
                    </form>
                </Form>
                <div className="flex max-sm:flex-col items-center justify-center gap-2">
                    <p className="max-sm:text-sm" >{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
                        <p className="text-cyan-400  font-bold max-sm:text-base ">{type === "sign-in" ? "Sign Up" : "Sign In"}
                        </p></Link>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
