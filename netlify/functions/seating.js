import supabase from './_supabaseClient.js'; import { requireAuth } from './authGuard.js';
export const handler = async (event)=>{const auth=await requireAuth(event); if(auth.error)return auth.response;
if(event.httpMethod==='POST'){const body=JSON.parse(event.body);const {guest_id,table_id}=body;
await supabase.from('undo_stack').insert({guest_id});
await supabase.from('seating').upsert({guest_id,table_id});
return{statusCode:200,body:JSON.stringify({success:true})}} return{statusCode:405};};
