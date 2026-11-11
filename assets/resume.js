const CERTIFICATES = [
  {
    title:"国家级项目获奖证书",
    subtitle:"《南山后海中心区城市设计》系列规划",
    detail:"2019年度优秀城市规划设计奖",
    date:"取得时间：2019年1月",
    images:["assets/image-adc28424344e3a91336d.webp"]
  },
  {
    title:"市级项目获奖证书",
    subtitle:"深圳市龙岗河活力发展带城市设计国际咨询整体概念性城市设计与重点区段详细设计及深化",
    detail:"深圳市第19届优秀城市规划设计奖",
    date:"取得时间：2022年2月",
    images:["assets/image-02209ed507f69f83e18c.webp"]
  },
  {
    title:"CATTI 翻译证书",
    subtitle:"国际通用翻译能力等级考试",
    detail:"CATTI International",
    date:"取得时间：2025年11月",
    images:["assets/image-27bf9c86fb59bff1dfb3.webp","assets/image-c1489c2fa7f42f14766e.webp","assets/image-72ad2eb8f9208fc806ab.webp"]
  },
  {
    title:"雅思成绩证书",
    subtitle:"International English Language Testing System",
    detail:"Total Score：6.5",
    date:"取得时间：2022年9月",
    images:["assets/image-51e4e84fcc84bf90da68.webp"]
  },
  {
    title:"留学交换证书",
    subtitle:"Erasmus+ IUAV · 威尼斯建筑大学",
    detail:"城市规划学",
    date:"交换时间：2016年2月—8月",
    images:["assets/image-1337ce830daf2c716a89.webp"]
  },
  {
    title:"国际志愿者证书",
    subtitle:"GAPPER + BLVLC 儿童教学项目",
    detail:"印度尼西亚·乌布地区 · 授课时长：30小时",
    date:"取得时间：2025年10月",
    images:["assets/image-56f41d0c0a62493bed61.webp"]
  },
  {
    title:"普通话证书",
    subtitle:"普通话二级甲等证书",
    detail:"",
    date:"取得时间：2025年3月",
    images:["assets/image-114f79651ac746f23c94.webp"]
  },
  {
    title:"中级工程师职称证书",
    subtitle:"工程师 · 城乡规划 · 中级",
    detail:"深圳市人力资源和社会保障局",
    date:"取得时间：2023年8月",
    images:["assets/image-a7625c775f3c5fa90296.webp"]
  }
];

const CERTIFICATE_SLIDES=CERTIFICATES.flatMap((certificate,certIndex)=>certificate.images.map((src,imageIndex)=>({certificate,certIndex,imageIndex,src})));
let certSlideIndex=0,certSwipeStartX=0;
function renderCertificates(){
  document.getElementById("certTrack").innerHTML=CERTIFICATES.map((c,i)=>`
    <article class="cert-card" tabindex="0" onclick="openCert(${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openCert(${i})}">
      <div class="cert-image"><img src="${c.images[0]}" alt="${c.title}" loading="lazy" decoding="async"><div class="cert-mask"><span>${c.title}</span></div></div>
      <div class="cert-copy"><h3>${c.title}</h3><p>${c.subtitle}${c.detail?`<br>${c.detail}`:""}</p><time>${c.date}</time></div>
    </article>`).join("");
}
function scrollCertificates(){
  const track=document.getElementById("certTrack");
  const atEnd=track.scrollLeft+track.clientWidth>=track.scrollWidth-20;
  track.scrollTo({left:atEnd?0:track.scrollLeft+Math.max(360,track.clientWidth*.72),behavior:"smooth"});
}
function openCert(index){if(MOBILE_LAYOUT.matches){openMobileCertificate(index);return;}const start=CERTIFICATE_SLIDES.findIndex(slide=>slide.certIndex===index);certSlideIndex=Math.max(0,start);updateCertViewer();const m=document.getElementById("certModal");m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function updateCertViewer(){
  const slide=CERTIFICATE_SLIDES[certSlideIndex],c=slide.certificate,total=CERTIFICATE_SLIDES.length;
  document.getElementById("certViewerImage").src=slide.src;
  document.getElementById("certViewerImage").alt=`${c.title} ${certSlideIndex+1}/${total}`;
  document.getElementById("certViewerTitle").textContent=c.title;
  document.getElementById("certViewerCount").textContent=`${certSlideIndex+1} / ${total}`;
  const certMeta=document.getElementById("certViewerMeta");
  certMeta.replaceChildren(...[c.subtitle,c.detail,c.date].filter(Boolean).map(value=>{
    const line=document.createElement("span");
    line.textContent=value;
    return line;
  }));
  document.getElementById("certPrev").classList.toggle("cert-nav-hidden",total<2);
  document.getElementById("certForward").classList.toggle("cert-nav-hidden",total<2);
}
function shiftCert(direction){if(MOBILE_LAYOUT.matches)resetMobileCertificateZoom();const total=CERTIFICATE_SLIDES.length;certSlideIndex=(certSlideIndex+direction+total)%total;updateCertViewer();}
function closeCert(){if(MOBILE_LAYOUT.matches){closeMobileCertificate();return;}const m=document.getElementById("certModal");m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.getElementById("certModal").addEventListener("touchstart",e=>{certSwipeStartX=e.touches[0].clientX;},{passive:true});
document.getElementById("certModal").addEventListener("touchend",e=>{if(MOBILE_LAYOUT.matches)return;const dx=e.changedTouches[0].clientX-certSwipeStartX;if(Math.abs(dx)>45)shiftCert(dx<0?1:-1);},{passive:true});
document.addEventListener("keydown",e=>{if(document.getElementById("certModal").classList.contains("open")){if(e.key==="Escape")closeCert();if(e.key==="ArrowLeft")shiftCert(-1);if(e.key==="ArrowRight")shiftCert(1);}});


const MOBILE_LAYOUT=window.matchMedia("(max-width:760px)");
const TABLET_TOUCH_LAYOUT=window.matchMedia("(min-width:761px) and (hover:none) and (pointer:coarse)");

document.querySelectorAll(".competency-item,.timeline-item,.education-item:not(.no-more)").forEach(card=>{
  if(MOBILE_LAYOUT.matches){card.removeAttribute("tabindex");card.removeAttribute("aria-expanded");return;}
  card.setAttribute("tabindex","0");
  card.setAttribute("aria-expanded","false");
});


if(!MOBILE_LAYOUT.matches)renderCertificates();

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('motion-ready');
const competencyItems=[...document.querySelectorAll('.competency-item')];
const timelineLists=[...document.querySelectorAll('.timeline,.education-list')];
if(reducedMotion){
  competencyItems.forEach(item=>item.classList.add('motion-in'));
  timelineLists.forEach(list=>{
    list.classList.add('motion-line-in');
    list.querySelectorAll('.timeline-item,.education-item').forEach(item=>item.classList.add('motion-in'));
  });
}else{
  let lastScrollY=window.scrollY;
  let scrollDirection='down';
  const competencyTimers=new WeakMap();
  const timelineTimers=new WeakMap();
  const competencySection=document.getElementById('competencies');
  const experienceSection=document.getElementById('experience');
  const resetCompetencies=()=>competencyItems.forEach(item=>{
    clearTimeout(competencyTimers.get(item));
    item.classList.remove('motion-in');
  });
  const resetTimelines=()=>timelineLists.forEach(list=>{
    (timelineTimers.get(list)||[]).forEach(clearTimeout);
    list.classList.remove('motion-line-in');
    list.querySelectorAll('.timeline-item,.education-item').forEach(item=>item.classList.remove('motion-in'));
  });
  window.addEventListener('scroll',()=>{
    const nextScrollY=window.scrollY;
    if(Math.abs(nextScrollY-lastScrollY)>2)scrollDirection=nextScrollY>lastScrollY?'down':'up';
    lastScrollY=nextScrollY;
    if(scrollDirection==='up'){
      if(competencySection.getBoundingClientRect().top>=window.innerHeight*.98)resetCompetencies();
      if(experienceSection.getBoundingClientRect().top>=window.innerHeight*.98)resetTimelines();
    }
  },{passive:true});

  const competencyObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const item=entry.target;
    if(entry.isIntersecting&&scrollDirection==='down'&&!item.classList.contains('motion-in')){
      const index=competencyItems.indexOf(item);
      const timer=setTimeout(()=>item.classList.add('motion-in'),Math.max(0,index)*115);
      competencyTimers.set(item,timer);
      return;
    }
    if(!entry.isIntersecting&&entry.boundingClientRect.top>window.innerHeight*.92){
      clearTimeout(competencyTimers.get(item));
      item.classList.remove('motion-in');
    }
  }),{threshold:.18,rootMargin:'0px 0px -8% 0px'});
  competencyItems.forEach(item=>competencyObserver.observe(item));

  const timelineObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const list=entry.target;
    const items=[...list.querySelectorAll('.timeline-item,.education-item')];
    if(entry.isIntersecting&&scrollDirection==='down'&&!list.classList.contains('motion-line-in')){
      list.classList.add('motion-line-in');
      const timers=items.map((item,index)=>setTimeout(()=>item.classList.add('motion-in'),220+index*145));
      timelineTimers.set(list,timers);
      return;
    }
    if(!entry.isIntersecting&&entry.boundingClientRect.top>window.innerHeight*.92){
      (timelineTimers.get(list)||[]).forEach(clearTimeout);
      list.classList.remove('motion-line-in');
      items.forEach(item=>item.classList.remove('motion-in'));
    }
  }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  timelineLists.forEach(list=>timelineObserver.observe(list));
}
