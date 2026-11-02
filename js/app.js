/* ================== Catégories & dictionnaire ================== */
const CATS=[
  {k:'fruits',   n:'Fruits & légumes',       h:110},
  {k:'boucherie',n:'Boucherie / Charcuterie',h:6},
  {k:'cremerie', n:'Crèmerie',               h:45},
  {k:'epicerie', n:'Épicerie',               h:28},
  {k:'surgeles', n:'Surgelés',               h:205},
  {k:'boissons', n:'Boissons',               h:265},
  {k:'hygiene',  n:'Hygiène',                h:325},
  {k:'entretien',n:'Entretien',              h:172},
  {k:'autre',    n:'Autre',                  h:0},
];
const CAT=Object.fromEntries(CATS.map(c=>[c.k,c]));
const RAW={
 fruits:'pomme,poire,banane,orange,citron,citron vert,clémentine,mandarine,kiwi,fraise,framboise,myrtille,raisin,melon,pastèque,pêche,nectarine,tomate cerise,pomme de terre,abricot,cerise,prune,ananas,mangue,avocat,tomate,salade,laitue,mâche,roquette,carotte,courgette,aubergine,poivron,concombre,oignon,ail,échalote,poireau,chou,chou-fleur,brocoli,épinard,haricot,champignon,patate,pomme de terre,radis,céleri,persil,basilic,coriandre,menthe,ciboulette,fenouil,betterave,navet,potiron,courge,légume,fruit,endive,artichaut,asperge,gingembre,figue,grenade,pamplemousse,citrouille',
 boucherie:'jambon,poulet,boeuf,bœuf,steak,viande,porc,veau,agneau,saucisse,saucisson,lardon,bacon,dinde,canard,merguez,chipolata,rosbif,escalope,côte,rôti,steak haché,viande hachée,jambon blanc,jambon de paris,pâté de campagne,rillette,chorizo,salami,poisson,saumon,cabillaud,crevette,moule,cordon bleu,blanc de poulet,knacki,jambon cru',
 cremerie:'lait,beurre,crème,crème fraîche,fromage,fromage râpé,fromage blanc,yaourt,yogourt,oeuf,œuf,emmental,gruyère,comté,camembert,mozzarella,parmesan,chèvre,feta,ricotta,mascarpone,petit suisse,skyr,margarine,raclette,brie,roquefort,reblochon,dessert,flan,crème dessert,pâte feuilletée,pâte brisée',
 epicerie:'pâte,pâtes,spaghetti,tagliatelle,coquillette,riz,farine,sucre,sel,poivre,huile,vinaigre,moutarde,ketchup,mayonnaise,café,thé,tisane,chocolat,biscuit,gâteau,céréale,confiture,miel,pain,pain de mie,baguette,brioche,croissant,conserve,thon,sardine,sauce,sauce tomate,coulis de tomate,concentré de tomate,épice,lentille,pois chiche,semoule,quinoa,chips,bonbon,compote,nutella,levure,bouillon,olive,cornichon,soupe,biscotte,muesli,tortilla,noix,amande,cacahuète,maïs,petit pois,farine,purée,croûton,apéritif',
 surgeles:'surgelé,glace,frite,pizza,sorbet,nugget,poisson pané,bâtonnet,esquimau,glaçon',
 boissons:'eau,eau gazeuse,jus,soda,coca,biere,bière,vin,sirop,limonade,champagne,cidre,whisky,rhum,vodka,pastis,perrier,badoit,ice tea,orangina,boisson',
 hygiene:'shampoing,shampooing,après-shampoing,savon,gel douche,dentifrice,brosse à dent,deodorant,déodorant,papier toilette,coton,coton-tige,rasoir,mousse à raser,mouchoir,couche,crème solaire,serviette hygiénique,tampon,lingette,crème hydratante,maquillage,démaquillant,bain de bouche',
 entretien:'lessive,liquide vaisselle,produit vaisselle,pastille lave-vaisselle,éponge,javel,eau de javel,sac poubelle,essuie-tout,sopalin,nettoyant,adoucissant,film alimentaire,papier alu,papier aluminium,ampoule,pile,détergent,désodorisant,serpillière,vinaigre blanc,gant de ménage,sac congélation,allume-feu',
};
function norm(s){
  return String(s).toLowerCase().replace(/œ/g,'oe').replace(/æ/g,'ae')
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9]+/g,' ').trim().split(' ').filter(Boolean)
    .map(w=>w.length>3&&/[sx]$/.test(w)?w.slice(0,-1):w).join(' ');
}
const PHR=[], WRD={};
for(const [c,list] of Object.entries(RAW)) list.split(',').forEach(t=>{const n=norm(t); if(!n)return; if(n.includes(' ')) PHR.push([n,c]); else if(!WRD[n]) WRD[n]=c;});
PHR.sort((a,b)=>b[0].length-a[0].length);
/* ================== Émojis ================== */
const CAT_EMO={fruits:'🥬',boucherie:'🥩',cremerie:'🧀',epicerie:'🥫',surgeles:'🧊',boissons:'🥤',hygiene:'🧴',entretien:'🧽',autre:'🛒'};
const EMO_RAW={
 '🍎':'pomme','🍐':'poire','🍌':'banane','🍊':'orange,clémentine,mandarine,pamplemousse','🍋':'citron,citron vert','🥝':'kiwi',
 '🍓':'fraise,framboise','🫐':'myrtille','🍇':'raisin','🍈':'melon','🍉':'pastèque','🍑':'pêche,nectarine,abricot','🍒':'cerise',
 '🥭':'mangue','🍍':'ananas','🥥':'noix de coco','🥑':'avocat','🍅':'tomate,tomate cerise,sauce tomate,coulis de tomate,concentré de tomate',
 '🍆':'aubergine','🥕':'carotte','🥔':'pomme de terre,patate,chips','🍠':'patate douce','🧅':'oignon,échalote','🧄':'ail',
 '🥦':'brocoli,chou-fleur','🥬':'salade,laitue,mâche,roquette,chou,épinard,poireau,endive,céleri,fenouil','🥒':'concombre,courgette,cornichon',
 '🫑':'poivron','🌶️':'piment','🌽':'maïs','🍄':'champignon','🫛':'haricot vert,petit pois,haricot','🫘':'lentille,pois chiche,haricot rouge',
 '🫚':'gingembre','🌿':'persil,basilic,coriandre,menthe,ciboulette,herbe,thym','🎃':'potiron,courge,citrouille','🥜':'cacahuète','🌰':'noix,amande,noisette,châtaigne',
 '🍖':'jambon,jambon cru,jambon blanc,jambon de paris,viande,rillette,pâté de campagne,rôti,agneau,porc,veau,saucisson,chorizo,salami',
 '🥩':'steak,boeuf,bœuf,steak haché,viande hachée,escalope,côte,rosbif','🍗':'poulet,dinde,blanc de poulet,cordon bleu,nugget,canard',
 '🥓':'bacon,lardon','🌭':'saucisse,knacki,merguez,chipolata','🐟':'poisson,saumon,cabillaud,thon,sardine,poisson pané','🦐':'crevette','🦪':'moule,huître',
 '🥛':'lait,crème,crème fraîche,yaourt,yogourt,skyr,fromage blanc,petit suisse,dessert,crème dessert','🧈':'beurre,margarine',
 '🧀':'fromage,emmental,gruyère,comté,camembert,mozzarella,parmesan,chèvre,feta,raclette,brie,roquefort,reblochon,fromage râpé,ricotta,mascarpone',
 '🥚':'oeuf,œuf','🍮':'flan','🥧':'pâte feuilletée,pâte brisée,tarte','🍝':'pâte,pâtes,spaghetti,tagliatelle,coquillette,lasagne,raviolis',
 '🍚':'riz,semoule,quinoa','🍞':'pain de mie,biscotte','🥖':'pain,baguette','🥐':'croissant,brioche,viennoiserie,pain au chocolat',
 '🧂':'sel,poivre,épice','🫒':'huile,olive,huile d\'olive','🍯':'miel,confiture','🥣':'céréale,muesli','🍫':'chocolat,nutella',
 '🍪':'biscuit','🍰':'gâteau','🍬':'bonbon','🥫':'conserve,soupe,sauce,ketchup,mayonnaise,moutarde,vinaigre,bouillon,purée,compote',
 '☕':'café','🍵':'thé,tisane','🌮':'tortilla','🍕':'pizza','🍟':'frite','🍦':'glace,esquimau','🍨':'sorbet','🧊':'glaçon,surgelé',
 '💧':'eau,eau gazeuse,perrier,badoit','🧃':'jus','🥤':'soda,coca,limonade,orangina,ice tea,boisson','🍺':'bière,cidre','🍷':'vin',
 '🍾':'champagne','🥃':'whisky,rhum,vodka,pastis','🍹':'sirop',
 '🧴':'shampoing,shampooing,après-shampoing,gel douche,crème solaire,crème hydratante,déodorant,deodorant,démaquillant,lotion',
 '🧼':'savon','🪥':'brosse à dent,dentifrice,bain de bouche','🧻':'papier toilette,essuie-tout,sopalin,mouchoir,lingette',
 '🪒':'rasoir,mousse à raser','🍼':'couche,lait bébé','💄':'maquillage','🩹':'pansement','💊':'médicament,doliprane',
 '🧺':'lessive,adoucissant','🧽':'éponge,liquide vaisselle,produit vaisselle,pastille lave-vaisselle,nettoyant,détergent,serpillière,gant de ménage',
 '🗑️':'sac poubelle','🧪':'javel,eau de javel,vinaigre blanc','💡':'ampoule','🔋':'pile','🔥':'allume-feu','🌸':'désodorisant','🐱':'croquette,litière','🍽️':'film alimentaire,papier alu,papier aluminium,sac congélation'
};
const EPHR=[], EWRD={};
for(const [e,list] of Object.entries(EMO_RAW)) list.split(',').forEach(t=>{const n=norm(t); if(!n) return; if(n.includes(' ')) EPHR.push([n,e]); else if(!EWRD[n]) EWRD[n]=e;});
EPHR.sort((a,b)=>b[0].length-a[0].length);
const EMO_PICK=[...new Set([...Object.keys(EMO_RAW),...Object.values(CAT_EMO),'🛍️','🎁','🌱','🧁','🥗','🍜','🥟','🧇','🥞','🥨','🥯','🍔','🌯','🥙','🍲','🫕','🍏','🍋‍🟩','🍷','🧉','🫗','🐶','🪴','🕯️','🧹','🪣','🧷','✂️','📦','📝'])];
function emoFor(name,cat){
  const n=norm(name);
  if(learnedE[n]) return learnedE[n];
  const pad=' '+n+' ';
  for(const [p,e] of EPHR) if(pad.includes(' '+p+' ')) return e;
  for(const w of n.split(' ')) if(EWRD[w]) return EWRD[w];
  return CAT_EMO[cat]||'🛒';
}

function guessCat(name){
  const n=norm(name);
  if(learned[n]) return learned[n];
  const pad=' '+n+' ';
  for(const [p,c] of PHR) if(pad.includes(' '+p+' ')) return c;
  for(const w of n.split(' ')) if(WRD[w]) return WRD[w];
  return 'autre';
}

/* ================== État ================== */
const ENV=window.CABAS_ENV||'local';
const VERSION=self.CABAS_VERSION||'?';
const KEY='cabas:'+ENV;
let items=[], hist={}, learned={}, learnedE={}, S={sort:'alpha', fs:2};
const uid=()=>Math.random().toString(36).slice(2,9);
function seed(){
  learned={}; learnedE={}; hist={}; items=[];
  const now=Date.now();
  ['Œufs','Pâtes','Jambon','Lait','Tomates','Pommes','Pain','Café','Lessive','Shampoing','Eau gazeuse','Beurre','Yaourts','Papier toilette','Glace vanille','Riz','Poulet','Salade','Liquide vaisselle']
    .forEach((n,i)=>items.push({id:uid(),name:n,cat:guessCat(n),taken:false,t:now+i}));
  ['Bananes','Moutarde',"Jus d'orange"].forEach((n,i)=>items.push({id:uid(),name:n,cat:guessCat(n),taken:true,t:now,tt:now-i*1000}));
  [...items.map(i=>i.name),'Fromage râpé','Croissants','Mozzarella','Céréales','Sacs poubelle','Dentifrice','Saumon','Carottes','Oignons','Jambon cru','Chips','Café moulu']
    .forEach((n,i)=>{hist[norm(n)]={name:n,cat:guessCat(n),c:1+((i*7)%5)}});
}
function load(){
  try{const d=JSON.parse(localStorage.getItem(KEY)); if(d&&Array.isArray(d.items)){items=d.items; hist=d.hist||{}; learned=d.learned||{}; learnedE=d.learnedE||{}; S={...S,...(d.S||{})}; return;}}catch(e){}
  if(ENV!=='prod') seed();
}
function save(){try{localStorage.setItem(KEY,JSON.stringify({items,hist,learned,learnedE,S}))}catch(e){}}
const vib=ms=>{try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cmp=(a,b)=>a.name.localeCompare(b.name,'fr',{sensitivity:'base'});

/* ================== Ajout ================== */
const CHUNK_RE=/[,;\n]+|\s+(?:et|puis|plus)\s+/i;
function cleanName(x){
  x=String(x).trim().replace(/^(?:(?:de l|l|d)['’]\s*|(?:et|puis|des|du|de la|les|le|la|un|une|quelques|de)\s+(?:(?:l|d)['’]\s*)?)/i,'').trim().replace(/[.!?]+$/,'');
  return x?x.charAt(0).toUpperCase()+x.slice(1):'';
}
function splitInput(t){ return String(t).split(CHUNK_RE).map(cleanName).filter(Boolean); }

/* Dictée : Android ne met aucune ponctuation (« œufs pâtes jambon blanc »).
   On découpe en s'appuyant sur les articles (des, du, les…), les mots de liaison (de, d', à…),
   les quantités, et les noms connus (dictionnaire + articles déjà saisis). */
const V_SEP=/^(?:des|du|les|le|la|un|une|quelques|et|puis|plus|virgule|point|aussi|encore|ensuite|alors|euh|bon|ah|il|faut|me|nous|on|acheter|prendre|ajoute|ajouter|rajoute|mets|et puis)$/i;
const V_GLUE=/^(?:de|à|au|aux|en|sans|pour)$/i;
const V_UNIT=/^(?:kg|g|gr|grammes?|kilos?|litres?|l|cl|ml|paquets?|bouteilles?|boîtes?|boites?|pots?|sachets?|tranches?|barquettes?|packs?|lots?|douzaines?|demi|de|d['’])$/i;
function knownStart(n){
  const pre=n+' ';
  for(const [p] of PHR) if(p===n||p.startsWith(pre)) return true;
  for(const k in hist) if(k===n||k.startsWith(pre)) return true;
  for(const k in learned) if(k===n||k.startsWith(pre)) return true;
  return false;
}
const FIRSTW=new Set(PHR.map(([p])=>p.split(' ')[0]).filter(w=>!/^(blanc|petit|grand|demi)$/.test(w)));
function isNoun(w){ const n=norm(w); if(!n) return false; if(WRD[n]||learned[n]||FIRSTW.has(n)) return true; for(const k in hist) if(k.split(' ')[0]===n) return true; return false; }
function smartSplit(chunk){
  const toks=String(chunk).replace(/(\b[dl])['’]\s*/gi,"$1' ").split(/\s+/).filter(Boolean);
  const out=[]; let cur='', glue=false, unit=false;
  const flush=()=>{ cur=cur.trim(); if(cur) out.push(cur); cur=''; glue=false; };
  const add=w=>{ cur=!cur?w:(/'$/.test(cur)?cur+w:cur+' '+w); };
  for(let i=0;i<toks.length;i++){
    const w=toks[i], lw=w.toLowerCase();
    if(/^\d/.test(w)){ flush(); unit=true; continue; }                      // « 6 œufs », « 2 kilos de pommes »
    if(unit&&!cur&&V_UNIT.test(lw)) continue;
    unit=false;
    if(glue&&/^(?:la|le|les|l')$/.test(lw)){ add(lw); continue; }          // « glace à la vanille »
    if(lw==="l'"){ flush(); continue; }                                    // « l'eau »
    if(lw==='de'&&/^(?:la|l')$/i.test(toks[i+1]||'')){ flush(); i++; continue; } // « de la moutarde »
    if(V_SEP.test(lw)){ flush(); unit=true; continue; }               // « une bouteille de lait »
    if(lw==="d'"||V_GLUE.test(lw)){ if(cur){ add(lw); glue=true; } continue; }   // « jus d'orange », « pâté de campagne »
    if(!cur||glue){ add(w); glue=false; continue; }
    if(knownStart(norm(cur+' '+w))){ add(w); continue; }                   // « eau gazeuse », « steak haché »
    if(isNoun(w)){ flush(); add(w); continue; }                            // nouveau nom connu = nouvel article
    add(w);                                                                // sinon c'est un complément : « fromage râpé »
  }
  flush(); return out;
}
function splitVoice(t){ return String(t).split(CHUNK_RE).flatMap(smartSplit).map(cleanName).filter(Boolean); }
function addNames(names){
  const added=[], dups=[], flash=[];
  for(const name of names){
    const n=norm(name); if(!n) continue;
    const ex=items.find(i=>norm(i.name)===n);
    if(ex){ if(ex.taken){ex.taken=false; ex.t=Date.now();} dups.push(ex.name); flash.push(ex.id); if(hist[n]) hist[n].l=Date.now(); continue; }
    const it={id:uid(),name,cat:guessCat(name),taken:false,t:Date.now()};
    items.push(it); added.push(name); flash.push(it.id);
    const h=hist[n]; hist[n]={name:h?h.name:name,cat:it.cat,c:(h?h.c:0)+1,l:Date.now()};
  }
  save(); render(flash);
  if(added.length) vib(12);
  return {added,dups};
}
function resultText(r){
  const p=[];
  if(r.added.length) p.push('Ajouté : '+r.added.join(', '));
  if(r.dups.length) p.push('Déjà dans la liste : '+r.dups.join(', '));
  return p.join(' · ');
}

/* ================== Rendu ================== */
const grid=document.getElementById('grid');
function btn(i){return `<button class="item cat-${i.cat}${i.taken?' taken':''}" data-id="${i.id}" style="--h:${CAT[i.cat].h}"><span class="emo" aria-hidden="true">${emoFor(i.name,i.cat)}</span><span class="label">${esc(i.name)}</span></button>`}
function render(flashIds){
  const first=new Map();
  grid.querySelectorAll('[data-id]').forEach(el=>first.set(el.dataset.id,el.getBoundingClientRect()));
  const act=items.filter(i=>!i.taken).sort(cmp);
  const tk=items.filter(i=>i.taken).sort((a,b)=>(b.tt||0)-(a.tt||0));
  let h='';
  if(!items.length) h=`<div class="empty">Votre liste est vide.<br>Touchez <b>Texte</b> ou <b>Voix</b> pour ajouter des articles.</div>`;
  else if(S.sort==='cat'){
    for(const c of CATS){const l=act.filter(i=>i.cat===c.k); if(l.length) h+=`<div class="cathead cat-${c.k}" style="--h:${c.h}"><i></i>${c.n} · ${l.length}</div>`+l.map(btn).join('');}
  } else h+=act.map(btn).join('');
  if(items.length&&!act.length) h+=`<div class="done">Tout est dans le cabas ✓</div>`;
  if(tk.length) h+=`<div class="divider">Dans le cabas · ${tk.length}</div>`+tk.map(btn).join('');
  grid.innerHTML=h;

  const tot=items.length, rem=act.length;
  document.getElementById('count').innerHTML=`<b>${rem}</b> restant${rem>1?'s':''} <span class="tot">/ ${tot}</span>`;
  document.getElementById('prog').style.width=tot?((tot-rem)/tot*100)+'%':'0';
  document.getElementById('clearN').textContent=tk.length;
  document.getElementById('clearBtn').disabled=!tk.length;
  document.getElementById('sortBtn').innerHTML=S.sort==='cat'
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h10M4 18h6"/></svg>Rayons`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16M3.5 16.5 7 20l3.5-3.5M17 20V4M13.5 7.5 17 4l3.5 3.5"/></svg>A→Z`;
  document.documentElement.dataset.fs=S.fs;

  // animation FLIP : les boutons glissent vers leur nouvelle place
  grid.querySelectorAll('[data-id]').forEach(el=>{
    const f=first.get(el.dataset.id);
    if(!f){ if(first.size) el.classList.add('enter'); return; }
    const l=el.getBoundingClientRect(), dx=f.left-l.left, dy=f.top-l.top;
    if((dx||dy)&&el.animate) el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:300,easing:'cubic-bezier(.2,.8,.2,1)'});
  });
  if(flashIds&&flashIds.length){
    flashIds.forEach(id=>{const el=grid.querySelector(`[data-id="${id}"]`); if(el){el.classList.remove('enter'); el.classList.add('flash'); el.addEventListener('animationend',()=>el.classList.remove('flash'),{once:true});}});
    const el=grid.querySelector(`[data-id="${flashIds[flashIds.length-1]}"]`);
    if(el){const r=el.getBoundingClientRect(); if(r.top<130||r.bottom>innerHeight-90) el.scrollIntoView({block:'center',behavior:'smooth'});}
  }
}

/* ================== Interactions sur les articles ================== */
let lp=null, lpFired=false, sx=0, sy=0;
grid.addEventListener('pointerdown',e=>{const el=e.target.closest('.item'); if(!el) return;
  lpFired=false; sx=e.clientX; sy=e.clientY; clearTimeout(lp);
  lp=setTimeout(()=>{lpFired=true; lp=null; vib(25); itemMenu(el.dataset.id)},480);});
grid.addEventListener('pointermove',e=>{if(lp&&(Math.abs(e.clientX-sx)>8||Math.abs(e.clientY-sy)>8)){clearTimeout(lp); lp=null}});
['pointerup','pointercancel','pointerleave'].forEach(t=>grid.addEventListener(t,()=>{clearTimeout(lp); lp=null}));
grid.addEventListener('click',e=>{const el=e.target.closest('.item'); if(!el) return; if(lpFired){lpFired=false; return;} toggle(el.dataset.id)});
grid.addEventListener('contextmenu',e=>{const el=e.target.closest('.item'); if(!el) return; e.preventDefault(); if(!lpFired){clearTimeout(lp); lp=null; lpFired=true; itemMenu(el.dataset.id)}});
function toggle(id){const i=items.find(x=>x.id===id); if(!i) return; i.taken=!i.taken; if(i.taken) i.tt=Date.now(); vib(10); save(); render();}

/* ================== Feuilles ================== */
const sheet=document.getElementById('sheet'), backdrop=document.getElementById('backdrop');
let onClose=null;
function openSheet(html,mount){ if(onClose){const f=onClose; onClose=null; f();}
  sheet.innerHTML='<div class="grab"></div>'+html; backdrop.classList.add('on'); sheet.classList.add('on'); mount&&mount(); }
function closeSheet(){ sheet.classList.remove('on'); backdrop.classList.remove('on'); if(onClose){const f=onClose; onClose=null; f();} document.activeElement&&document.activeElement.blur(); }
backdrop.addEventListener('click',closeSheet);
addEventListener('keydown',e=>{if(e.key==='Escape') closeSheet()});
const X=`<button class="hbtn icon x" data-close aria-label="Fermer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`;
sheet.addEventListener('click',e=>{if(e.target.closest('[data-close]')) closeSheet()});

/* --- Ajout texte --- */
function textSheet(){
  openSheet(`<h3>Ajouter des articles ${X}</h3>
    <form class="field" id="f"><input id="in" autocomplete="off" autocapitalize="sentences" enterkeyhint="done" placeholder="ex. œufs, pâtes et jambon"><button class="pbtn">Ajouter</button></form>
    <div class="chips" id="sugg"></div>
    <div class="hint" id="hint">Séparez par une virgule ou « et ». Appui long sur une suggestion pour l'oublier.</div>`,()=>{
    const inp=sheet.querySelector('#in'), hint=sheet.querySelector('#hint'), sugg=sheet.querySelector('#sugg');
    const show=r=>{hint.textContent=resultText(r)||' '; hint.className='hint'+(r.added.length?' ok':'');};
    const suggest=()=>{
      const seg=inp.value.split(/[,;]/).pop().trim(), q=norm(seg);
      const inList=new Set(items.filter(i=>!i.taken).map(i=>norm(i.name)));
      let c=Object.entries(hist).filter(([k])=>!inList.has(k));
      if(q) c=c.filter(([k])=>k.startsWith(q)||k.split(' ').some(w=>w.startsWith(q)));
      c=c.sort((a,b)=>(b[1].c-a[1].c)||((b[1].l||0)-(a[1].l||0))).slice(0,q?6:8);
      sugg.innerHTML=c.map(([k,v])=>`<button type="button" class="chip emo-chip" data-n="${esc(v.name)}"><span aria-hidden="true">${emoFor(v.name,v.cat)}</span>${esc(v.name)}</button>`).join('');
    };
    sheet.querySelector('#f').addEventListener('submit',e=>{e.preventDefault(); const names=splitInput(inp.value); if(!names.length) return; show(addNames(names)); inp.value=''; suggest(); inp.focus();});
    inp.addEventListener('input',suggest);
    sugg.addEventListener('click',e=>{const b=e.target.closest('.chip'); if(!b) return;
      const parts=inp.value.split(/([,;])/); parts[parts.length-1]=''; inp.value=parts.join('').replace(/[,;]\s*$/,'')+'';
      show(addNames([b.dataset.n])); if(!inp.value.trim()) inp.value=''; suggest(); inp.focus();});
    sugg.addEventListener('contextmenu',e=>{const b=e.target.closest('.chip'); if(!b) return; e.preventDefault();
      const n=norm(b.dataset.n); delete hist[n]; save(); vib(20); suggest();
      hint.className='hint'; hint.textContent='« '+b.dataset.n+' » retiré des suggestions.';});
    suggest(); setTimeout(()=>inp.focus(),60);
  });
}

/* --- Ajout voix --- */
let rec=null;
const MIC_SVG='<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>';
function voiceSheet(){
  openSheet(`<h3>Dicter des articles ${X}</h3>
    <button class="mic" id="mic" aria-label="Parler">${MIC_SVG}</button>
    <div class="transcript" id="tr"></div>
    <div class="hint" id="vh" style="text-align:center"></div>
    <div id="alt"></div>`,()=>{});
  onClose=()=>{try{rec&&rec.abort()}catch(e){} rec=null;};
  const tr=sheet.querySelector('#tr'), vh=sheet.querySelector('#vh'), mic=sheet.querySelector('#mic'), alt=sheet.querySelector('#alt');
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const idle=(msg,hint)=>{mic.classList.remove('live'); tr.textContent=msg; vh.className='hint'; vh.textContent=hint||'Touchez le micro pour réessayer.';};
  const fallback=msg=>{
    idle(msg,'Astuce hors réseau : utilisez le micro du clavier Google dans « Texte ».');
    let h=`<button class="sbtn" id="toKb" style="margin-top:12px; justify-content:center">Passer au clavier</button>`;
    if(ENV!=='prod') h+=`<div class="hint">Simulation (PC) :</div><form class="field" id="sf" style="margin-top:6px"><input id="si" value="œufs pâtes jambon blanc fromage râpé lessive"><button class="pbtn">Dicter</button></form>`;
    alt.innerHTML=h;
    alt.querySelector('#toKb').onclick=()=>textSheet();
    const sf=alt.querySelector('#sf');
    if(sf) sf.addEventListener('submit',e=>{e.preventDefault(); const v=alt.querySelector('#si').value;
      tr.textContent='« '+v+' »'; const r=addNames(splitVoice(v)); vh.textContent=resultText(r); vh.className='hint ok'; alt.querySelector('#si').value='';});
  };
  const listen=()=>{
    if(!SR){fallback('La dictée n’est pas disponible sur cet appareil.'); return;}
    alt.innerHTML=''; let finalT='', failed=false;
    try{
      rec=new SR(); rec.lang='fr-FR'; rec.interimResults=true; rec.continuous=false;
      rec.onstart=()=>{mic.classList.add('live'); tr.textContent='Je vous écoute…'; vh.className='hint'; vh.textContent='ex. « des œufs, des pâtes et du jambon »';};
      rec.onresult=e=>{let t=''; for(const r of e.results) t+=r[0].transcript; tr.textContent='« '+t+' »'; if(e.results[e.results.length-1].isFinal) finalT=t;};
      rec.onerror=e=>{failed=true; finalT='';
        if(e.error==='no-speech'||e.error==='aborted') idle('Je n’ai rien entendu.');
        else fallback({'not-allowed':'Le micro n’est pas autorisé pour Cabas.','service-not-allowed':'Le micro n’est pas autorisé pour Cabas.','network':'Pas de réseau pour la dictée.','audio-capture':'Aucun micro détecté.'}[e.error]||'La dictée a été interrompue.');};
      rec.onend=()=>{rec=null;
        if(finalT){mic.classList.remove('live'); const r=addNames(splitVoice(finalT)); vh.textContent=resultText(r); vh.className='hint ok'; setTimeout(()=>{if(sheet.classList.contains('on')&&sheet.querySelector('#mic')===mic) closeSheet();},1200);}
        else if(!failed) idle('Je n’ai rien entendu.');};
      rec.start();
    }catch(e){fallback('La dictée n’est pas disponible sur cet appareil.');}
  };
  mic.onclick=()=>{ if(rec){try{rec.stop()}catch(e){}} else listen(); };
  listen();
}

/* --- Menu d'un article (appui long) --- */
function itemMenu(id){
  const i=items.find(x=>x.id===id); if(!i) return;
  const main=()=>{
    sheet.innerHTML=`<div class="grab"></div><h3>${esc(i.name)} ${X}</h3>
      <button class="sbtn" data-a="edit"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>Modifier le nom</button>
      <button class="sbtn" data-a="emo"><span style="font-size:20px; width:18px; text-align:center">${emoFor(i.name,i.cat)}</span>Changer le dessin</button>
      <button class="sbtn" data-a="cat"><span class="chip cat-${i.cat}" style="--h:${CAT[i.cat].h}; height:auto; border:0; padding:0; background:none"></span>Catégorie : ${CAT[i.cat].n}</button>
      <button class="sbtn danger" data-a="del"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>Supprimer</button>`;
  };
  openSheet('',main);
  sheet.onclick=e=>{
    const c=e.target.closest('[data-c]');
    if(c){i.cat=c.dataset.c; const n=norm(i.name); learned[n]=i.cat; if(hist[n]) hist[n].cat=i.cat; save(); closeSheet(); render([id]); return;}
    const em=e.target.closest('[data-e]');
    if(em){const n=norm(i.name); if(em.dataset.e) learnedE[n]=em.dataset.e; else delete learnedE[n]; save(); closeSheet(); render([id]); return;}
    const a=e.target.closest('[data-a]'); if(!a) return;
    if(a.dataset.a==='emo'){
      const n=norm(i.name), cur=emoFor(i.name,i.cat);
      sheet.innerHTML=`<div class="grab"></div><h3>Dessin de « ${esc(i.name)} » ${X}</h3>
        <div class="emogrid">${EMO_PICK.map(x=>`<button data-e="${x}" class="${x===cur?'sel':''}">${x}</button>`).join('')}</div>
        ${learnedE[n]?`<button class="sbtn" data-e="" style="margin-top:12px; justify-content:center">Revenir au dessin automatique</button>`:''}
        <div class="hint">Cabas retiendra ce choix pour les prochaines fois.</div>`;
      return;
    }
    if(a.dataset.a==='del'){const snap=JSON.stringify(items); items=items.filter(x=>x.id!==id); save(); render(); closeSheet(); toast(`« ${i.name} » supprimé`,()=>{items=JSON.parse(snap); save(); render([id]);});}
    if(a.dataset.a==='edit'){
      sheet.innerHTML=`<div class="grab"></div><h3>Modifier ${X}</h3><form class="field" id="ef"><input id="ei" value="${esc(i.name)}" autocomplete="off"><button class="pbtn">OK</button></form><div class="hint" id="eh"></div>`;
      const ei=sheet.querySelector('#ei'); setTimeout(()=>{ei.focus(); ei.select()},60);
      sheet.querySelector('#ef').addEventListener('submit',ev=>{ev.preventDefault(); const v=ei.value.trim(); if(!v) return;
        const n=norm(v), d=items.find(x=>x.id!==id&&norm(x.name)===n);
        if(d){sheet.querySelector('#eh').textContent='« '+d.name+' » est déjà dans la liste.'; return;}
        i.name=v.charAt(0).toUpperCase()+v.slice(1); save(); closeSheet(); render([id]);});
    }
    if(a.dataset.a==='cat'){
      sheet.innerHTML=`<div class="grab"></div><h3>Catégorie de « ${esc(i.name)} » ${X}</h3><div class="catgrid">${CATS.map(c=>`<button class="chip cat-${c.k}${c.k===i.cat?' sel':''}" style="--h:${c.h}" data-c="${c.k}">${c.n}</button>`).join('')}</div><div class="hint">Cabas retiendra ce choix pour les prochaines fois.</div>`;
    }
  };
  onClose=()=>{sheet.onclick=null};
}

/* --- Réglages --- */
function settingsSheet(){
  openSheet(`<h3>Réglages ${X}</h3>
    <div class="lbl">Taille du texte</div>
    <div class="sizes">${[1,2,3,4].map(n=>`<button data-fs="${n}" class="${S.fs==n?'sel':''}" style="font-size:${[13,16,19,23][n-1]}px">Aa</button>`).join('')}</div>
    <div class="hint">La grille s'adapte : 4 colonnes en petit, 1 colonne en très grand.</div>
    <div class="lbl">Thème</div>
    <div class="hint" style="margin-top:0">Suit automatiquement le mode clair / sombre du téléphone.</div>
    <div class="lbl">Application</div>
    <button class="sbtn" data-upd>Rechercher une mise à jour</button>
    ${ENV!=='prod'?`<button class="sbtn" data-reset>Charger la liste d'exemple (${ENV})</button>`:''}
    <div class="hint" id="updh" style="text-align:center; margin-top:16px">Cabas v${VERSION}${ENV!=='prod'?' · '+ENV.toUpperCase():''}</div>`,()=>{});
  sheet.onclick=e=>{
    const b=e.target.closest('[data-fs]'); if(b){S.fs=+b.dataset.fs; save(); render(); sheet.querySelectorAll('[data-fs]').forEach(x=>x.classList.toggle('sel',x===b));}
    if(e.target.closest('[data-reset]')){seed(); save(); closeSheet(); grid.innerHTML=''; render();}
    if(e.target.closest('[data-upd]')) checkUpdate(sheet.querySelector('#updh'));
  };
  onClose=()=>{sheet.onclick=null};
}

/* ================== Toast « Annuler » ================== */
let tTimer=null, tUndo=null;
const toastEl=document.getElementById('toast'), tBar=document.getElementById('toastBar');
function toast(msg,undo){
  clearTimeout(tTimer); tUndo=undo;
  document.getElementById('toastMsg').textContent=msg; document.getElementById('toastUndo').hidden=!undo;
  toastEl.classList.add('on');
  tBar.style.transition='none'; tBar.style.width='100%'; void tBar.offsetWidth;
  tBar.style.transition='width 5s linear'; tBar.style.width='0';
  tTimer=setTimeout(()=>{toastEl.classList.remove('on'); tUndo=null},5000);
}
document.getElementById('toastUndo').addEventListener('click',()=>{if(tUndo){tUndo(); tUndo=null; vib(10);} clearTimeout(tTimer); toastEl.classList.remove('on');});

/* ================== Boutons principaux ================== */
document.getElementById('addTxt').addEventListener('click',textSheet);
document.getElementById('addVoc').addEventListener('click',voiceSheet);
document.getElementById('setBtn').addEventListener('click',settingsSheet);
document.getElementById('sortBtn').addEventListener('click',()=>{S.sort=S.sort==='cat'?'alpha':'cat'; save(); render(); vib(8);});
document.getElementById('clearBtn').addEventListener('click',()=>{
  const n=items.filter(i=>i.taken).length; if(!n) return;
  const snap=JSON.stringify(items); items=items.filter(i=>!i.taken); save(); render(); vib(15);
  toast(`${n} article${n>1?'s':''} retiré${n>1?'s':''} de la liste`,()=>{items=JSON.parse(snap); save(); render();});
});

/* ================== Hors ligne & mises à jour ================== */
let swReg=null, reloadPending=false;
function applyUpdate(){ if(sheet.classList.contains('on')){reloadPending=true; return;} location.reload(); }
sheet.addEventListener('transitionend',()=>{ if(reloadPending&&!sheet.classList.contains('on')) location.reload(); });
async function checkUpdate(out){
  if(!swReg){ if(out) out.textContent='Mises à jour indisponibles ici.'; return; }
  if(out) out.textContent='Recherche…';
  try{ await swReg.update(); }catch(e){ if(out) out.textContent='Pas de réseau. Cabas v'+VERSION; return; }
  setTimeout(()=>{ if(out&&!swReg.installing&&!swReg.waiting) out.textContent='Cabas v'+VERSION+' est à jour.'; },1500);
}
if('serviceWorker' in navigator){
  const hadController=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>{swReg=r;}).catch(()=>{});
  navigator.serviceWorker.addEventListener('controllerchange',()=>{ if(hadController) applyUpdate(); });
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible'&&swReg) swReg.update().catch(()=>{}); });
}
try{ navigator.storage&&navigator.storage.persist&&navigator.storage.persist(); }catch(e){}

if(ENV!=='prod'){const t=document.getElementById('envTag'); t.textContent=ENV.toUpperCase(); t.hidden=false; t.classList.add('env-'+ENV);}
load(); render();
if(S.lastV&&S.lastV!==VERSION) S.updNote=VERSION;   // nouvelle version installée : on l'annonce (même si la page se recharge encore une fois)
S.lastV=VERSION; save();
if(S.updNote===VERSION) setTimeout(()=>{toast('Cabas mis à jour (v'+VERSION+')'); setTimeout(()=>{delete S.updNote; save();},4000);},500);
