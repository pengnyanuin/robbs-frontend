import{_,a as r,A as c,o as t,c as n,b as i,n as k,g,t as a,F as v,i as f,e as d}from"./index.75d0bc81.js";const A={name:"actions",data(){return{actions:null,actionsLoading:!0,actionsError:!1,unlockNewText:"New one",unlockNewTextLoading:"Getting...",unlockNewActive:!0}},methods:{unlockNewAction(){this.unlockNewActive=!1,r.get(c.getApiUrl()+"actions/unlock",c.getAuthHeader()).then(e=>{console.log(e.data),e.data&&this.actions.push(e.data)}).catch(function(e){console.log(e)}).finally(()=>{this.unlockNewActive=!0})}},mounted(){r.get(c.getApiUrl()+"actions",c.getAuthHeader()).then(e=>{console.log(e.data),this.actions=e.data}).catch(function(e){console.log(e),this.actionsError=!0}).finally(()=>{this.actionsLoading=!1})}},N=i("hr",{class:"m-5 mb-5"},null,-1),w={key:0,class:"loader"},m={key:1},p=i("h2",null,"Actions",-1),y={key:0,class:"action__wrap"},x={key:0},L={key:1},T={key:1},b=i("p",null,"Nothing",-1),B=[b];function C(e,l,E,S,o,u){return t(),n("div",null,[i("div",null,[i("a",{class:k(["btn",{disabled:!o.unlockNewActive}]),href:"#",onClick:l[0]||(l[0]=g(s=>u.unlockNewAction(),["prevent"]))},a(o.unlockNewActive?o.unlockNewText:o.unlockNewTextLoading),3)]),N,o.actionsLoading?(t(),n("div",w)):(t(),n("div",m,[p,o.actions.length?(t(),n("div",y,[(t(!0),n(v,null,f(o.actions,(s,h)=>(t(),n("div",{class:"action",key:h},[i("div",null,"Speed: "+a(s.speed),1),s.distance!==0?(t(),n("div",x,"Distance: "+a(s.distance),1)):d("",!0),s.turn!==0?(t(),n("div",L,"Turn: "+a(s.turn),1)):d("",!0)]))),128))])):(t(),n("div",T,B))]))])}const F=_(A,[["render",C]]);export{F as default};
