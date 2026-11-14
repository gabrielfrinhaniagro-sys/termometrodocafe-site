// Página do cartão do dia: mostra abertura e fechamento com compartilhar, baixar e copiar texto.
(function () {
  'use strict';
  var box = document.getElementById('cartoes');
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (k) { e.appendChild(k); });
    return e;
  }
  function dataBR(d) { return d.slice(8, 10) + '/' + d.slice(5, 7); }
  function bloco(nome, c) {
    var aviso = el('p', { class: 'ok' });
    var img = el('img', { src: '/' + c.imagem, alt: 'Cartão de ' + nome.toLowerCase() + ' do Termômetro do Café' });
    var share = el('button', { class: 'pri', type: 'button', text: 'Compartilhar' });
    var baixar = el('a', { class: 'bt', href: '/' + c.imagem, download: 'termometro-' + nome.toLowerCase() + '-' + c.dia + '.png', text: 'Baixar imagem' });
    var copiar = el('button', { type: 'button', text: 'Copiar texto' });
    share.addEventListener('click', function () {
      fetch('/' + c.imagem).then(function (r) { return r.blob(); }).then(function (b) {
        var f = new File([b], 'termometro-do-cafe.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [f] })) return navigator.share({ files: [f], text: c.texto });
        if (navigator.share) return navigator.share({ text: c.texto, url: 'https://termometrodocafe.com.br/zap' });
        aviso.textContent = 'Este navegador não compartilha imagens: use Baixar imagem e Copiar texto.';
      }).catch(function () { /* o usuário cancelou */ });
    });
    copiar.addEventListener('click', function () {
      (navigator.clipboard ? navigator.clipboard.writeText(c.texto) : Promise.reject()).then(function () { aviso.textContent = 'Texto copiado.'; }, function () { aviso.textContent = 'Não deu para copiar: selecione o texto abaixo.'; });
    });
    return el('section', {}, [el('h2', { text: nome + ' · ' + dataBR(c.dia) }), img, el('div', { class: 'bts' }, [share, baixar, copiar]), aviso, el('pre', { text: c.texto })]);
  }
  fetch('/data/cartao.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).then(function (d) {
    box.textContent = '';
    var tem = false;
    [['Fechamento', d.fechamento], ['Abertura', d.abertura]].forEach(function (p) { if (p[1] && p[1].imagem) { tem = true; box.appendChild(bloco(p[0], p[1])); } });
    if (!tem) box.appendChild(el('p', { class: 'vazio', text: 'O primeiro cartão sai no próximo dia útil, a partir de 6h30.' }));
  }).catch(function () { box.textContent = 'Não foi possível carregar o cartão agora.'; });
})();
