import supabase from './_supabaseClient.js'; import { requireAuth } from './authGuard.js';
export const handler = async (event)=>{const auth=await requireAuth(event); if(auth.error)return auth.response;
if(event.httpMethod==='GET'){const {data}=await supabase.from('wedding_info').select('*').limit(1);return{statusCode:200,body:JSON.stringify(data?.[0]||{})}}
if(event.httpMethod==='POST'){const body=JSON.parse(event.body);const {data,error}=await supabase.from('wedding_info').upsert(body).select();return{statusCode:error?500:200,body:JSON.stringify(error||data[0])}}
return{statusCode:405};};
