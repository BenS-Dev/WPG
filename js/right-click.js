
  // Disable right-click
  document.addEventListener('contextmenu', event => event.preventDefault());

  // Disable specific key combos
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U / Ctrl+S
    if ((e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) ||
        (e.ctrlKey && ['U', 'S'].includes(e.key))) {
      e.preventDefault();
    }
  });

