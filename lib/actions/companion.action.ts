'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { fa } from "zod/v4/locales";

export const createCompanion = async (formatData : CreateCompanion) => {
    const { userId : authid} = await auth();
    const supabase = createSupabaseClient();
    const { data , error } = await supabase.from('Companions').insert({...formatData , author : authid}).select();

    if(error || !data){
        throw new Error(error?.message || "Failed to create companion");
    }
    return data[0];
}

// fetch the data 
export const getAllCompanions = async ({limit = 10 , page = 1 ,subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();
    let query = supabase.from('Companions').select();
    if(subject && topic){
        query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }else if(subject){
        query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }else if(topic){
        query = query.ilike('topic', `%${topic}%`).or(`name.ilike.%${topic}%`)
    }
    query = query.range((page - 1) * limit , page * limit);
    const { data: Companions , error} = await query;
    if(error){
        throw new Error(error?.message || "Failed to fetch companions");
    }
    return Companions;
}

// fetch the one data

export const getCompanion = async (id : string) =>{
    const supabase = createSupabaseClient();
    const { data , error } = await supabase.from('Companions').select().eq('id',id).single();
    if( error) throw new Error(error?.message || "Failed to fetch companion") 
        return data;
}
    // insert the companion id , user id into the session_history
export const addToSessionHistory = async (companionId : string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data , error } = await supabase.from('session_history').insert({
        user_id: userId , companion_id: companionId })

    if(error) throw new Error(error.message)
        return data ;   
}
    // getRecentSessions
export const getRecentSessions = async (limit = 10 ) => {
    const supabase = createSupabaseClient();
    const  {data , error } = await supabase.from('session_history').select(`Companions:companion_id (*)`).order('created_at' , {ascending: false})

    if(error) throw new Error(error.message)

    return data.map(({ Companions }) => Companions);
}
    // getUserSessionHistory
    export const getUserSession = async (userId: string,limit = 10 ) => {
        const supabase = createSupabaseClient();
        const  {data , error } = await supabase.from('session_history').select(`Companions:companion_id (*)`).order('created_at' , {ascending: false}).eq('user_id' , userId)
    
        if(error) throw new Error(error.message)
    
        return data.map(({ Companions }) => Companions);
    }