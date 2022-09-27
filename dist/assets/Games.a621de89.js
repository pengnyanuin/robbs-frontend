import{_ as p,a as f,A as g,r as k,o as e,c as s,F as u,j as _,g as d,d as n,b as r,w as i,t as m,h}from"./index.a9cab421.js";const y={name:"games",data(){return{games:null,gamesLoading:!0,gamesError:!1}},mounted(){f.get(g.getApiUrl()+"games",g.getAuthHeader()).then(c=>{console.log(c.data),this.games=c.data}).catch(c=>{console.log(c),this.gamesError=!0,c.response.status}).finally(()=>{this.gamesLoading=!1})}},b={key:0,class:"loader"},v={key:1,class:"notice"},x={key:2},E={key:0,class:"mt-3"},N=n("h2",null,"My",-1),w=h(" \xA0"),L={key:0},A=h(" \xA0"),T={key:0},V={key:1,class:"mt-3"},B=n("h2",null,"Open",-1),C={key:2,class:"mt-3"},G=n("h2",null,"Ended",-1),M=n("hr",{class:"mt-5 mb-5"},null,-1),O={class:"d-flex gap-3"},S=n("span",null,"New game",-1),F=n("span",null,"My actions",-1),J=n("span",null,"My decks",-1);function j(c,D,H,U,a,W){const o=k("router-link");return e(),s("div",null,[a.gamesLoading?(e(),s("div",b)):a.gamesError?(e(),s("div",v," Error :c")):(e(),s("div",x,[a.games.myGames||a.games.myTurnGames?(e(),s("div",E,[N,(e(!0),s(u,null,_(a.games.myTurnGames,(t,l)=>(e(),s("div",{key:l,class:"mb-2"},[r(o,{to:{name:"game",params:{id:t.id}},class:"btn"},{default:i(()=>[n("span",null,"Go to game "+m(t.title),1)]),_:2},1032,["to"]),w,t.myTurn?(e(),s("span",L,"!!! your turn !!!")):d("",!0)]))),128)),(e(!0),s(u,null,_(a.games.myGames,(t,l)=>(e(),s("div",{key:l,class:"mb-2"},[r(o,{to:{name:"game",params:{id:t.id}},class:"btn"},{default:i(()=>[n("span",null,"Go to game "+m(t.title),1)]),_:2},1032,["to"]),A,t.myTurn?(e(),s("span",T,"!!! your turn !!!")):d("",!0)]))),128))])):d("",!0),a.games.canJoin?(e(),s("div",V,[B,(e(!0),s(u,null,_(a.games.canJoin,(t,l)=>(e(),s("div",{key:l,class:"mb-2"},[r(o,{to:{name:"game",params:{id:t.id}},class:"btn"},{default:i(()=>[n("span",null,"Go to game "+m(t.title),1)]),_:2},1032,["to"])]))),128))])):d("",!0),a.games.endedGames?(e(),s("div",C,[G,(e(!0),s(u,null,_(a.games.endedGames,(t,l)=>(e(),s("div",{key:l,class:"mb-2"},[r(o,{to:{name:"game",params:{id:t.id}},class:"btn"},{default:i(()=>[n("span",null,m(t.title)+" - "+m(t.winner?"WON":"LOST"),1)]),_:2},1032,["to"])]))),128))])):d("",!0)])),M,n("div",O,[r(o,{to:{name:"new_game"},class:"btn btn--danger"},{default:i(()=>[S]),_:1}),r(o,{to:{name:"actions"},class:"btn"},{default:i(()=>[F]),_:1}),r(o,{to:{name:"decks"},class:"btn"},{default:i(()=>[J]),_:1})])])}const z=p(y,[["render",j]]);export{z as default};
