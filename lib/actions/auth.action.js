'use server';

import { db } from "@/firebase/admin";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";

export const signUp=async(params)=>{
    const {uid,email,name}=params;
    try {
        const userRecord=await db.collection("users").doc(uid).get();
        if(userRecord.exists){
            return {
                success:false,
                message:"User already exists. Please sign-in"
            }
        }
        await db.collection('users').doc(uid).set({
            name, email
        });
        return{
            success:true,
            message:"Account created successfully"
        }
        
    } catch (error) {
        console.log("Error while sign up :",error)
        if(error.code ==='auth/email-already-exists'){
            return ({
                success:false,
                message:"Email already in use"
            })
        }
        return {
            success:false,
            message:"Failed to create an account"
        }
    }

 
} 

export const signIn=async(params)=>{
    const {email,idToken}=params;
    try {
        const userRecord=await auth.getUserByEmail(email);
        if(!userRecord){
            return {
                success:false,
                message:"User does not exist. Please sign up"
            }
        }
        await setSessionCookie(idToken);

        
    } catch (error) {
         console.log(error);
         return {
            success:false,
            message:"Failed to sign-in"
         }
    }

}

export const setSessionCookie=async(idToken)=>{
   const cookieStore=await cookies();
   const sessionCookie=await auth.createSessionCookie(idToken,{
    expiresIn:60*60*24*7*1000
   })
   cookieStore.set("session",sessionCookie,{
    maxAge:60*60*24*7*1000,
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    path:"/",
    sameSite:"lax"
})
}

export const getCurrentUser=async()=>{

    const cookieStore=await cookies();
    const sessionCookie= cookieStore.get("session")?.value;
    if(!sessionCookie) return null;
    try {
        const decodedClaims=await auth.verifySessionCookie(sessionCookie,true);
        const userRecord=await db.collection("users").doc(decodedClaims.uid).get();
        if(!userRecord) return null;
        const User={
            ...userRecord.data(),
            id:userRecord.id
        }
        return User;

    } catch (error) {
        console.log(error);
        return null;
    }
   
}

export const isAuthenticated=async()=>{
    const user=await getCurrentUser();
    return !!user;
}