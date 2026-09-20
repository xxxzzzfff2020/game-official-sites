import {readFileSync,readdirSync,existsSync,statSync} from 'node:fs';
import {resolve,dirname,join,extname,sep} from 'node:path';
const root=resolve('docs'); const errors=[];
function walk(dir){return readdirSync(dir).flatMap(n=>{const p=join(dir,n);return statSync(p).isDirectory()?walk(p):[p]})}
for(const file of walk(root)){
 if(!['.html','.css'].includes(extname(file)))continue;
 const text=readFileSync(file,'utf8');
 const refs=[...text.matchAll(/(?:src|href|poster)=["']([^"']+)["']/g),...text.matchAll(/url\(["']?([^"'()\s]+)["']?\)/g)];
 for(const m of refs){const ref=m[1];if(/^(https?:|mailto:|data:|tel:|#|\/\/)/.test(ref))continue;
 const target=resolve(dirname(file),decodeURIComponent(ref.split(/[?#]/)[0]));
 if(!target.startsWith(root+sep)&&target!==root)errors.push(file+': escapes docs '+ref);
 else if(!existsSync(target))errors.push(file+': missing '+ref);
 }
}
const config=JSON.parse(readFileSync('sites.json','utf8'));
for(const s of config.sites){const html=readFileSync(join(root,s.slug,'index.html'),'utf8');if(!html.includes(config.baseUrl+s.slug+'/'))errors.push('Missing canonical for '+s.slug)}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('All local HTML/CSS references and site canonicals passed.');
