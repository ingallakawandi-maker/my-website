const LANG_META={ar:{flag:'🇸🇾',short:'AR',dir:'rtl',font:'Noto Sans Arabic'},en:{flag:'🇬🇧',short:'EN',dir:'ltr'},fr:{flag:'🇫🇷',short:'FR',dir:'ltr'},it:{flag:'🇮🇹',short:'IT',dir:'ltr'},de:{flag:'🇩🇪',short:'DE',dir:'ltr'}};
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
function getPath(obj,path){return path.split('.').reduce((a,k)=>a&&a[k],obj)}
let ACTIVE_CONTENT={...SURA_CONTENT};
async function loadCmsContent(){
  try{
    const entries=await Promise.all(Object.keys(LANG_META).map(async lang=>{const r=await fetch(`content/${lang}.json`,{cache:'no-store'});if(!r.ok)throw new Error(lang);return [lang,await r.json()]}));
    entries.forEach(([lang,data])=>ACTIVE_CONTENT[lang]=data);
  }catch(e){/* local file / offline fallback uses bundled content.js */}
  const saved=localStorage.getItem('sura-lang');setLanguage(saved&&ACTIVE_CONTENT[saved]?saved:'en');
}
function setLanguage(lang){const data=ACTIVE_CONTENT[lang]||ACTIVE_CONTENT.en;document.documentElement.lang=lang;document.documentElement.dir=LANG_META[lang].dir;document.title=({en:'Sura New International | Investment · Development · Strategic Partnerships',ar:'سُرى العالمية الجديدة | الاستثمار · التطوير · الشراكات',fr:'Sura New International | Investissement · Développement · Partenariats',it:'Sura New International | Investimenti · Sviluppo · Partnership',de:'Sura New International | Investitionen · Entwicklung · Partnerschaften'})[lang]||'Sura New International';$$('[data-i18n]').forEach(el=>{const value=getPath(data,el.dataset.i18n);if(value!==undefined)el.innerHTML=value});const meta=LANG_META[lang];$('#languageButton').innerHTML=`${meta.flag} <span>${meta.short}</span> <span class="chevron">⌄</span>`;$$('.language-pills button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));localStorage.setItem('sura-lang',lang);$('#languageSwitcher').classList.remove('open');$('#mobileNav').classList.remove('open');$('#menuToggle').classList.remove('open');document.body.classList.remove('menu-open')}
loadCmsContent();
$('#languageButton').addEventListener('click',()=>$('#languageSwitcher').classList.toggle('open'));document.addEventListener('click',e=>{const b=e.target.closest('[data-lang]');if(b&&$('#languageSwitcher').contains(b)){e.preventDefault();setLanguage(b.dataset.lang);return}if(!$('#languageSwitcher').contains(e.target))$('#languageSwitcher').classList.remove('open')});
$('#menuToggle').addEventListener('click',()=>{const open=!$('#mobileNav').classList.contains('open');$('#mobileNav').classList.toggle('open',open);$('#menuToggle').classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});$$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{$('#mobileNav').classList.remove('open');$('#menuToggle').classList.remove('open');document.body.classList.remove('menu-open')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(e=>observer.observe(e));
function onScroll(){const y=window.scrollY;$('#siteHeader').classList.toggle('scrolled',y>30);const h=document.documentElement.scrollHeight-window.innerHeight;$('#progress').style.width=(h?Math.min(100,y/h*100):0)+'%'}window.addEventListener('scroll',onScroll,{passive:true});onScroll();
$('#year').textContent=new Date().getFullYear();
$('#contactForm').addEventListener('submit',()=>{const note=$('#formNote');note.textContent=document.documentElement.lang==='ar'?'شكراً. تم إرسال رسالتك بنجاح.':'Thank you. Your enquiry is being submitted.';note.style.color='var(--gold)';});


/* SURA V20 — cinematic hero playback slowed for a calmer, premium rhythm */
document.addEventListener('DOMContentLoaded',()=>{
  const video=document.querySelector('.hero-video');
  if(!video) return;
  const setSpeed=()=>{ try{ video.playbackRate=0.62; video.defaultPlaybackRate=0.62; }catch(e){} };
  setSpeed();
  video.addEventListener('loadedmetadata',setSpeed,{once:true});
});
