import supabase from './_supabaseClient.js'; import { requireAuth } from './authGuard.js';
export const handler = async (event)=>{const auth=await requireAuth(event); if(auth.error)return auth.response;
if(event.httpMethod==='GET'){const {data}=await supabase.from('guests').select('*');return{statusCode:200,body:JSON.stringify(data)}}
if(event.httpMethod==='POST'){const body=JSON.parse(event.body);const {first_name,last_name}=body;const {data,error}=await supabase.from('guests').insert({first_name,last_name}).select();return{statusCode:error?500:200,body:JSON.stringify(error||data[0])}}
if(event.httpMethod==='DELETE'){const id=event.queryStringParameters.id;const {error}=await supabase.from('guests').delete().eq('id',id);return{statusCode:error?500:200,body:JSON.stringify(error||{success:true})}}
return{statusCode:405};};
