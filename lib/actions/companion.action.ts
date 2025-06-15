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
    // get the all companion for the My Journey page 
    export const getUserCompanion = async (userId: string) => {
        const supabase = createSupabaseClient();
      
        const { data, error } = await supabase
          .from('Companions')
          .select('*') // بهتره مشخص کنی که کدام ستون‌ها را می‌خواهی
          .eq('author', userId);
      
        if (error) {
          console.error('Supabase error:', error); // برای دیباگ بهتر
          throw new Error(error.message);
        }
      
        return data;
      };
      

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

// -------------------------------------------------------------------------------------------------------
export const newCompanionPermissions = async () => {
    const { userId , has } = await auth()
    const supabase = createSupabaseClient();
    let limit = 0;
    if(has({ plan: 'pro'})){
        return true;
    }else if(has({ feature: '3_companion_limit' })){
        limit = 3 ;
    }else if(has({ feature: '10_companion_limit' })){
        limit = 10 ;
    }
    const { data , error } = await supabase.from('Companions').select('id' , {count: 'exact'}).eq('author', userId);
    
    if(error) throw new Error(error.message);
    const companionCount = data?.length

    if(companionCount >= limit){
        return false
    }else{
        return true
    }
}
// insert the Saved Companion in supabase 

export const saveCompanion = async (companionId : string) => {
    const { userId } = await auth()
    const supabase = createSupabaseClient()
    const { data , error } = await supabase.from('save_Companion').insert({userid : userId , companionid : companionId})
    if(error) throw new Error(error.message) 
    return data
}

// select the all rows on save_Companion
export const getSavedCompanion = async (uid?: string) => {
    const { userId: authId } = await auth();
    const userId = uid || authId;
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('save_Companion')
        .select(`Companions:companionid(*)`)
        .eq('userid', userId);

    if (error) throw new Error(error.message);

    // Map to actual companion objects
    return (data ?? []).map(({ Companions }) => Companions);
}

// check if companion saved for current user
export const isCompanionSaved = async (companionId: string): Promise<boolean> => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('save_Companion')
        .select('id')
        .eq('userid', userId)
        .eq('companionid', companionId)
        .maybeSingle();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return !!data;
};

// delete the row on supabase 
export const deleteSavedCompanion = async (companionId : string) => {
    const { userId } = await auth()
    const supabase = createSupabaseClient()
    const { data , error } = await supabase.from('save_Companion').delete().eq('userid', userId).eq('companionid', companionId)
    if(error) throw new Error(error.message) 
    return data
}