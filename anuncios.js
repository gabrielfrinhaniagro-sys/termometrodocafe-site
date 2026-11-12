// Anúncios do Google AdSense com aviso de cookies (LGPD).
// Sem escolha feita: mostra o aviso e carrega anúncios não personalizados (sem perfil do visitante).
// "Aceitar": anúncios personalizados. "Só o necessário": continua com anúncios não personalizados.
(function () {
  'use strict';
  var CLIENTE = 'ca-pub-7386019894279159';
  var CHAVE = 'tc-cookies';
  var escolha = null;
  try { escolha = localStorage.getItem(CHAVE); } catch (e) { /* navegador sem armazenamento: segue sem lembrar */ }

  function carregar(personalizados) {
    if (document.getElementById('tc-adsense')) return;
    window.adsbygoogle = window.adsbygoogle || [];
    if (!personalizados) window.adsbygoogle.requestNonPersonalizedAds = 1;
    var s = document.createElement('script');
    s.id = 'tc-adsense';
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENTE;
    document.head.appendChild(s);
  }

  function guardar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) { /* sem armazenamento */ } }

  function aviso() {
    var box = document.createElement('div');
    box.className = 'cookies';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Aviso de cookies');
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Este site é gratuito e se mantém com anúncios do Google, que usam cookies. Você escolhe se os anúncios podem ser personalizados. '));
    var a = document.createElement('a');
    a.href = 'privacidade.html';
    a.textContent = 'Saiba mais';
    p.appendChild(a);
    var bt = document.createElement('div');
    bt.className = 'cookies-bt';
    var nao = document.createElement('button');
    nao.type = 'button';
    nao.textContent = 'Só o necessário';
    var sim = document.createElement('button');
    sim.type = 'button';
    sim.className = 'sim';
    sim.textContent = 'Aceitar';
    nao.addEventListener('click', function () { guardar('basico'); box.remove(); });
    sim.addEventListener('click', function () { guardar('todos'); box.remove(); location.reload(); });
    bt.appendChild(nao); bt.appendChild(sim);
    box.appendChild(p); box.appendChild(bt);
    document.body.appendChild(box);
  }

  function iniciar() {
    carregar(escolha === 'todos');
    if (!escolha) aviso();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
