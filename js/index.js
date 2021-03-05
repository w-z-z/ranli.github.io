/*
 * @Description: Description
 * @Author: ranli
 * @Date: 2020-12-16 11:14:24
 * @LastEditTime: 2021-03-05 15:33:23
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
 var defaultAnalytics = firebase.analytics()
 defaultAnalytics.setUserProperties({
  favorite_food : 'apples',
  lover:"zz"
});
defaultAnalytics.setUserId('buy-Product-id');
