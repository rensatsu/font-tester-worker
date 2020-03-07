(function() {
  const LinkGFT = {
    fontList: [],
    init: function() {
      const gftStyle = document.createElement('style');
      gftStyle.id = 'link-gft-css0';
      gftStyle.innerHTML = `
                .link-gft-container {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 400px;
                    background: #fff;
                    padding: 3px 7px;
                    border: 1px solid #f00;
                    border-width: 1px 1px 0 0;
                    font-size: 14px !important;
                    line-height: 1.5 !important;
                    z-index: 99999999;
                    color: #000;
                }

                .link-gft-container, .link-gft-container * {
                    font-family: monospace !important;
                }

                .link-gft-select {
                    width: 100%;
                    background: #fff;
                    color: #000;
                    padding: 0;
                    margin: 5px 0;
                    border: 1px solid #777;
                    box-shadow: none;
                }

                .link-gft-notification {
                    background-color: #fcb;
                    padding: 5px;
                }

                .link-gft-notification p {
                    margin: 0;
                }
            `;

      document.head.appendChild(gftStyle);

      fetch('https://fonts-api.rencloud.workers.dev/fonts', { method: 'get' })
        .then(
          response => {
            return response.json();
          },
          e => {
            console.log(
              '[GFT]',
              'Error loading Google Font Tester, fallback to predefined list',
              e,
            );
          },
        )
        .then(json => {
          if (json && json.fonts) {
            this.fontList = json && json.fonts ? json.fonts : [];
          } else {
            this.fontList = [
              'Andika',
              'Anonymous Pro',
              'Arimo',
              'Bad Script',
              'Comfortaa',
              'Cormorant',
              'Cormorant Garamond',
              'Cormorant Infant',
              'Cormorant SC',
              'Cormorant Unicase',
              'Cousine',
              'Cuprum',
              'Didact Gothic',
              'EB Garamond',
              'El Messiri',
              'Exo 2',
              'Fira Mono',
              'Fira Sans',
              'Fira Sans Condensed',
              'Fira Sans Extra Condensed',
              'Forum',
              'Istok Web',
              'Jura',
              'Kelly Slab',
              'Kurale',
              'Ledger',
              'Lobster',
              'Lora',
              'Marck Script',
              'Marmelad',
              'Merriweather',
              'Neucha',
              'Noto Sans',
              'Noto Serif',
              'Open Sans',
              'Open Sans Condensed',
              'Oranienbaum',
              'PT Mono',
              'PT Sans',
              'PT Sans Caption',
              'PT Sans Narrow',
              'PT Serif',
              'PT Serif Caption',
              'Pattaya',
              'Philosopher',
              'Play',
              'Playfair Display',
              'Playfair Display SC',
              'Poiret One',
              'Press Start 2P',
              'Prosto One',
              'Roboto',
              'Roboto Condensed',
              'Roboto Mono',
              'Roboto Slab',
              'Rubik',
              'Rubik Mono One',
              'Rubik One',
              'Ruslan Display',
              'Russo One',
              'Scada',
              'Seymour One',
              'Stalinist One',
              'Tenor Sans',
              'Tinos',
              'Ubuntu',
              'Ubuntu Condensed',
              'Ubuntu Mono',
              'Underdog',
              'Yeseva One',
            ];
          }

          this.runApp();
        });
    },

    runApp: function() {
      if (document.querySelector('#link-gft-select') === null) {
        gFonts = this.fontList.sort();

        const gftContainer = document.createElement('div');
        gftContainer.classList.add('link-gft-container');
        gftContainer.textContent = 'Google Fonts Tester:';

        const gftFontSelect = document.createElement('select');
        gftFontSelect.classList.add('link-gft-select');

        gFonts.forEach(font => {
          const option = document.createElement('option');
          option.value = font;
          option.textContent = font;
          gftFontSelect.append(option);
        });

        const gftNotification = document.createElement('div');
        gftNotification.classList.add('link-gft-notification');

        const gftNotificationText = document.createElement('p');
        gftNotificationText.textContent = 'GFT is no longer supported.';

        const gftNotificationLink = document.createElement('a');

        gftNotificationLink.textContent = 'Snapfont is a good alternative.';
        gftNotificationLink.href = 'https://getsnapfont.com/';
        gftNotificationLink.target = '_blank';
        gftNotificationLink.rel = 'nofollow';

        gftNotification.append(gftNotificationText, gftNotificationLink);
        gftContainer.append(gftFontSelect, gftNotification);

        document.body.appendChild(gftContainer);

        gftFontSelect.addEventListener('change', function() {
          const font = this.value;

          if (font.length > 0) {
            const fontesc = encodeURIComponent(font);

            if (document.querySelector('#link-gft-css1') !== null) {
              document.querySelector('#link-gft-css1').remove();
            }

            if (document.querySelector('#link-gft-css2') !== null) {
              document.querySelector('#link-gft-css2').remove();
            }

            const cssLink = document.createElement('link');
            cssLink.href = `https://fonts.googleapis.com/css?family=${fontesc}:400,800&subset=latin,cyrillic`;
            cssLink.rel = 'stylesheet';
            cssLink.id = 'link-gft-css1';

            document.head.appendChild(cssLink);

            const cssStyle = document.createElement('style');
            cssStyle.innerHTML = `* {font-family: '${font}' !important;}`;
            cssStyle.id = 'link-gft-css2';

            document.head.appendChild(cssStyle);
          }
        });
      } else {
        alert('Google Fonts Tester [GFT] is already loaded!');
      }
    },
  };

  LinkGFT.init();
})();
