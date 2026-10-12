/**
 * Site header behaviour: the EU global banner's "How do you know?" and the
 * language menu. Plain script, no dependencies; loaded by index.html.
 *
 * The language menu lists the options of the app's own language list
 * (#language-select, kept in the page but hidden). Choosing a language sets
 * that list's value and fires its "change" event, so the app's language
 * switching (js/app.js) works unchanged. A new <option> appears in the menu
 * by itself.
 */
(function () {
  'use strict';

  // Opens and closes a button's panel; Escape and a click elsewhere close it.
  function disclosure(button, panel, onOpen) {
    function setOpen(open) {
      if (open && onOpen) onOpen();
      button.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    }
    function isOpen() {
      return button.getAttribute('aria-expanded') === 'true';
    }
    button.addEventListener('click', function () {
      setOpen(!isOpen());
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        button.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (isOpen() && !button.contains(e.target) && !panel.contains(e.target)) {
        setOpen(false);
      }
    });
    return setOpen;
  }

  // EU global banner.
  var globanButton = document.querySelector('.ted-globan__toggle');
  var globanPanel = document.getElementById('ted-globan-dropdown');
  if (globanButton && globanPanel) {
    disclosure(globanButton, globanPanel);
  }

  // Language menu.
  var languageButton = document.querySelector('.ted-language__button');
  var languageMenu = document.getElementById('ted-language-menu');
  var select = document.getElementById('language-select');
  if (!languageButton || !languageMenu || !select) return;

  var current = languageButton.querySelector('.ted-language__current');

  function showCurrent() {
    var option = select.options[select.selectedIndex];
    if (!option) return;
    current.textContent = option.textContent;
    languageButton.setAttribute('aria-label', 'Change language, ' + option.textContent);
  }

  function buildMenu() {
    languageMenu.innerHTML = '';
    Array.prototype.forEach.call(select.options, function (option) {
      var item = document.createElement('li');
      var choice = document.createElement('button');
      choice.type = 'button';
      choice.lang = option.value;
      choice.textContent = option.textContent;
      if (option.selected) choice.setAttribute('aria-current', 'true');
      choice.addEventListener('click', function () {
        setLanguageMenuOpen(false);
        languageButton.focus();
        if (select.value !== option.value) {
          select.value = option.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          showCurrent();
        }
      });
      item.appendChild(choice);
      languageMenu.appendChild(item);
    });
  }

  var setLanguageMenuOpen = disclosure(languageButton, languageMenu, buildMenu);
  showCurrent();
})();
