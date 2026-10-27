/* ==========================================================================
   SPEAKLY — charts.js : mini-graphes SVG/CSS (semaine, heatmap, courbe)
   ========================================================================== */
(function (global) {
  'use strict';
  var U = global.SK;

  /** Barres des 7 derniers jours. series = [{label, seconds, today}] */
  function weekBars(series) {
    var max = Math.max.apply(null, series.map(function (s) { return s.seconds; }).concat([60]));
    var wrap = U.el('div.bars');
    series.forEach(function (s) {
      var h = U.clamp(Math.round((s.seconds / max) * 58), 5, 58);
      var col = U.el('div.b' + (s.today ? '.today' : ''), [
        U.el('i', { style: { height: '5px' }, title: U.fmtDuration(s.seconds) }),
        U.el('span', { text: s.label })
      ]);
      wrap.appendChild(col);
      setTimeout(function () { col.querySelector('i').style.height = h + 'px'; }, 80 + Math.random() * 120);
    });
    return wrap;
  }

  /** Heatmap 12 semaines × 7 jours. days = [{day, seconds}] (+ repère aujourd'hui) */
  function heatmap(days) {
    var wrap = U.el('div');
    var grid = U.el('div.heat');
    var max = Math.max.apply(null, days.map(function (d) { return d.seconds; }).concat([180]));
    days.forEach(function (d) {
      var lvl = d.seconds <= 0 ? 0 : U.clamp(Math.ceil((d.seconds / max) * 4), 1, 4);
      var cell = U.el('i' + (lvl ? '.l' + lvl : '') + (d.today ? '.today' : ''), { title: d.day + ' — ' + U.fmtDuration(d.seconds) });
      grid.appendChild(cell);
    });
    wrap.appendChild(grid);
    var labels = U.el('div.heat-labels');
    ['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach(function (l) { labels.appendChild(U.el('span', { text: l })); });
    wrap.appendChild(labels);
    return wrap;
  }

  /** Sparkline des scores des dernières sessions. */
  function scoreLine(scores, width, height) {
    width = width || 288; height = height || 72;
    if (!scores.length) scores = [0, 0];
    if (scores.length === 1) scores = [scores[0] * 0.6, scores[0]];
    var max = 100, min = 0;
    var step = width / (scores.length - 1);
    var pts = scores.map(function (v, i) {
      var x = i * step;
      var y = height - ((v - min) / (max - min)) * (height - 8) - 4;
      return [x, y];
    });
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var area = line + ' L' + width + ' ' + height + ' L0 ' + height + ' Z';
    var svg = U.html(
      '<svg viewBox="0 0 ' + width + ' ' + height + '" width="100%" height="' + height + '" preserveAspectRatio="none">' +
        '<defs><linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#8B6FF0" stop-opacity=".34"/>' +
          '<stop offset="100%" stop-color="#8B6FF0" stop-opacity="0"/>' +
        '</linearGradient></defs>' +
        '<path d="' + area + '" fill="url(#lineFill)"/>' +
        '<path d="' + line + '" fill="none" stroke="#6C4BE8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<circle cx="' + pts[pts.length - 1][0].toFixed(1) + '" cy="' + pts[pts.length - 1][1].toFixed(1) + '" r="4" fill="#4B2FD6" stroke="#fff" stroke-width="2"/>' +
      '</svg>'
    );
    return U.el('div', { style: { marginTop: '6px' } }, svg);
  }

  /** Répartition (mini barres horizontales) pour les objectifs travaillés. */
  function distribution(items) {
    var max = Math.max.apply(null, items.map(function (i) { return i.value; }).concat([1]));
    var wrap = U.el('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } });
    items.forEach(function (it) {
      wrap.appendChild(U.el('div', [
        U.el('div.row-between', { style: { marginBottom: '5px' } }, [
          U.el('span', { style: { fontSize: '12.5px', fontWeight: '700' }, text: it.label }),
          U.el('span', { style: { fontSize: '12px', fontWeight: '800', color: '#5B5578' }, text: String(it.value) + (it.suffix || '') })
        ]),
        U.el('div.bar', [U.el('i', { style: { width: U.clamp((it.value / max) * 100, 3, 100) + '%', background: it.color || '' } })])
      ]));
    });
    return wrap;
  }

  global.SK.Charts = { weekBars: weekBars, heatmap: heatmap, scoreLine: scoreLine, distribution: distribution };
})(window);
