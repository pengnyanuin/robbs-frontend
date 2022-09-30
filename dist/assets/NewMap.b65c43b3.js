import{_ as g,a as C,A as f,o as i,c as r,d as t,f as b,v as k,F as p,h,e as a,n as u,t as y}from"./index.09f48851.js";const x={name:"games",data(){return{map:{title:"",rows:5,cols:5},tools:{empty:1,wall:2,box:3},selectedTool:"empty",fields:{1:{1:1,2:1,3:1,4:1,5:1},2:{1:1,2:1,3:1,4:1,5:1},3:{1:1,2:1,3:1,4:1,5:1},4:{1:1,2:1,3:1,4:1,5:1},5:{1:1,2:1,3:1,4:1,5:1}}}},methods:{addRow(){console.log("add row"),this.map.rows++;const s={};for(let e=1;e<=this.map.cols;e++)s[e.toString()]=1;this.fields[this.map.rows.toString()]=s},removeRow(){delete this.fields[this.map.rows.toString()],this.map.rows--},addColumn(){console.log("add col"),this.map.cols++;let s=JSON.parse(JSON.stringify(this.fields));Object.entries(s).forEach(([e,v])=>{s[e][this.map.cols.toString()]=1}),this.fields=s},removeColumn(){let s=JSON.parse(JSON.stringify(this.fields));Object.entries(s).forEach(([e,v])=>{delete s[e][this.map.cols.toString()]}),this.fields=s,this.map.cols--},applyField(s,e){this.fields[s][e]=this.tools[this.selectedTool]},selectTool(s){this.selectedTool=s},createMap(){const s={title:this.map.title,rows:this.map.rows,cols:this.map.cols,fields:this.fields};console.log(s),C.post(f.getApiUrl()+"maps/create",s,f.getAuthHeader()).then(e=>{console.log(e.data),this.$router.push({name:"games"})}).catch(e=>{console.log(e)})}},mounted(){}},S={class:"mb-3"},R=t("h2",null,"Title: ",-1),T={class:"row"},A={class:"col-md-6 map__preview"},F=["onClick"],O={class:"col-md-6"},M={class:"d-flex gap-3 mb-3"},J={class:"d-flex gap-3 mb-5"},N={class:"d-flex gap-3 mb-3"},B=["onClick"],E={class:"mt-5"};function j(s,e,v,D,n,o){return i(),r("div",null,[t("div",S,[R,b(t("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>n.map.title=l),type:"text"},null,512),[[k,n.map.title]])]),t("div",T,[t("div",A,[(i(!0),r(p,null,h(n.fields,(l,d,c)=>(i(),r("div",{key:c,class:"map__preview__row"},[(i(!0),r(p,null,h(l,(m,w,_)=>(i(),r("div",{key:_,class:u(["map__preview__field",{"wall-field":m===2,"box-field":m===3}]),style:{cursor:"pointer"},onClick:U=>o.applyField(d,w)},null,10,F))),128))]))),128))]),t("div",O,[t("div",M,[t("a",{href:"#",class:"btn",onClick:e[1]||(e[1]=a((...l)=>o.addRow&&o.addRow(...l),["prevent"]))},"Add row"),t("a",{href:"#",class:"btn",onClick:e[2]||(e[2]=a((...l)=>o.addColumn&&o.addColumn(...l),["prevent"]))},"Add column")]),t("div",J,[t("a",{href:"#",class:"btn btn--danger",onClick:e[3]||(e[3]=a((...l)=>o.removeRow&&o.removeRow(...l),["prevent"]))},"Remove row"),t("a",{href:"#",class:"btn btn--danger",onClick:e[4]||(e[4]=a((...l)=>o.removeColumn&&o.removeColumn(...l),["prevent"]))},"Remove column")]),t("div",N,[(i(!0),r(p,null,h(n.tools,(l,d,c)=>(i(),r("a",{href:"#",class:u(["btn",{selected:n.selectedTool===d}]),key:c,onClick:a(m=>o.selectTool(d),["prevent"])},y(d),11,B))),128))])])]),t("div",E,[t("a",{href:"#",onClick:e[5]||(e[5]=a(l=>o.createMap(),["prevent"])),class:"btn"},"Create")])])}const z=g(x,[["render",j]]);export{z as default};
