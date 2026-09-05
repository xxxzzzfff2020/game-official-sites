import {readFileSync,writeFileSync} from 'node:fs';
const {baseUrl,sites}=JSON.parse(readFileSync(new URL('../sites.json',import.meta.url)));
const root=new URL('../docs/',import.meta.url);
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const cards=sites.map(s=>`<a class="game" href="./${s.slug}/"><img src="./${s.slug}/${s.image}" alt="" width="1920" height="1080"><div><h2>${escape(s.name)}</h2><p>${escape(s.description)}</p><span>进入官网 ↗</span></div></a>`).join('\n');
writeFileSync(new URL('index.html',root),`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>游戏官网</title><meta name="description" content="我做玉帝那些事、算力大亨、过载余波官方网站入口"><link rel="canonical" href="${baseUrl}"><link rel="stylesheet" href="./hub.css"></head>
<body><main><p class="eyebrow">GAME WORLDS</p><h1>选择你的世界。</h1><div class="games">${cards}</div></main></body></html>\n`);
writeFileSync(new URL('sitemap.xml',root),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...sites.map(s=>s.slug+'/')].map(p=>'<url><loc>'+baseUrl+p+'</loc></url>').join('')}</urlset>\n`);
writeFileSync(new URL('robots.txt',root),'User-agent: *\nAllow: /\nSitemap: '+baseUrl+'sitemap.xml\n');
writeFileSync(new URL('.nojekyll',root),'');
console.log('Generated hub, sitemap and robots for '+sites.length+' sites.');
