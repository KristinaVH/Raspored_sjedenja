import supabase from './_supabaseClient.js'; import { requireAuth } from './authGuard.js';
export const handler = async (event)=>{const auth=await requireAuth(event); if(auth.error)return auth.response;
const { data } = await supabase.from('undo_stack').select('*').order('id',{ascending:false}).limit(1);
if(!data||data.length===0) return{statusCode:200,body:JSON.stringify({success:false})};
const item=data[0]; await supabase.from('seating').update({table_id:item.previous_table_id}).eq('guest_id',item.guest_id);
await supabase.from('undo_stack').delete().eq('id',item.id);
return{statusCode:200,body:JSON.stringify({success:true})};};
