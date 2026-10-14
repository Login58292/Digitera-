'use strict';
const $ = id => document.getElementById(id);
const projects = window.DIGITERA_PROJECTS;
const grid = $('project-grid');
const dialog = $('project-dialog');
let selected, slide = 0;
function render(filter = 'all') {
 const list = projects.filter(p => filter === 'all' || p.categories.includes(filter));
 grid.replaceChildren(...list.map((p) => {
  const button = document.createElement('button'); button.type='button'; button.className='project-card'; button.dataset.project=p.id;
  button.setAttribute('aria-label',`Explore ${p.title}`);
  button.innerHTML=`<div class="project-image"><img src="assets/${p.cover}.webp" alt="${p.title} project artwork" loading="lazy" width="1000" height="800"><span class="project-chip">${p.categories[0]}</span><span class="project-open" aria-hidden="true">↗</span></div><div class="project-meta"><div><h3>${p.title}</h3><p>${p.subtitle}</p></div><span class="project-number">0${projects.indexOf(p)+1}</span></div>`;
  return button;
 }));
 $('result-count').textContent=`${list.length} selected project${list.length===1?'':'s'}`;
}
render();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render(button.dataset.filter);
}));
function gallery(index){
 slide=(index+selected.images.length)%selected.images.length;
 $('gallery-image').src=`assets/${selected.images[slide]}.webp`;
 $('gallery-image').alt=`${selected.title} — project image ${slide+1}`;
 $('gallery-position').textContent=`${slide+1} / ${selected.images.length}`;
 $('gallery-dots').replaceChildren(...selected.images.map((_,i)=>{const b=document.createElement('button');b.type='button';b.className=i===slide?'active':'';b.setAttribute('aria-label',`Show image ${i+1}`);b.setAttribute('aria-pressed',String(i===slide));b.onclick=()=>gallery(i);return b;}));
}
function tab(name){['overview','deliverables'].forEach(n=>{const active=n===name;$('tab-'+n).setAttribute('aria-selected',String(active));$('tab-'+n).tabIndex=active?0:-1;$('panel-'+n).hidden=!active;});}
function openProject(id){
 selected=projects.find(p=>p.id===id);if(!selected)return;
 $('project-title').textContent=selected.title;$('project-subtitle').textContent=selected.subtitle;$('project-description').textContent=selected.description;
 $('project-category').textContent=selected.categories.join(' / ');$('panel-overview').textContent=selected.overview;
 const ul=document.createElement('ul');selected.deliverables.forEach(item=>{const li=document.createElement('li');li.textContent=item;ul.append(li);});$('panel-deliverables').replaceChildren(ul);
 gallery(0);tab('overview');dialog.showModal();document.body.style.overflow='hidden';
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(b)openProject(b.dataset.project);});
$('project-close').onclick=()=>dialog.close();$('gallery-prev').onclick=()=>gallery(slide-1);$('gallery-next').onclick=()=>gallery(slide+1);
['overview','deliverables'].forEach(name=>{$('tab-'+name).onclick=()=>tab(name);$('tab-'+name).onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'overview':e.key==='End'?'deliverables':name==='overview'?'deliverables':'overview';tab(next);$('tab-'+next).focus();}};});
dialog.addEventListener('keydown',e=>{if(e.target.closest('.modal-gallery')&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();gallery(slide+(e.key==='ArrowRight'?1:-1));}});
$('project-enquire').onclick=()=>{ $('message').value=`I'd like to discuss a project inspired by ${selected.title}. `;dialog.close();setTimeout(()=>$('name').focus({preventScroll:true}),200);};
const privacy=$('privacy-dialog');$('privacy-open').onclick=()=>{privacy.showModal();document.body.style.overflow='hidden';};$('privacy-close').onclick=()=>privacy.close();
[dialog,privacy].forEach(d=>{d.addEventListener('close',()=>document.body.style.overflow='');d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
const menu=document.querySelector('[aria-controls="mobile-nav"]');const mobile=$('mobile-nav');
function closeMenu(){mobile.hidden=true;menu.setAttribute('aria-expanded','false');}
menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mobile.hidden=!open;};
mobile.querySelectorAll('a').forEach(a=>a.onclick=closeMenu);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>600)closeMenu();});
$('contact-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const text=`Hi Rubab,\n\nI'm ${$('name').value.trim()}.\nEmail: ${$('email').value.trim()}\nService: ${$('service').value}\n\n${$('message').value.trim()}`;const email=e.submitter?.value==='email';const url=email?`mailto:digitera.info@gmail.com?subject=${encodeURIComponent('DigiTera project enquiry — '+$('service').value)}&body=${encodeURIComponent(text)}`:`https://wa.me/923191520187?text=${encodeURIComponent(text)}`;if(email)window.location.href=url;else window.open(url,'_blank','noopener,noreferrer');$('form-status').textContent=`Your ${email?'email':'WhatsApp'} draft is ready to open. Review it in your app and send when you’re ready.`;});
$('copy-email').onclick=async()=>{try{await navigator.clipboard.writeText('digitera.info@gmail.com');$('toast').textContent='Email address copied';$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2500);}catch{$('copy-email').textContent='digitera.info@gmail.com';}};
$('year').textContent=new Date().getFullYear();
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();})));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-heading,.services-intro,.about-copy,.teaching-list article,.process-grid article').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}


// Accessible testimonial carousel: native touch scrolling with keyboard-friendly controls.
const reviewsTrack = $('reviews-track');
if (reviewsTrack) {
 const cards = Array.from(reviewsTrack.querySelectorAll('.review-card'));
 const previous = $('reviews-prev');
 const next = $('reviews-next');
 const current = $('reviews-current');
 const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let scheduled = false;
 function updateReviewControls() {
  const max = Math.max(0, reviewsTrack.scrollWidth - reviewsTrack.clientWidth);
  previous.disabled = reviewsTrack.scrollLeft <= 3;
  next.disabled = reviewsTrack.scrollLeft >= max - 3;
  if (cards.length) {
   const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].getBoundingClientRect().width;
   const firstVisible = Math.min(cards.length - 1, Math.max(0, Math.round(reviewsTrack.scrollLeft / Math.max(1, step))));
   current.textContent = String(firstVisible + 1).padStart(2, '0');
  }
 }
 function moveReview(direction) {
  if (!cards.length) return;
  const distance = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].getBoundingClientRect().width;
  reviewsTrack.scrollBy({ left: distance * direction, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
 }
 previous.addEventListener('click', () => moveReview(-1));
 next.addEventListener('click', () => moveReview(1));
 reviewsTrack.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => { scheduled = false; updateReviewControls(); });
 }, { passive: true });
 window.addEventListener('resize', updateReviewControls);
 updateReviewControls();
}
