  (function() {
    var menuEl = document.getElementById('ml-menu'),
      mlmenu = new MLMenu(menuEl, {
        // breadcrumbsCtrl : true, // show breadcrumbs
        // initialBreadcrumb : 'all', // initial breadcrumb text
        backCtrl : false, // show back button
        // itemsDelayInterval : 60, // delay between each menu item sliding animation
        onItemClick: loadData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
      });

    // mobile menu toggle
    var openMenuCtrl = document.querySelector('.action--open'),
      closeMenuCtrl = document.querySelector('.action--close');

    openMenuCtrl.addEventListener('click', openMenu);
    closeMenuCtrl.addEventListener('click', closeMenu);

    function openMenu() {
      classie.add(menuEl, 'menu--open');
    }

    function closeMenu() {
      classie.remove(menuEl, 'menu--open');
    }

    // simulate grid content loading
    var gridWrapper = document.querySelector('.content');

    function loadData(ev, itemName) {
      ev.preventDefault();

      closeMenu();
      gridWrapper.innerHTML = '';
      classie.add(gridWrapper, 'content--loading');
      setTimeout(function() {
        classie.remove(gridWrapper, 'content--loading');
        $('#content').html(dummyData[itemName]);

        var wall = new freewall("#content");
        wall.reset({
          selector: '.photo',
          animate: false,
          fixSize: false,
          cellW: 200,
          cellH: 200,
          gutterX: 5,
          gutterY: 5,
          onResize: function() {
            var imgs = $('.photo img');
            for (var i = 0; i < imgs.length; i++) {
              if (imgs[i].height > imgs[i].width) {
                // imgs[i].className = imgs[i].className + " portrait";
                imgs[i].style.width = '100%';
                imgs[i].style.height = 'auto';
              }
            };
            wall.fitWidth();

            $('#content').magnificPopup({
              delegate: 'a',
              gallery: {
                enabled: true,
                tCounter: ''
              },
              type: 'image',
              closeOnBgClick: false,
              image: {
                titleSrc: 'title',
                cursor: ''
              }
            });
          }
        });

        wall.fitWidth();
        $(window).trigger("resize");
      }, 700);


    }
  })();

  function loadHomepage() {
    $('#content').html('<p class="info"></p>');
  }