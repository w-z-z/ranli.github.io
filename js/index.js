/*
 * @Description: Description
 * @Author: ranli
 * @Date: 2020-12-15 17:40:52
 * @LastEditTime: 2020-12-15 18:05:06
 * @LastEditors: ranli
 */
var firebaseConfig = {
  apiKey: "AIzaSyDs4XhB9GAEO8f4IepyZ1sWkEIvKSBKXUI",
  authDomain: "test-5e6ad.firebaseapp.com",
  projectId: "test-5e6ad",
  storageBucket: "test-5e6ad.appspot.com",
  messagingSenderId: "189669951181",
  appId: "1:189669951181:web:2363df5bace628beab0b84",
  measurementId: "G-SD09GS53J2"
};

firebase.initializeApp(firebaseConfig);
const defaultAnalytics = firebase.analytics()
defaultAnalytics.logEvent('analytics-index',{
  proId:4546545,
  proName:"产品名称",
  prodesc:"产品名称产品名称产品名称",
  payment_type:"3",
});
defaultAnalytics.setAnalyticsCollectionEnabled(true);
defaultAnalytics.setAnalyticsCollectionEnabled("analytics-index");
defaultAnalytics.setUserProperties('analytics-props');
defaultAnalytics.setUserId('analytics-id');
firebase.auth().tenantId = 'Comments';


function add_shipping_info() {
  defaultAnalytics.logEvent('add_shipping_info',{
    proId:4546545,
    proName:"产品名称aaa",
    prodesc:"产品名称产品名称产品名称aaa",
    coupon:"mo",
    currency:"156",
    items:[],
    payment_type:"2",
    shipping_tier:"156",
    tax:"422",
    value:156,
  });
  console.log("add_shipping_info");
}

function add_payment_info() {
  defaultAnalytics.logEvent('add_payment_info',{
    proId:4546545,
    proName:"产品名称gdfdaaa",
    prodesc:"产品名称产品gdgefg 名称产品名称aaa",
    coupon:"mo1741",
    currency:"fsdfdf",
    items:[],
    payment_type:"3",
    shipping:"add_shipping_info",
    shipping_tier:"15hhghgh6",
    value:156,
  });
  console.log("add_payment_info");
}

function add_to_cart() {
  defaultAnalytics.logEvent('add_to_cart',{
    currency:4546545,
    items:"ggg",
    value:156,   
    shipping:"add_shipping_info",
  });
  console.log("add_to_cart");
}

function login() {
  defaultAnalytics.logEvent('login',{
    username:156156,
    psd:"产品名称aaa",
  });
  console.log("login");
}


