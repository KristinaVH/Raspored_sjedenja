import supabase from './_supabaseClient.js'; import { requireAuth } from './authGuard.js';
export const handler = async (event)=>{const auth=await requireAuth(event); if(auth.error) return auth.response; if(event.httpMethod==='GET'){const {data}=await supabase.from('tables').select('*');return{statusCode:200,body:JSON.stringify(data)}} return{statusCode:405}};
