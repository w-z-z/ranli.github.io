window.dataLayer = window.dataLayer || [];

function urlParam(name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
}

function getState() {
  var url = "/ajax/state";
  var uid = urlParam("uid");

  if (uid) {
    url += "?uid=" + uid;
  }

  $.ajaxSetup({ cache: false });
  // $.get(url, function (res) {
    const res={"data":{"availableProducts":[{"fullprice":198,"name":"ant-ca-5","price":39.6,"quantity":5,"sku":"39","templates":{"retail":"66.00","save":"132.00","title":"KETO Body Trim"}},{"fullprice":149,"name":"ant-ca-3","price":49.67,"quantity":3,"sku":"40","templates":{"retail":"74.50","save":"74.50","title":"KETO Body Trim"}},{"fullprice":69.95,"name":"ant-ca-1","price":60,"quantity":1,"sku":"41","templates":{"retail":"69.95","save":"0.00","title":"KETO Body Trim"}}],"availableUpsales":[],"description":"","geo":{"city":"","code":"US","country":"United States","zip":""},"pixels":[],"profile":{"billing":{"firstName":"","lastName":"","country":"","address":"","city":"","state":"","zipCode":""},"shipping":{"country":"","address":"","city":"","state":"","zipCode":""},"upsales":[],"user":{"firstName":"","lastName":"","email":"","phone":""}},"query":{"netid":"2","price":"","sid":"429974-344","sid2":"11_84482417_60492f70-4f0b-4015-9454-886b57bf2214"},"segment":{"aff":"429974-344","net":"2","page":"keto_bodytrim/v2","sub":""},"state":"new","templates":{"phone":"888 315 0311","title":"Keto Body Trim"},"transaction_id":""},"success":true}
    var state = res.data.state;
    var segment = res.data.segment;
    var user = res.data.profile.user;
    var shipping = res.data.profile.shipping;

    if (user) {
      $('#shipping').find('input[name="firstName"]').val(user.firstName);
      $('#shipping').find('input[name="lastName"]').val(user.lastName);
      $('#shipping').find('input[name="phone"]').val(user.phone);
      $('#shipping').find('input[name="email"]').val(user.email);
    }
    if (shipping) {
      $('#shipping').find('input[name="address"]').val(shipping.address);
      if (shipping.country.length) $('#shipping').find('#id_country').val(shipping.country);
      $('#shipping').find('#id_state').val(shipping.state);
      $('#shipping').find('input[name="city"]').val(shipping.city);
      $('#shipping').find('input[name="zipCode"]').val(shipping.zipCode);
    }
    
    window.dataLayer.push({
      segmentAff: segment.aff,
      segmentNet: segment.net,
      segmentSub: segment.sub,
      segmentPage: segment.page,
    });

    var r = $.urlParam("r");
    var isDirect = r === "direct";

    if (isDirect && state === "partial" && shipping.address.length) {
      window.location.pathname = "/offer/keto_bodytrim/v2/order.html";
    }

    if (state === "purchase") {
      window.location.pathname = "/offer/keto_bodytrim/v2/confirmation.html";
    } else if (state === "declined") {
      window.location.pathname = "/offer/keto_bodytrim/v2/declined.html";
    }
  // });
}

getState();

$(document).ready(function () {

  // $('.single-item').slick({
  //   arrows: false,
  //   dots: true,
  //   autoplay: true,
  //   autoplaySpeed: 2600,
  // });

  $("#shipping").validate({
    submitHandler: function () {
      $(".popup-loading-wrapper").show();

      var firstName = $('#shipping').find('input[name="firstName"]').val();
      var lastname = $('#shipping').find('input[name="lastName"]').val();
      var phone = $('#shipping').find('input[name="phone"]').val();
      var email = $('#shipping').find('input[name="email"]').val();
      var address = $('#shipping').find('input[name="address"]').val();
      var country = $('#shipping').find('#id_country').val();
      var state = $('#shipping').find('#id_state').val();
      var city = $('#shipping').find('input[name="city"]').val();
      var zipCode = $('#shipping').find('input[name="zipCode"]').val();

      var formData = {
        user:{
          "firstName": firstName,"lastName": lastname,"email": email,"phone": phone.replace(/\D/g, ""),
        },
        shippingAddress:{
          address,
          country,
          city,
          state,
          zipCode,
        },
        billingAddress:{
          address,
          country,
          city,
          state,
          zipCode,
        },
        sameBillingAddress: true,
        partial: true,
      };
      // console.log(formData);
      var url = '/ajax/order';
      var uid = urlParam("uid");
      if (uid) {
        url = '/ajax/order' + "?uid=" + uid;
      }

      // $.post(url, formData, function(res) {
      //   if (res.success) {
      //     window.dataLayer.push({ 
      //       'event': 'SendingShippingForm', 
      //       'typeForm': 'fullFormDesktop',
      //     });
          // window.location.pathname = "KETOBodyTrimRush.html";
      //   } else {
          //
      //   }
      // })
     setTimeout(() => {
        window.dataLayer.push({ 
          'event': 'SendingShippingForm', 
          'typeForm': 'fullFormDesktop',
        });
        defaultAnalytics.logEvent('add-personalInfo',formData);
        window.location.href = "./KETOBodyTrimRush.html?oid=12";
      $(".popup-loading-wrapper").hide();  
     }, 1100);
      return false;

    },
    errorPlacement: function (error, element) {
      if ($(element).hasClass("error")) {
        $(element)
          .closest('div[class^="form-holder"]')
          .addClass("has-error")
          .removeClass("accept");
        $(element).addClass("error");
      } else {
        $(element)
          .closest('div[class^="form-holder"]')
          .removeClass("has-error")
          .addClass("accept");
        $(element).removeClass("error");
      }
    },
    success: function (label) {},
    rules: {
      firstName: "required",
      lastName: "required",
      country: "required",
      state: "required",
      zipCode: {
        minlength: 1,

      },
      phone: {
        required: true,
        minlength: 10,
        maxlength: 20,
      },
      email: {
        required: true,
        email: true,
      },
    },
  });
});

 