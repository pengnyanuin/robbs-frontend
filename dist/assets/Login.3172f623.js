import{_ as y,a as m,A as i,r as D,o as r,c as o,b as k,w as v,d as t,e as u,f as l,v as d,g as h,F as b,h as P,i as N,t as f}from"./index.09f48851.js";const F={name:"login",data:()=>({loading:!0,loadingLoginForm:!1,loadingRegisterForm:!1,hasToken:!1,name:"",registerErrors:[],registered:!1,registeredPlayerName:"",loginData:{username:"",password:""},registerData:{username:"",password:"",confirmPassword:""}}),methods:{register(){this.loadingRegisterForm=!0,this.registerErrors=[];const s={username:this.registerData.username,password:this.registerData.password,confirmPassword:this.registerData.confirmPassword};m.post(i.getApiUrl()+"register",s).then(e=>{console.log(e.data);const g=e.data.errors;if(g){g.forEach(p=>{this.registerErrors.push(p)});return}console.log("successfully registered"),this.registered=!0}).catch(e=>{console.log(e)}).finally(()=>{this.loadingRegisterForm=!1})},registerPlayerName(){const s={username:this.registerData.username,password:this.registerData.password,playerName:this.registeredPlayerName};m.post(i.getApiUrl()+"register_name",s).then(e=>{console.log(e.data),this.loginData.username=this.registerData.username,this.loginData.password=this.registerData.password,this.login()}).catch(e=>{console.log(e)})},async login(){this.loadingLoginForm=!0;const s={username:this.loginData.username,password:this.loginData.password},e=await i.login(s);console.log(e),e&&Object.hasOwn(e,"token")&&Object.hasOwn(e,"refresh_token")&&(this.hasToken=!0,this.axiosPlayerData(!1),this.$router.push({name:"welcome"})),this.loadingLoginForm=!1},logout(){i.logout(),this.$router.go({name:"login"})},async axiosPlayerData(s){m.get(i.getApiUrl()+"player/data",i.getAuthHeader()).then(e=>{console.log(e.data),this.name=e.data.name}).catch(async e=>{console.log(e),e.response.status===401&&!s&&await i.refreshUser()&&await this.axiosPlayerData(!0)}).finally(()=>{this.loading=!1})}},created(){const s=i.getTokens();if(console.log(s),s&&Object.hasOwn(s,"token")&&Object.hasOwn(s,"refresh_token")){this.hasToken=!0,this.axiosPlayerData(!1);return}this.loading=!1}},U=t("h1",null,"LOGIN",-1),V={key:0,class:"loader"},L={key:1},O={key:0},C={class:"mt-3"},E=N(" Not you? "),R={key:1,class:"row"},T={class:"col-md-6"},A=t("button",{type:"submit",class:"btn"},"Login",-1),_={key:0,class:"loader"},j={class:"col-md-6"},S={key:0,class:"color-danger"},B=t("button",{type:"submit",class:"btn"},"Register",-1),M={key:1,class:"loader"},z={key:2,class:"d-flex gap-3 flex-column justify-content-center align-items-center",style:{padding:"200px"}};function G(s,e,g,p,H,n){const c=D("router-link");return r(),o("div",null,[U,s.loading?(r(),o("div",V)):(r(),o("div",L,[s.hasToken?(r(),o("div",O,[k(c,{to:{name:"welcome"},class:"btn"},{default:v(()=>[t("span",null,"Continue as "+f(s.name),1)]),_:1}),t("div",C,[E,t("a",{href:"#",onClick:e[0]||(e[0]=u((...a)=>n.logout&&n.logout(...a),["prevent"]))},"Logout")])])):s.registered?(r(),o("div",z,[l(t("input",{"onUpdate:modelValue":e[8]||(e[8]=a=>s.registeredPlayerName=a),style:{"font-size":"30px"}},null,512),[[d,s.registeredPlayerName]]),t("a",{href:"#",class:"btn btn--danger",onClick:e[9]||(e[9]=u((...a)=>n.registerPlayerName&&n.registerPlayerName(...a),["prevent"]))},"Confirm name & login")])):(r(),o("div",R,[t("div",T,[t("form",{onSubmit:e[3]||(e[3]=u((...a)=>n.login&&n.login(...a),["prevent"]))},[t("p",null,[l(t("input",{"onUpdate:modelValue":e[1]||(e[1]=a=>s.loginData.username=a),placeholder:"username"},null,512),[[d,s.loginData.username]])]),t("p",null,[l(t("input",{"onUpdate:modelValue":e[2]||(e[2]=a=>s.loginData.password=a),placeholder:"password",type:"password"},null,512),[[d,s.loginData.password]])]),A,s.loadingLoginForm?(r(),o("div",_)):h("",!0)],32)]),t("div",j,[t("form",{onSubmit:e[7]||(e[7]=u((...a)=>n.register&&n.register(...a),["prevent"]))},[t("p",null,[l(t("input",{"onUpdate:modelValue":e[4]||(e[4]=a=>s.registerData.username=a),placeholder:"username",minlength:"4"},null,512),[[d,s.registerData.username]])]),t("p",null,[l(t("input",{"onUpdate:modelValue":e[5]||(e[5]=a=>s.registerData.password=a),placeholder:"password",type:"password",minlength:"4"},null,512),[[d,s.registerData.password]])]),t("p",null,[l(t("input",{"onUpdate:modelValue":e[6]||(e[6]=a=>s.registerData.confirmPassword=a),placeholder:"confirm password",type:"password",minlength:"4"},null,512),[[d,s.registerData.confirmPassword]])]),s.registerErrors?(r(),o("div",S,[(r(!0),o(b,null,P(s.registerErrors,(a,w)=>(r(),o("div",{key:w},f(a.message),1))),128))])):h("",!0),B,s.loadingRegisterForm?(r(),o("div",M)):h("",!0)],32)])]))]))])}const q=y(F,[["render",G]]);export{q as default};
