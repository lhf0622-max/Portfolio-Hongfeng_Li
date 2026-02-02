window.copyToClipboard = function (text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const originalContent = element.innerHTML;
    const originalWidth = element.offsetWidth;

    element.style.width = originalWidth + 'px';
    element.innerHTML =
      "<span class='font-bold tracking-widest'>COPIED!</span>";

    setTimeout(() => {
      element.innerHTML = originalContent;
      element.style.width = 'auto';
    }, 1500);
  }).catch(() => {
    alert("Copy failed, please copy manually.");
  });
};
