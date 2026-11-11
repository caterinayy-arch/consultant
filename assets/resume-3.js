let mobileCertificateOpener = null;
let mobileCertificateOverflow = '';
const mobileCertificateZoom = document.createElement('button');
mobileCertificateZoom.className = 'mobile-cert-zoom';
mobileCertificateZoom.type = 'button';
mobileCertificateZoom.textContent = '放大查看';
mobileCertificateZoom.setAttribute('aria-pressed','false');
document.querySelector('.cert-viewer').append(mobileCertificateZoom);
function resetMobileCertificateZoom(){
  const viewport = document.querySelector('.cert-viewer-image');
  viewport.classList.remove('mobile-cert-magnified');
  viewport.scrollTop = 0;
  viewport.scrollLeft = 0;
  mobileCertificateZoom.textContent = '放大查看';
  mobileCertificateZoom.setAttribute('aria-pressed','false');
}
function openMobileCertificate(index){
  const modal = document.getElementById('certModal');
  if(!modal.classList.contains('open')){
    mobileCertificateOpener = document.activeElement;
    mobileCertificateOverflow = document.body.style.overflow;
  }
  certSlideIndex = Math.max(0,CERTIFICATE_SLIDES.findIndex(slide => slide.certIndex === index));
  updateCertViewer();
  resetMobileCertificateZoom();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.cert-close').focus({preventScroll:true});
}
function closeMobileCertificate(){
  const modal = document.getElementById('certModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = mobileCertificateOverflow;
  resetMobileCertificateZoom();
  mobileCertificateOpener?.focus({preventScroll:true});
}
mobileCertificateZoom.onclick = () => {
  const viewport = document.querySelector('.cert-viewer-image');
  const magnified = viewport.classList.toggle('mobile-cert-magnified');
  viewport.scrollTop=0;viewport.scrollLeft=0;
  mobileCertificateZoom.textContent = magnified ? '适应屏幕' : '放大查看';
  mobileCertificateZoom.setAttribute('aria-pressed',String(magnified));
};
document.getElementById('certModal').addEventListener('keydown',event => {
  if(!MOBILE_LAYOUT.matches || event.key!=='Tab')return;
  const controls=[...event.currentTarget.querySelectorAll('button')].filter(el=>el.getClientRects().length&&!el.disabled);
  const first=controls[0],last=controls[controls.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});
