(function () {
  if (!window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var target = document.querySelector(toggle.getAttribute('data-bs-target'));
        if (target) target.classList.toggle('show');
      });
    });
  }

  var backTop = document.getElementById('button');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('show', window.scrollY > 300);
    });
  }

  document.querySelectorAll('[data-qty]').forEach(function (button) {
    button.addEventListener('click', function () {
      var target = document.querySelector(button.dataset.qty);
      if (!target) return;
      var next = Number(target.value || 1) + Number(button.dataset.step || 1);
      var min = Number(target.min || 1);
      var max = Number(target.max || 99);
      target.value = Math.max(min, Math.min(max, next));
    });
  });

  var mainImage = document.querySelector('[data-main-image]');
  if (mainImage) {
    document.querySelectorAll('[data-thumb]').forEach(function (button) {
      button.addEventListener('click', function () {
        mainImage.src = button.dataset.thumb;
        mainImage.alt = button.dataset.alt || mainImage.alt;
        document.querySelectorAll('[data-thumb]').forEach(function (item) {
          item.classList.toggle('active', item === button);
        });
      });
    });
  }
})();
