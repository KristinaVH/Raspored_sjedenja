import PDFDocument from 'pdfkit'; import supabase from './_supabaseClient.js'; import { requireAuth } from './authGuard.js';
export const handler = async (event)=>{const auth=await requireAuth(event); if(auth.error)return auth.response;
const { data: info } = await supabase.from('wedding_info').select('*').limit(1);
const wedding = info?.[0] || {};
const { data: tables } = await supabase.from('tables').select('*');
const { data: seating } = await supabase.from('seating').select('*');
const { data: guests } = await supabase.from('guests').select('*');

let buffers=[]; const doc=new PDFDocument(); doc.on('data',buffers.push.bind(buffers)); doc.on('end',()=>{});

doc.fontSize(26).text('Raspored stolova',{align:'center'});
doc.moveDown(); doc.fontSize(16).text(wedding.couple_names||'',{align:'center'});
doc.text(wedding.wedding_date||'',{align:'center'}); doc.moveDown(2);

tables.forEach(t=>{doc.fontSize(18).text(`Stol ${t.name}`,{underline:true}); seating.filter(s=>s.table_id===t.id).forEach(s=>{const g=guests.find(g=>g.id===s.guest_id); if(g) doc.text(`- ${g.first_name} ${g.last_name}`);}); doc.moveDown();});

doc.end(); const pdfData=Buffer.concat(buffers);
return{statusCode:200,headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="raspored.pdf"'},body:pdfData.toString('base64'),isBase64Encoded:true};};
