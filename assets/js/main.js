
// Main JS for Budņika maskas (no frameworks)
(function(){
  // Sample cart implementation (symbolic)
  const CART_KEY = 'budnika_cart_v1';

  function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)||'[]'); }catch(e){return[]} }
  function saveCart(c){ localStorage.setItem(CART_KEY,JSON.stringify(c)); updateCartCount(); }
  function addToCart(item){ const cart=getCart(); cart.push(item); saveCart(cart); }
  function updateCartCount(){ const c=getCart().length; const els = [document.getElementById('cart-count'),document.getElementById('cart-count-2')]; els.forEach(el=>{ if(el) el.textContent = c; }); }

  function attachCartButtons(){ document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.removeEventListener('click',addHandler);
    btn.addEventListener('click', addHandler);
  }); }
  function addHandler(e){ const id = Number(e.currentTarget.dataset.id||1); addToCart({id,qty:1,addedAt:Date.now()}); e.currentTarget.textContent='Pievienots'; setTimeout(()=>{ e.currentTarget.textContent='Pievienot grozam' },900); }

  // expose to global so inline scripts can call
  window.attachCartButtons = attachCartButtons;
  window.updateCartCount = updateCartCount;

  document.addEventListener('DOMContentLoaded',()=>{
    attachCartButtons(); updateCartCount();

    // tiny decorative fog animation (no heavy libs)
    const fog = document.querySelector('.hero-fog');
    if(fog){ let t=0; setInterval(()=>{ t+=0.01; fog.style.transform = `translateY(${Math.sin(t)*6}px)`; },50); }
  });
})();
