import{_ as m,l as _,a as h,o as i,c,d,t as a,f,v as p,F as v,j as S,e as k,n as g,g as u}from"./index.fa802337.js";const y={name:"decks",data(){return{deck:null,deckLoading:!0,deckError:!1,deckSize:10,deckNameEdit:!1,actions:null,actionsSelected:[]}},methods:{editName(){this.deckNameEdit=!0,_(()=>{this.$refs.nameInput.focus()})},editNameStop(){this.deckNameEdit=!1},setupActionsSelected(){this.deck.actions.forEach(e=>{const t=this.actions.findIndex(r=>r.id===e.id);this.actionsSelected.push(t)})},selectAction(e){if(this.actionsSelected.includes(e)){this.actionsSelected=this.actionsSelected.filter(t=>t!==e),console.log(this.actionsSelected);return}if(this.actionsSelected.length>=this.deckSize){console.log("max reached");return}this.actionsSelected.push(e),console.log(this.actionsSelected)},saveDeck(){if(this.actionsSelected.length<this.deckSize){alert("need at least "+this.deckSize);return}if(!this.deck.name){alert("need a name!");return}let e=[];this.actionsSelected.forEach(t=>{e.push(this.actions[t].id)}),h.post("http://127.0.0.1:8000/deck/edit/"+this.$route.params.id,{name:this.deck.name,actions:e}).then(t=>{this.$router.push({path:"/decks"})}).catch(function(t){console.log(t)}).finally(()=>{console.log("done")})}},mounted(){h.get("http://127.0.0.1:8000/deck/edit/"+this.$route.params.id).then(e=>{console.log(e.data),e.data.hasOwnProperty("deck")&&e.data.deck&&e.data.hasOwnProperty("actions")&&e.data.actions?(this.deck=e.data.deck,this.actions=e.data.actions,this.setupActionsSelected()):this.deckError=!0}).catch(e=>{console.log(e),this.deckError=!0}).finally(()=>{this.deckLoading=!1})}},E={key:0,class:"loader"},N={key:1,class:"error"},w=d("p",null,"Error while loading",-1),x=[w],C={key:2},D={class:"deck__wrap mb-5"},z={class:"deck w-100"},I={key:1,class:"deck__name deck__name--edit"},A={class:"action__wrap mb-3"},L=["onClick"],T={key:0},b={key:1};function B(e,t,r,F,n,o){return i(),c("div",null,[n.deckLoading&&!n.deckError?(i(),c("div",E)):n.deckError?(i(),c("div",N,x)):(i(),c("div",C,[d("div",D,[d("div",z,[n.deckNameEdit?(i(),c("div",I,[f(d("input",{ref:"nameInput","onUpdate:modelValue":t[1]||(t[1]=s=>n.deck.name=s),type:"text",onFocusout:t[2]||(t[2]=s=>o.editNameStop())},null,544),[[p,n.deck.name]])])):(i(),c("h2",{key:0,class:"deck__name",onClick:t[0]||(t[0]=s=>o.editName())},a(n.deck.name),1)),d("div",A,[(i(!0),c(v,null,S(n.actions,(s,l)=>(i(),c("a",{href:"#",class:g(["action",{selected:n.actionsSelected.includes(l)}]),onClick:k(V=>o.selectAction(l),["prevent"]),key:l},[d("div",null,"Speed: "+a(s.speed),1),s.distance!==0?(i(),c("div",T,"Distance: "+a(s.distance),1)):u("",!0),s.turn!==0?(i(),c("div",b,"Turn: "+a(s.turn),1)):u("",!0)],10,L))),128))])])]),d("div",null,[d("a",{class:"btn",href:"#",onClick:t[3]||(t[3]=k(s=>o.saveDeck(),["prevent"]))},"Save & return")])]))])}const O=m(y,[["render",B]]);export{O as default};