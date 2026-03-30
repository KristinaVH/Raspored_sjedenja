import { createClient } from '@supabase/supabase-js';
const authClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
export async function requireAuth(event){const token=event.headers.authorization?.replace('Bearer ',''); if(!token)return{error:true,response:{statusCode:401,body:JSON.stringify({error:'Missing token'})}}; const {data,error}=await authClient.auth.getUser(token); if(error||!data.user)return{error:true,response:{statusCode:401,body:JSON.stringify({error:'Invalid token'})}}; return{error:false,user:data.user};}
