import{_ as v,o,c as n,t as l,n as y,i as j,a as _,A as P,r as k,F as d,d as r,e as b,g as u,j as h,k as O,h as R}from"./index.a9cab421.js";const A={name:"robb",props:{id:Number,playerPosition:Array,currentPlayer:Boolean},watch:{playerPosition:{deep:!0,handler:function(e){this.position.left=5+(e[1]-1)*50,this.position.top=20+(e[0]-1)*50,this.position.rot=e[2]+1}}},data(){return{position:{top:20,left:5,rot:0}}},methods:{rotationClass(){return"rot-"+this.position.rot}},mounted(){this.position.left+=(this.playerPosition[1]-1)*50,this.position.top+=(this.playerPosition[0]-1)*50,this.position.rot=this.playerPosition[2]+1}};function G(e,s,a,m,t,g){return o(),n("div",{class:y(["robb",["rot-"+t.position.rot,{current:a.currentPlayer}]]),style:j({position:"absolute",top:t.position.top+"px",left:t.position.left+"px"}),ref:"thisRob"},l(a.currentPlayer?"me":a.id),7)}const w=v(A,[["render",G]]),E={name:"map_object",props:{objectPosition:Array},watch:{objectPosition:{deep:!0,handler:function(e){this.position.left=(e[1]-1)*50,this.position.top=(e[0]-1)*50,this.position.rot=e[2]+1}}},data(){return{position:{top:0,left:0,rot:0}}},methods:{},mounted(){this.position.left+=(this.objectPosition[1]-1)*50,this.position.top+=(this.objectPosition[0]-1)*50,this.position.rot=this.objectPosition[2]+1}};function D(e,s,a,m,t,g){return o(),n("div",{class:"obstacle obstacle--box",style:j({position:"absolute",top:t.position.top+"px",left:t.position.left+"px"})},null,4)}const J=v(E,[["render",D]]),x={name:"game",props:{id:Number},components:{Robb:w,MapObject:J},data(){return{buttonText:"Play the turn",buttonTextLoading:"Getting turn data...",buttonLoading:!1,roundMovementData:null,originalPositions:null,originalObjectPositions:null,game:null,gameLoading:!0,gameError:!1,playTimeout:[],cardsCanSend:!1,gameRunning:!1,displayEndOfGame:!1,endOfGameData:null,isWinner:!1,robbClasses:{},actionsSelected:0,actionBoard:null,actionsToSend:{1:null,2:null,3:null,4:null,5:null}}},methods:{consoleTest(){console.log(this.actionsToSend)},getRoundData(){this.roundMovementData?(this.game.playerPositions[this.game.roundNumber]=JSON.parse(JSON.stringify(this.originalPositions)),this.game.objectPositions[this.game.roundNumber]=JSON.parse(JSON.stringify(this.originalObjectPositions)),console.log(this.game.playerPositions[this.game.roundNumber]),this.playTimeout.forEach(e=>clearTimeout(e)),this.playTimeout=[],this.playRound()):(this.buttonLoading=!0,_.get("http://127.0.0.1:8000/game/"+this.$route.params.id+"/process").then(e=>{console.log(e.data),this.roundMovementData=e.data,this.buttonText="Replay the turn",this.playRound()}).catch(e=>{console.log(e)}).finally(()=>{this.buttonLoading=!1}))},playRound(){let e=1;this.game.playerPositions[this.game.roundNumber]=this.game.playerPositions[this.game.roundNumber-1],this.game.objectPositions[this.game.roundNumber]=this.game.objectPositions[this.game.roundNumber-1],this.roundMovementData.forEach(s=>{s.movement.forEach(a=>{if(console.log(a),Object.hasOwn(a,"player_id")){const m=a.player_id;this.playTimeout.push(setTimeout(()=>{a.new_position?(this.game.playerPositions[this.game.roundNumber][m]=a.new_position,console.log(this.game.playerPositions[this.game.roundNumber][m])):(this.robbClasses[a.player_id]=this.robbClasses[a.player_id]+" shake-anim",setTimeout(()=>this.robbClasses[a.player_id]=this.robbClasses[a.player_id].replace("shake-anim",""),200),console.log("STAAAAY"))},e*500))}else if(Object.hasOwn(a,"object_id")){const m=a.object_id;this.playTimeout.push(setTimeout(()=>{a.new_position?(this.game.objectPositions[this.game.roundNumber][m]=a.new_position,console.log(this.game.objectPositions[this.game.roundNumber][m])):console.log("STAAAAY")},e*500))}a.follow_up||e++})})},sendCards(){if(this.actionsSelected<5){console.log("not enough actions selected");return}let e=[];Object.keys(this.actionsToSend).forEach(s=>{e.push(this.actionBoard[this.actionsToSend[s]].id)}),_.post("http://127.0.0.1:8000/game/"+this.$route.params.id+"/play",{moves:e}).then(s=>{console.log(s.data),this.$router.push({path:"/robbs"})}).catch(function(s){console.log(s),this.gameError=!0}).finally(()=>{console.log("cards sent maybe")})},selectAction(e){if(Object.hasOwn(this.actionBoard[e],"selected")&&this.actionBoard[e].selected!==null){const s=this.actionBoard[e].selected;this.actionsSelected--,this.actionBoard[e].selected=null,this.actionsToSend[s]=null;return}if(this.actionsSelected>=5){console.log("Action field is full");return}this.actionsSelected++,this.actionBoard[e].selected=this.actionsSelected,this.actionsToSend[this.actionsSelected]=e},joinGame(){this.gameLoading=!0,_.get("http://127.0.0.1:8000/game/"+this.$route.params.id+"/join").then(e=>{console.log(e.data),this.mountedMethod()}).catch(e=>{console.log(e)})},mountedMethod(){_.get(P.getApiUrl()+"game/"+this.$route.params.id,P.getAuthHeader()).then(e=>{if(console.log(e.data),this.game=e.data,e.data.status===2){this.originalPositions=JSON.parse(JSON.stringify(e.data.playerPositions[e.data.roundNumber])),e.data.objectPositions.length>0&&(this.originalObjectPositions=JSON.parse(JSON.stringify(e.data.objectPositions[e.data.roundNumber]))),this.cardsCanSend=e.data.myTurn,this.actionBoard=JSON.parse(JSON.stringify(e.data.playerCards)),this.gameRunning=!0,this.game.players.forEach(s=>{this.robbClasses[s.id]=""});return}if(e.data.status===3){this.originalPositions=JSON.parse(JSON.stringify(e.data.playerPositions[e.data.roundNumber])),e.data.objectPositions.length>0&&(this.originalObjectPositions=JSON.parse(JSON.stringify(e.data.objectPositions[e.data.roundNumber]))),this.displayEndOfGame=!0;const s=e.data.winner;this.endOfGameData={winner:e.data.players[s],length:e.data.roundNumber-1},this.endOfGameData.winner.id===e.data.myId&&(this.isWinner=!0)}this.gameRunning=!1}).catch(e=>{console.log(e),this.gameError=!0}).finally(()=>{this.gameLoading=!1})}},mounted(){this.mountedMethod()}},B={key:0,class:"loader"},M={key:0},L={class:"end-screen__result"},I=r("p",null,"Game has ended",-1),W={key:2,class:"mt-3"},V={key:0},Y={key:1},z={key:4,class:"map mt-5"},F={key:0,class:"crown"},H={key:0,class:"mt-2"},U={key:0},X={key:1,class:"mt-5"},q={class:"action-board mb-3"},K={class:"action-board__tile__selected"},Q={class:"action__wrap"},Z=["onClick"],$={key:0,class:"d-flex justify-content-between"},ee={key:1},te={key:2};function oe(e,s,a,m,t,g){const N=k("Robb"),S=k("MapObject");return o(),n("div",null,[t.gameLoading?(o(),n("div",B)):(o(),n(d,{key:1},[r("div",null,[r("h2",null,l(t.game.title)+" - Round "+l(t.displayEndOfGame?t.game.roundNumber-1:t.game.roundNumber),1),!t.gameRunning&&t.game.canJoin?(o(),n("div",M,[r("a",{class:"btn btn--danger",href:"#",onClick:s[0]||(s[0]=b(i=>g.joinGame(),["prevent"]))},"Join!")])):u("",!0),t.displayEndOfGame?(o(),n("div",{key:1,class:y(["end-screen",{"end-screen--winner":t.isWinner}])},[r("span",L,l(t.isWinner?"Victory":"Defeat"),1),I,r("p",null,"Game took "+l(t.endOfGameData.length)+" rounds",1)],2)):u("",!0),t.gameRunning?(o(),n("div",W,[t.cardsCanSend?(o(),n("span",V,"It's your turn!")):(o(),n("span",Y,"Waiting for the opponent..."))])):u("",!0),(t.gameRunning||t.displayEndOfGame)&&t.game.roundNumber>1?(o(),n("a",{key:3,class:"btn btn--danger",href:"#",onClick:s[1]||(s[1]=b(i=>g.getRoundData(),["prevent"]))},l(t.buttonLoading?t.buttonTextLoading:t.buttonText),1)):u("",!0),t.gameRunning||t.displayEndOfGame?(o(),n("div",z,[t.gameRunning||t.displayEndOfGame?(o(!0),n(d,{key:0},h(t.game.players,(i,c)=>(o(),O(N,{key:c,id:i.id,class:y(t.robbClasses[i.id]),playerPosition:t.game.playerPositions[t.game.roundNumber][i.id],currentPlayer:i.id===t.game.myId,movement:t.roundMovementData},null,8,["id","class","playerPosition","currentPlayer","movement"]))),128)):u("",!0),t.gameRunning||t.displayEndOfGame?(o(!0),n(d,{key:1},h(t.game.mapObjects,(i,c)=>(o(),O(S,{key:c,objectPosition:t.game.objectPositions[t.game.roundNumber][i.id]},null,8,["objectPosition"]))),128)):u("",!0),(o(!0),n(d,null,h(t.game.map,(i,c,p)=>(o(),n("div",{key:p,class:"map__row"},[(o(!0),n(d,null,h(i,(f,T,C)=>(o(),n("div",{key:C,class:y(["map__field",{wall:f!==1}])},[t.game.objective[1][0]===parseInt(c)&&t.game.objective[1][1]===parseInt(T)?(o(),n("div",F)):u("",!0)],2))),128))]))),128))])):u("",!0)]),t.gameRunning?(o(),n("div",H,[t.roundMovementData?(o(!0),n(d,{key:0},h(t.roundMovementData,(i,c)=>(o(),n("div",{key:c},[r("div",null,[r("b",null,l(i.player_name)+": ",1),(o(!0),n(d,null,h(i.movement,(p,f)=>(o(),n("span",{key:f},[r("span",null,[R("X:"+l(p[0])+", Y:"+l(p[1])+", Rot: "+l(p[2]),1),f!==i.movement.length-1?(o(),n("span",U," | ")):u("",!0)])]))),128))])]))),128)):u("",!0)])):u("",!0),t.cardsCanSend&&t.gameRunning?(o(),n("div",X,[r("div",q,[(o(!0),n(d,null,h(t.actionsToSend,(i,c)=>(o(),n("div",{class:"action-board__tile",key:c},[r("span",null,l(c),1),r("div",K,l(i),1)]))),128))]),r("div",Q,[(o(!0),n(d,null,h(t.actionBoard,(i,c)=>(o(),n("a",{href:"#",class:y(["action",{selected:i.selected}]),onClick:b(p=>g.selectAction(c),["prevent"]),key:c},[i.selected?(o(),n("div",$,[r("span",null,l(i.selected),1),r("span",null,l(c),1)])):u("",!0),r("div",null,"Speed: "+l(i.speed),1),i.distance!==0?(o(),n("div",ee,"Distance: "+l(i.distance),1)):u("",!0),i.turn!==0?(o(),n("div",te,"Turn: "+l(i.turn),1)):u("",!0)],10,Z))),128))]),t.cardsCanSend?(o(),n("a",{key:0,href:"#",class:"btn",onClick:s[2]||(s[2]=b(i=>g.sendCards(),["prevent"]))},"Send the cards")):u("",!0),r("div",null,[r("a",{href:"#",class:"btn",onClick:s[3]||(s[3]=b(i=>g.consoleTest(),["prevent"]))},"Test")])])):u("",!0)],64))])}const ie=v(x,[["render",oe]]);export{ie as default};
