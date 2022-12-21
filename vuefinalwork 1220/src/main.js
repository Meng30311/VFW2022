// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'bootstrap'



import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import { ValidationProvider, extend } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import { required,email,digits,alpha } from 'vee-validate/dist/rules';
import { configure } from 'vee-validate';

import './bus'
import 'vue-loading-overlay/dist/vue-loading.css'


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('email',{
  ...email,
  message:'需為Email格式'
});
extend('required',{
  ...required,
  message:'欄位為必填'
});
extend('digits',{
  ...digits,
  message:'必需為10個數字'
});
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});


Vue.use(VueAxios, axios);
Vue.component('Loading',Loading);


Vue.config.productionTip = false;


router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    const vm=this;
    axios.post(api).then(response =>{
      console.log(response.data);
      if(response.data.success){
        next();
      }else{
        $('#loginModal').modal('show');
      }
    });
  }
  else{
    next();
  };
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
