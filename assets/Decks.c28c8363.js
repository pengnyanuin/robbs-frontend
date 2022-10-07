import{_ as D,a as u,A as l,r as S,o as s,c,d as o,n as m,e as k,f as y,v as A,F as _,h as g,g as f,t as a,b as N,w as b}from"./index.f2c7e75a.js";const C={name:"decks",data(){return{decks:null,decksLoading:!0,decksError:!1,newDeckName:"",deckSize:10,createNewDeckActive:!1,actions:null,actionsLoading:!0,actionsError:!1,actionsSelected:[]}},methods:{createNewDeck(){this.createNewDeckActive=!this.createNewDeckActive,this.actions||this.loadActions()},createNewDeckSend(){if(this.actionsSelected.length<this.deckSize){alert("need at least "+this.deckSize);return}if(!this.newDeckName){alert("need a name!");return}let e=[];this.actionsSelected.forEach(t=>{e.push(this.actions[t].id)}),u.post(l.getApiUrl()+"decks/create",{name:this.newDeckName,actions:e},l.getAuthHeader()).then(t=>{console.log(t.data),this.decks.push(t.data)}).catch(function(t){console.log(t)}).finally(()=>{console.log("deck created hopefully")})},loadActions(){u.get(l.getApiUrl()+"actions",l.getAuthHeader()).then(e=>{console.log(e.data),this.actions=e.data}).catch(function(e){console.log(e),this.actionsError=!0}).finally(()=>{this.actionsLoading=!1})},selectAction(e){if(this.actionsSelected.includes(e)){this.actionsSelected=this.actionsSelected.filter(t=>t!==e),console.log(this.actionsSelected);return}if(this.actionsSelected.length>=this.deckSize){console.log("max reached");return}this.actionsSelected.push(e),console.log(this.actionsSelected)},deleteDeck(e){confirm("Are you sure?")?(console.log("delete"),u.get(l.getApiUrl()+"decks/delete/"+e.id,l.getAuthHeader()).then(t=>{console.log(t),console.log("remove"+e),this.decks=this.decks.filter(v=>v!==e)}).catch(function(t){console.log(t)})):console.log("back")}},mounted(){u.get(l.getApiUrl()+"decks",l.getAuthHeader()).then(e=>{console.log(e.data),this.decks=e.data}).catch(function(e){console.log(e),this.decksError=!0}).finally(()=>{this.decksLoading=!1})}},x={key:0,class:"mt-5"},E={class:"mb-3"},L={key:0,class:"loader"},z={key:1},U={class:"action__wrap mb-3"},H=["onClick"],V={key:0},B={key:1},T=o("hr",{class:"m-5 mb-5"},null,-1),F={key:1,class:"loader"},M={key:2},j=o("h2",null,"Decks",-1),I={key:0,class:"deck__wrap"},q={class:"deck__name"},G={class:"deck__button d-flex justify-content-between"},J=o("span",null,"Edit",-1),K=["onClick"],O={key:1},P=o("p",null,"Nothing",-1),Q=[P];function R(e,t,v,W,i,h){const p=S("router-link");return s(),c("div",null,[o("div",null,[o("a",{class:m(["btn",{"btn--danger":!i.createNewDeckActive}]),href:"#",onClick:t[0]||(t[0]=k(n=>h.createNewDeck(),["prevent"]))},"Create new",2)]),i.createNewDeckActive?(s(),c("div",x,[o("div",E,[y(o("input",{"onUpdate:modelValue":t[1]||(t[1]=n=>i.newDeckName=n),type:"text",placeholder:"Name the deck..."},null,512),[[A,i.newDeckName]])]),i.actionsLoading?(s(),c("div",L)):(s(),c("div",z,[o("div",U,[(s(!0),c(_,null,g(i.actions,(n,r)=>(s(),c("a",{href:"#",class:m(["action",{selected:i.actionsSelected.includes(r)}]),onClick:k(d=>h.selectAction(r),["prevent"]),key:r},[o("div",null,"Speed: "+a(n.speed),1),n.distance!==0?(s(),c("div",V,"Distance: "+a(n.distance),1)):f("",!0),n.turn!==0?(s(),c("div",B,"Turn: "+a(n.turn),1)):f("",!0)],10,H))),128))]),o("a",{class:"btn",href:"#",onClick:t[2]||(t[2]=k(n=>h.createNewDeckSend(),["prevent"]))},"Create!")]))])):f("",!0),T,i.decksLoading?(s(),c("div",F)):(s(),c("div",M,[j,i.decks.length?(s(),c("div",I,[(s(!0),c(_,null,g(i.decks,(n,r)=>(s(),c("div",{class:"deck",key:r},[o("div",q,a(n.name),1),(s(!0),c(_,null,g(n.actions,(d,w)=>(s(),c("div",{class:"deck__action",key:w},a(d.id)+" / speed: "+a(d.speed)+" - distance: "+a(d.distance)+" - turn: "+a(d.turn),1))),128)),o("div",G,[N(p,{to:{name:"edit_deck",params:{id:n.id}},class:"btn"},{default:b(()=>[J]),_:2},1032,["to"]),o("a",{href:"#",class:"btn btn--danger",onClick:k(d=>h.deleteDeck(n),["prevent"])},"Delete",8,K)])]))),128))])):(s(),c("div",O,Q))]))])}const Y=D(C,[["render",R]]);export{Y as default};
