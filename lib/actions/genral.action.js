import { db } from "@/firebase/admin";


export const getInterviewsByUserId=async(userId)=>{
    const interviews=await db.collection("interviews").where('userId','==', userId).orderBy('createdAt','desc').get() ;
    return interviews.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    })) ;
 };

 export const getLatestInterviews=async(params)=>{
     const {userId,limit=20}=params;
        
     const interviews = await db
     .collection("interviews")
     .orderBy("createdAt", "desc")
     .where("finalized", "==", true)
     .where("userId", "!=", userId)
     .limit(limit)
     .get();

       
     return interviews.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    })) ;

 }