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
    if( error){
        throw new Error(error?.message || "Failed to fetch companion");
    }
    return data;
}