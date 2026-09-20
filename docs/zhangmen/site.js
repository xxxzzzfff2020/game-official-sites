// Keep unavailable distribution entries empty. No fallback to another game's page.
import {download} from './config.js';
const slot=document.querySelector('[data-download]');
if(download.url && /^https:\/\//.test(download.url)){
 const a=document.createElement('a');a.className='button';a.href=download.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='前往 TapTap';slot.replaceChildren(a);
 document.querySelector('[data-download-note]').textContent='前往 TapTap 查看游戏详情与可用版本。';
 if(download.qr){const img=document.createElement('img');img.src=download.qr;img.alt='TapTap 游戏二维码';img.className='download-qr';slot.append(img);}
}
const dialog=document.querySelector('dialog');
document.querySelectorAll('.shot').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');const image=dialog.querySelector('img');image.src=source.src;image.alt=source.alt;dialog.showModal();}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();})));

