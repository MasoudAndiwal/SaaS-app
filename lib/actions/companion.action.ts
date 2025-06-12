'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formatData : CreateCompanion) => {
    const { userId : authid} = await auth();
    const supabase = createSupabaseClient();
    const { data , error } = await supabase.from('Companions').insert({...formatData , author : authid}).select();

    if(error || !data){
        throw new Error(error?.message || "Failed to create companion");
    }
    return data[0];
}