// Scaled canvas (posterLike): clamp to logical target width + center without margin hacks
(function () {
  var BASE_W = 1080;
  var BASE_H = 1064;
  var TARGET_W = 360;
  var MAX_SCALE = 1;

  function getWrap() {
    return (
      document.getElementById('stage-wrap') ||
      document.getElementById('stageWrapper') ||
      document.querySelector('.stage-wrapper')
    );
  }

  function getSizer() {
    return (
      document.getElementById('stageSizer') ||
      document.querySelector('.stage-sizer')
    );
  }

  function resizeStage() {
    var stage = document.getElementById('stage');
    var wrap = getWrap();
    var sizer = getSizer();
    if (!stage) return;

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var clampW = Math.min(vw, TARGET_W || BASE_W);
    var scale = Math.min(MAX_SCALE, clampW / BASE_W);

    var scaledW = Math.ceil(BASE_W * scale);
    var scaledH = Math.ceil(BASE_H * scale);

    // stage is a fixed-size base canvas; stageSizer is the scaled layout box.
    stage.style.transform = 'scale(' + scale + ')';
    stage.style.transformOrigin = 'top left';
    stage.style.position = 'absolute';
    stage.style.left = '0';
    stage.style.top = '0';
    stage.style.margin = '0';
    stage.style.width = BASE_W + 'px';
    stage.style.height = BASE_H + 'px';

    if (sizer) {
      sizer.style.position = 'relative';
      sizer.style.width = scaledW + 'px';
      sizer.style.height = scaledH + 'px';
    }

    if (wrap) {
      // Keep wrap full-width so horizontal centering can work via flex.
      wrap.style.width = '100%';
      wrap.style.display = 'flex';
      wrap.style.justifyContent = 'center';
      if (scaledH < vh) {
        wrap.style.height = '100vh';
        wrap.style.alignItems = 'center';
      } else {
        wrap.style.height = scaledH + 'px';
        wrap.style.alignItems = 'flex-start';
      }
    }
  }

  window.addEventListener('resize', resizeStage);
  document.addEventListener('DOMContentLoaded', function () {
    resizeStage();
  });
  resizeStage();
})();
