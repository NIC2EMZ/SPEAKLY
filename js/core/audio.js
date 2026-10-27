/* ==========================================================================
   SPEAKLY — audio.js : micro, vumètre temps réel, enregistrement (MediaRecorder)
   ========================================================================== */
(function (global) {
  'use strict';

  var stream = null, ac = null, analyser = null, data = null, srcNode = null;
  var recorder = null, chunks = [], lastBlob = null, lastUrl = null;
  var rafId = null, listeners = [];

  function supported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }
  function recorderSupported() {
    return typeof global.MediaRecorder !== 'undefined';
  }

  function openStream() {
    if (stream) return Promise.resolve(stream);
    if (!supported()) return Promise.reject(new Error('unsupported'));
    return navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
    }).then(function (s) { stream = s; return s; });
  }

  function startMeter(onLevel) {
    return openStream().then(function (s) {
      var AC = global.AudioContext || global.webkitAudioContext;
      if (!AC) return null;
      if (!ac) ac = new AC();
      if (ac.state === 'suspended') ac.resume();
      if (!srcNode) {
        srcNode = ac.createMediaStreamSource(s);
        analyser = ac.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.72;
        data = new Uint8Array(analyser.frequencyBinCount);
        srcNode.connect(analyser);
      }
      listeners = [onLevel];
      loop();
      return analyser;
    }).catch(function (err) {
      if (onLevel) onLevel(-1, err);
      throw err;
    });
  }

  function loop() {
    if (!analyser || !listeners.length) return;
    analyser.getByteTimeDomainData(data);
    var peak = 0, sumSq = 0;
    for (var i = 0; i < data.length; i++) {
      var v = (data[i] - 128) / 128;
      sumSq += v * v;
      if (Math.abs(v) > peak) peak = Math.abs(v);
    }
    var rms = Math.sqrt(sumSq / data.length);
    listeners.forEach(function (fn) { try { fn(global.SK.clamp(rms * 3.4, 0, 1), null, peak); } catch (e) {} });
    rafId = requestAnimationFrame(loop);
  }

  function stopMeter() {
    listeners = [];
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  function startRecording() {
    lastBlob = null;
    return openStream().then(function (s) {
      if (!recorderSupported()) return null;
      chunks = [];
      var mime = '';
      ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'].some(function (m) {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) { mime = m; return true; }
        return false;
      });
      try { recorder = mime ? new MediaRecorder(s, { mimeType: mime }) : new MediaRecorder(s); }
      catch (e) { try { recorder = new MediaRecorder(s); } catch (e2) { recorder = null; return null; } }
      recorder.ondataavailable = function (ev) { if (ev.data && ev.data.size) chunks.push(ev.data); };
      recorder.start(900);
      return recorder;
    });
  }

  function stopRecording() {
    return new Promise(function (resolve) {
      if (!recorder || recorder.state === 'inactive') { resolve(lastBlob); return; }
      recorder.onstop = function () {
        try {
          lastBlob = new Blob(chunks, { type: (chunks[0] && chunks[0].type) || 'audio/webm' });
          if (lastUrl) { try { URL.revokeObjectURL(lastUrl); } catch (e) {} }
          lastUrl = URL.createObjectURL(lastBlob);
        } catch (e) { lastBlob = null; }
        resolve(lastBlob);
      };
      try { recorder.stop(); } catch (e) { resolve(null); }
    });
  }

  function release() {
    stopMeter();
    if (stream) { stream.getTracks().forEach(function (t) { try { t.stop(); } catch (e) {} }); stream = null; srcNode = null; }
    if (ac) { try { ac.close(); } catch (e) {} ac = null; }
    recorder = null;
  }

  function blob() { return lastBlob; }
  function url() { return lastUrl; }
  function hasStream() { return !!stream; }

  global.SK.Audio = {
    supported: supported, recorderSupported: recorderSupported,
    startMeter: startMeter, stopMeter: stopMeter,
    startRecording: startRecording, stopRecording: stopRecording, release: release,
    blob: blob, url: url, hasStream: hasStream
  };
})(window);
