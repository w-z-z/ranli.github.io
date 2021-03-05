  // cvv image
  jQuery(function ($) {
    $(".cvv-link").click(function () {
      $(this).siblings(".cvv-image").slideToggle();
    });
  });

  // cvv image
  jQuery(function ($) {
    $(".cvv-link").click(function () {
      $(this).parent().siblings(".cvv-image").slideToggle();
    });
  });
  jQuery(function ($) {
    $(".cvv-link").click(function () {
      $(this).parent().parent().siblings(".cvv-image").slideToggle();
    });
  });

  // anchor
  jQuery(function ($) {
    $('a[href^="#"]').click(function () {
      var target = $(this).attr("href");
      if (target) {
        $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
      }
      return false;
    });
  });
  // end anchor

  // fades
  $(function () {
    /*-------------------animation----------------------*/
    $("#fades p").hide();
    function fades($div, cb) {
      $div.fadeIn(2000, function () {
        $div.fadeOut(2000, function () {
          var $next = $div.next();
          if ($next.length > 0) {
            fades($next, cb);
          } else {
            // The last element has faded away, call the callback
            cb();
          }
        });
      });
    }

    function startFading($firstDiv) {
      fades($firstDiv, function () {
        startFading($firstDiv);
      });
    }

    startFading($("#fades p:first-child"));
  });
  /*-------------------animation----------------------*/
  // end fades

  //date 2
  jQuery(function($){
    var date = new Date();
    var shipdate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + Number($("#lf-shipdate").attr("addDays")));

    var options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    $("#lf-shipdate").html(shipdate.toLocaleDateString($("#lf-shipdate").attr("data-locale"), options));
  });
  //date end

  // clock
  jQuery(function ($) {
    var spd = 100;
    var spdVal = 10;
    var cntDown = 10 * 60 * spdVal;
    setInterval(function () {
      var mn, sc, ms;
      cntDown--;
      if (cntDown < 0) {
        return false;
      }
      mn = Math.floor(cntDown / spdVal / 60);
      mn = mn < 10 ? "0" + mn : mn;
      sc = Math.floor((cntDown / spdVal) % 60);
      sc = sc < 10 ? "0" + sc : sc;
      ms = Math.floor(cntDown % spdVal);
      ms = ms < 10 ? "0" + ms : ms;
      var result = mn + ":" + sc;
      if (document.getElementById("time")) {
        document.getElementById("time").innerHTML = result;
      }
    }, spd);
  });
  // end clock


  // clock 16
  jQuery(function ($) {
    var spd = 100;
    var spdVal = 16;
    var cntDown = 16 * 60 * spdVal;
    setInterval(function () {
      var mn, sc, ms;
      cntDown--;
      if (cntDown < 0) {
        return false;
      }
      mn = Math.floor(cntDown / spdVal / 60);
      mn = mn < 10 ? "0" + mn : mn;
      sc = Math.floor((cntDown / spdVal) % 60);
      sc = sc < 10 ? "0" + sc : sc;
      ms = Math.floor(cntDown % spdVal);
      ms = ms < 10 ? "0" + ms : ms;
      var result = mn + ":" + sc;
      if (document.getElementById("time16")) {
        document.getElementById("time16").innerHTML = result;
      }
    }, spd);
  });
  // end clock

    // clock 2 minutes
    jQuery(function ($) {
      var spd = 100;
      var spdVal = 10;
      var cntDown = 2 * 60 * spdVal;
      setInterval(function () {
        var mn, sc, ms;
        cntDown--;
        if (cntDown < 0) {
          return false;
        }
        mn = Math.floor(cntDown / spdVal / 60);
        mn = mn < 10 ? "0" + mn : mn;
        sc = Math.floor((cntDown / spdVal) % 60);
        sc = sc < 10 ? "0" + sc : sc;
        ms = Math.floor(cntDown % spdVal);
        ms = ms < 10 ? "0" + ms : ms;
        var result = mn + ":" + sc;
        if (document.getElementById("timer")) {
          document.getElementById("timer").innerHTML = result;
        }
      }, spd);
    });
    // end clock 2 minutes

  // popup
  jQuery(function ($) {
    var OpenPopupLink = $("a.open-popup-link");
    var ClosePopupLink = $("a.close-popup-link");
    var PopupWrapper = $(".popup-wrapper");

    OpenPopupLink.click(function () {
      var clickId = this.id;
      $("#popup-" + clickId).fadeIn(300);
      PopupWrapper.fadeIn(300);
      $("body").css("overflow", "hidden").css("height", "100%");
    });
    ClosePopupLink.click(function () {
      $(this).parents(".popup").fadeOut(300);
      PopupWrapper.fadeOut(300);
      $("body").css("overflow", "auto").css("height", "auto");
    });
    $(document).keydown(function (eventObject) {
      if ($('[id^="popup-"]').is(":visible")) {
        if (eventObject.which == "27") {
          $('[id^="popup-"]').fadeOut(300);
          PopupWrapper.fadeOut(300);
          $("body").css("overflow", "auto").css("height", "auto");
        }
      }
    });
  });
  // end popup

  //date
  jQuery(function ($) {
    var mydate = new Date();
    var montharray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    $(".date-container").text(" " + montharray[mydate.getMonth()] + " " + mydate.getDate() + ", " + mydate.getFullYear());
  });
  //date end

  jQuery(function ($) {
    var mydate = new Date();
    var montharray = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    $(".date-container_fr").text(mydate.getDate() + " " + montharray[mydate.getMonth()] + " " + " " + mydate.getFullYear());
  });
  
  jQuery(function($) {
    var mydate = new Date();
    var month = mydate.getMonth() + 1;
    var dayarray = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi ",
      "Jeudi",
      "Vendredi",
      "Samedi"];
    $('.date-container2_fr').
        text(dayarray[mydate.getDay()] + ', ' + mydate.getDate() + '/' + month + '/' + mydate.getFullYear());
  });
  
  jQuery(function ($) {
    var mydate = new Date();
    var montharray = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    $(".date-container_es").text("de " + mydate.getDate() + " de " + montharray[mydate.getMonth()] + " de " +  mydate.getFullYear());
  });
  

  jQuery(function($) {
    var mydate = new Date();
    var month = mydate.getMonth() + 1;
    var dayarray = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'];
    $('.date-container2').
        text(dayarray[mydate.getDay()] + ', ' + month + '/'
            + mydate.getDate() + '/' + mydate.getFullYear());
  });
  

  
  jQuery(function($) {
    var mydate = new Date();
    var month = mydate.getMonth() + 1;
    var dayarray = [
      'Bomingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'];
    $('.date-container2_es').
        text(dayarray[mydate.getDay()] + ', ' + month + '/'
            + mydate.getDate() + '/' + mydate.getFullYear());
  });

  //---------------------modal------------------//
  $('.modal-link').click(function(event) {
    event.preventDefault();
    this.blur();
    $.get(this.href, function(html) {
      $(html).appendTo('body').modal({
        fadeDuration: 100,
        fadeDelay: 0.30,
      });
      if($('.popup').hasClass('geo-terms')) {
         changeGeo ();
      }
    });
  });
  //---------------------End modal------------------//
