(function(){"use strict";var e={7185:function(e,t,a){var l=a(9242),n=a(3396);function s(e,t,a,l,s,i){const r=(0,n.up)("v-toolbar-title"),o=(0,n.up)("v-app-bar"),u=(0,n.up)("AnalysisPage"),d=(0,n.up)("UploadPage"),p=(0,n.up)("v-container"),c=(0,n.up)("v-app");return(0,n.wg)(),(0,n.j4)(c,{style:{"background-color":"#F7F8FC"}},{default:(0,n.w5)((()=>[(0,n.Wm)(o,{app:"",density:"comfortable",elevation:"0",color:"#3F51B5"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,null,{default:(0,n.w5)((()=>[(0,n.Uk)("PostgreSQL logide analüsaator")])),_:1})])),_:1}),(0,n.Wm)(p,{class:"content pt-16"},{default:(0,n.w5)((()=>[e.showAnalysis?((0,n.wg)(),(0,n.j4)(u,{key:0,onUpload:t[0]||(t[0]=e=>this.showAnalysis=!1),"analysis-result":this.analysis},null,8,["analysis-result"])):((0,n.wg)(),(0,n.j4)(d,{key:1,onAnalysis:e.openAnalysis},null,8,["onAnalysis"]))])),_:1})])),_:1})}var i=a(7139);const r=e=>((0,n.dD)("data-v-39e48a27"),e=e(),(0,n.Cn)(),e),o={class:"container",style:{"padding-left":"150px","padding-right":"150px"}},u=r((()=>(0,n._)("div",{class:"text-overline pb-2"}," Analüüsi ajavahemik ",-1)));function d(e,t,a,l,s,r){const d=(0,n.up)("v-card-title"),p=(0,n.up)("v-spacer"),c=(0,n.up)("v-alert"),m=(0,n.up)("v-file-input"),v=(0,n.up)("v-card-text"),y=(0,n.up)("v-radio"),g=(0,n.up)("v-text-field"),w=(0,n.up)("v-col"),h=(0,n.up)("v-radio-group"),f=(0,n.up)("v-btn"),k=(0,n.up)("v-card-actions"),_=(0,n.up)("v-card");return(0,n.wg)(),(0,n.iD)("div",o,[(0,n.Wm)(_,{class:"upload-container pa-7"},{default:(0,n.w5)((()=>[(0,n.Wm)(d,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Laadi üles logifailide kaust")])),_:1}),(0,n.Wm)(p),(0,n.Wm)(v,null,{default:(0,n.w5)((()=>[s.uploadFailed?((0,n.wg)(),(0,n.j4)(c,{key:0,class:"mb-6",color:"red",variant:"tonal"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(this.errorMessage),1)])),_:1})):(0,n.kq)("",!0),(0,n.Wm)(m,{clearable:"",label:"Vali fail...",variant:"solo-filled","prepend-icon":"mdi-folder-upload",onChange:r.upload},null,8,["onChange"])])),_:1}),(0,n.Wm)(v,null,{default:(0,n.w5)((()=>[u,(0,n.Wm)(h,{modelValue:s.periodSelection,"onUpdate:modelValue":t[2]||(t[2]=e=>s.periodSelection=e),class:"pl-2"},{default:(0,n.w5)((()=>[(0,n.Wm)(y,{label:"Kõik logid",value:"all"}),(0,n.Wm)(y,{label:"Viimane nädal",value:"week"}),(0,n.Wm)(y,{label:"Muu ajavahemik",value:"custom"}),(0,n.Wm)(w,{class:"pl-12",style:{"max-width":"360px"}},{default:(0,n.w5)((()=>[(0,n.Wm)(g,{type:"datetime-local",prefix:"Algus:",disabled:"custom"!==s.periodSelection,modelValue:s.selectedStartDate,"onUpdate:modelValue":t[0]||(t[0]=e=>s.selectedStartDate=e)},null,8,["disabled","modelValue"]),(0,n.Wm)(g,{type:"datetime-local",prefix:"Lõpp:",disabled:"custom"!==s.periodSelection,modelValue:s.selectedEndDate,"onUpdate:modelValue":t[1]||(t[1]=e=>s.selectedEndDate=e)},null,8,["disabled","modelValue"])])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,n.Wm)(k,null,{default:(0,n.w5)((()=>[(0,n.Wm)(p),(0,n.Wm)(f,{color:"#3F51B5",type:"submit",variant:"elevated",disabled:s.loading,loading:s.loading,onClick:r.analyse},{default:(0,n.w5)((()=>[(0,n.Uk)(" Analüüsi ")])),_:1},8,["disabled","loading","onClick"])])),_:1})])),_:1})])}var p=a(1076),c={data(){return{uploadedFile:void 0,periodSelection:"all",errorMessage:"",startDate:void 0,endDate:void 0,selectedStartDate:(new Date).toISOString().substring(0,16),selectedEndDate:(new Date).toISOString().substring(0,16),uploadFailed:!1,loading:!1}},methods:{upload(e){this.uploadedFile=e.target.files[0]},analyse(){if(!this.uploadedFile)return void(this.errorMessage="Vali zip-fail või logifail.");if(!this.validateDates())return void(this.errorMessage="Valitud alguskuupäev peab olema enne lõpukuupäeva.");this.loading=!0;const e=this.uploadedFile.name.endsWith(".zip")?"zip":"single";p.Z.post("/analysis/"+e,this.createRequestData(),{headers:{"Content-Type":"multipart/form-data"}}).then((e=>{this.loading=!1,this.$emit("analysis",e.data)})).catch((()=>{this.loading=!1,this.uploadFailed=!0,this.errorMessage="Faili üleslaadimine ebaõnnestus. Kontrolli, et valitud fail on õiges formaadis (.zip, .json või .log)."}))},validateDates(){return"custom"===this.periodSelection?(this.startDate=new Date(this.selectedStartDate),this.endDate=new Date(this.selectedEndDate),this.startDate<=this.endDate):("week"===this.periodSelection&&(this.endDate=new Date,this.startDate=new Date(this.endDate.getTime()-6048e5)),!0)},createRequestData(){const e=new FormData;return e.append("logs",this.uploadedFile),"all"!==this.periodSelection&&(e.append("start",this.startDate.toISOString()),e.append("end",this.endDate.toISOString())),e}}},m=a(89);const v=(0,m.Z)(c,[["render",d],["__scopeId","data-v-39e48a27"]]);var y=v;const g=e=>((0,n.dD)("data-v-0d208daa"),e=e(),(0,n.Cn)(),e),w={class:"result-container"},h={class:"pa-8"},f=g((()=>(0,n._)("div",{class:"text-overline"},"Individuaalsed analüüsid",-1))),k=g((()=>(0,n._)("div",{class:"text-h4"},"Logide analüüs",-1))),_={key:2},D=g((()=>(0,n._)("div",{class:"text-h6 mt-6 mb-3"},"Vigade analüüs",-1))),b=g((()=>(0,n._)("h3",{class:"pb-6"},"Veatüüpide jaotus",-1))),x=g((()=>(0,n._)("h3",{class:"pb-6"},"Korduvad vead",-1))),C={key:3},W=g((()=>(0,n._)("div",{class:"text-h6 mt-6 mb-3"},"Kõik päringud",-1))),A={key:2,class:"text-center"};function E(e,t,a,l,s,i){const r=(0,n.up)("v-btn"),o=(0,n.up)("v-list-item"),u=(0,n.up)("v-divider"),d=(0,n.up)("v-list"),p=(0,n.up)("v-navigation-drawer"),c=(0,n.up)("v-row"),m=(0,n.up)("AnalysisIndividual"),v=(0,n.up)("AnalysisSummary"),y=(0,n.up)("Bar"),g=(0,n.up)("v-container"),E=(0,n.up)("RepeatedErrorsPanel"),S=(0,n.up)("v-card"),j=(0,n.up)("LogViewer"),z=(0,n.up)("v-progress-circular");return(0,n.wg)(),(0,n.iD)("div",w,[s.isGroup?((0,n.wg)(),(0,n.j4)(p,{key:0,width:"300"},{prepend:(0,n.w5)((()=>[(0,n._)("div",h,[(0,n.Wm)(r,{block:"",onClick:t[0]||(t[0]=e=>this.$emit("upload")),color:"#3F51B5"},{default:(0,n.w5)((()=>[(0,n.Uk)(" Laadi üles uus fail ")])),_:1})])])),default:(0,n.w5)((()=>[(0,n.Wm)(d,null,{default:(0,n.w5)((()=>[(0,n.Wm)(o,{link:"",title:"Rühma kokkuvõte",onClick:t[1]||(t[1]=e=>{this.displayData=a.analysisResult.summary,s.activeListItem=-1}),active:-1===s.activeListItem,color:"#3F51B5",class:"my-3"},null,8,["active"]),(0,n.Wm)(u),(0,n.Wm)(o,null,{default:(0,n.w5)((()=>[f])),_:1}),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.analysisResult.analysis,((e,t)=>((0,n.wg)(),(0,n.j4)(o,{link:"",title:e.studentName,onClick:a=>{this.displayData=e,s.activeListItem=t},key:t,active:s.activeListItem===t,class:"py-3",color:"#3F51B5"},null,8,["title","onClick","active"])))),128))])),_:1})])),_:1})):(0,n.kq)("",!0),s.displayData?((0,n.wg)(),(0,n.j4)(g,{key:1},{default:(0,n.w5)((()=>[(0,n.Wm)(g,{class:"pt-8"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{class:"pa-2",justify:"space-between"},{default:(0,n.w5)((()=>[k,s.isGroup?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(r,{key:0,onClick:t[2]||(t[2]=e=>this.$emit("upload")),color:"#3F51B5"},{default:(0,n.w5)((()=>[(0,n.Uk)(" Laadi üles uus fail ")])),_:1}))])),_:1}),s.displayData.queryEventGroups?((0,n.wg)(),(0,n.j4)(m,{key:0,analysis:s.displayData},null,8,["analysis"])):((0,n.wg)(),(0,n.j4)(v,{key:1,analysis:s.displayData},null,8,["analysis"])),0!==s.displayData.errorCount?((0,n.wg)(),(0,n.iD)("div",_,[D,(0,n.Wm)(S,null,{default:(0,n.w5)((()=>[(0,n.Wm)(g,{class:"pa-8"},{default:(0,n.w5)((()=>[b,(0,n.Wm)(y,{data:i.chartData,options:s.chartOptions},null,8,["data","options"])])),_:1}),0!==s.displayData.repeatedErrors.length?((0,n.wg)(),(0,n.j4)(g,{key:0,class:"pa-8"},{default:(0,n.w5)((()=>[x,(0,n.Wm)(E,{errors:s.displayData.repeatedErrors},null,8,["errors"])])),_:1})):(0,n.kq)("",!0)])),_:1})])):(0,n.kq)("",!0),s.displayData.logs&&s.displayData.totalCount>0?((0,n.wg)(),(0,n.iD)("div",C,[W,(0,n.Wm)(j,{log:s.displayData.logs},null,8,["log"])])):(0,n.kq)("",!0)])),_:1})])),_:1})):((0,n.wg)(),(0,n.iD)("div",A,[(0,n.Wm)(z,{indeterminate:"",color:"primary"})]))])}const S=(0,n._)("div",{class:"text-h6 py-3"},"Rühma kokkuvõte",-1),j={key:0},z=(0,n._)("thead",null,null,-1),I=(0,n._)("td",null,"Päringute koguarv:",-1),T=(0,n._)("td",null,"Edukate päringute arv:",-1),U=(0,n._)("td",null,"Vigaste päringute arv:",-1),q=(0,n._)("td",null,"Ühekordsete vigade arv:",-1),V={key:1,class:"pa-8"};function L(e,t,a,l,s,r){const o=(0,n.up)("v-chip"),u=(0,n.up)("v-table"),d=(0,n.up)("v-progress-circular"),p=(0,n.up)("v-row"),c=(0,n.up)("v-card");return(0,n.wg)(),(0,n.iD)(n.HY,null,[S,(0,n.Wm)(c,{class:"py-10"},{default:(0,n.w5)((()=>[a.analysis.totalCount>0?((0,n.wg)(),(0,n.iD)("div",j,[(0,n.Wm)(p,{class:"px-16",justify:"space-between"},{default:(0,n.w5)((()=>[(0,n.Wm)(u,{class:"pl-16",style:{width:"520px"}},{default:(0,n.w5)((()=>[z,(0,n._)("tbody",null,[(0,n._)("tr",null,[I,(0,n._)("td",null,(0,i.zw)(a.analysis.totalCount),1)]),(0,n._)("tr",null,[T,(0,n._)("td",null,[(0,n.Wm)(o,{color:"green"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(a.analysis.validCount)+" ("+(0,i.zw)((100*a.analysis.validCount/a.analysis.totalCount).toFixed(1))+"%) ",1)])),_:1})])]),(0,n._)("tr",null,[U,(0,n._)("td",null,[(0,n.Wm)(o,{color:"red"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(this.$props.analysis.errorCount)+" ("+(0,i.zw)((100*a.analysis.errorCount/a.analysis.totalCount).toFixed(1))+"%) ",1)])),_:1})])]),(0,n._)("tr",null,[q,(0,n._)("td",null,(0,i.zw)(this.$props.analysis.uniqueErrorCount),1)])])])),_:1}),(0,n.Wm)(d,{class:"mr-16 mt-6",size:160,width:30,"model-value":100*a.analysis.errorCount/a.analysis.totalCount,color:"red-lighten-1","bg-color":"light-green-lighten-1"},null,8,["model-value"])])),_:1})])):((0,n.wg)(),(0,n.iD)("p",V,"Valitud ajavahemikus ei tehtud ühtegi päringut."))])),_:1})],64)}var O={name:"AnalysisSummary",props:{analysis:{totalCount:Number,errorCount:Number,uniqueErrorCount:Number,validCount:Number}}};const F=(0,m.Z)(O,[["render",L]]);var N=F;const P={class:"text-h6 py-3"},M={key:0,class:"pb-6"},R={key:0},G=(0,n._)("thead",null,null,-1),B=(0,n._)("td",null,"Päringute koguarv:",-1),K=(0,n._)("td",null,"Edukate päringute arv:",-1),Z=(0,n._)("td",null,"Vigaste päringute arv:",-1),$=(0,n._)("td",null,"Ühekordsete vigade arv:",-1),Y={key:1,class:"pt-8 px-16"};function Q(e,t,a,l,s,r){const o=(0,n.up)("v-chip"),u=(0,n.up)("v-alert"),d=(0,n.up)("QueryEventsBar"),p=(0,n.up)("v-table"),c=(0,n.up)("v-row"),m=(0,n.up)("v-card");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",P,(0,i.zw)(a.analysis.studentName),1),0!==a.analysis.fileNames.length?((0,n.wg)(),(0,n.iD)("div",M,[(0,n._)("span",null,[(0,n.Uk)(" Analüüsitud failid: "),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.analysis.fileNames,(e=>((0,n.wg)(),(0,n.j4)(o,{key:e,size:"small"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(e),1)])),_:2},1024)))),128))])])):(0,n.kq)("",!0),a.analysis.error?((0,n.wg)(),(0,n.j4)(u,{key:1,class:"mb-6",color:"red",variant:"tonal"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(r.errorMessage),1)])),_:1})):(0,n.kq)("",!0),0===a.analysis.fileNames.length||a.analysis.error?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(m,{key:2,class:"py-8"},{default:(0,n.w5)((()=>[0!==a.analysis.totalCount?((0,n.wg)(),(0,n.iD)("div",R,[(0,n.Wm)(d,{"query-event-groups":a.analysis.queryEventGroups,"total-query-count":a.analysis.totalCount,"end-time":a.analysis.endTime},null,8,["query-event-groups","total-query-count","end-time"]),(0,n.Wm)(c,{class:"pa-8 justify-center"},{default:(0,n.w5)((()=>[(0,n.Wm)(p,{class:"w-66"},{default:(0,n.w5)((()=>[G,(0,n._)("tbody",null,[(0,n._)("tr",null,[B,(0,n._)("td",null,(0,i.zw)(a.analysis.totalCount),1)]),(0,n._)("tr",null,[K,(0,n._)("td",null,[(0,n.Wm)(o,{color:"green"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(a.analysis.validCount)+" ("+(0,i.zw)((100*a.analysis.validCount/a.analysis.totalCount).toFixed(1))+"%) ",1)])),_:1})])]),(0,n._)("tr",null,[Z,(0,n._)("td",null,[(0,n.Wm)(o,{color:"red"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(this.$props.analysis.errorCount)+" ("+(0,i.zw)((100*a.analysis.errorCount/a.analysis.totalCount).toFixed(1))+"%) ",1)])),_:1})])]),(0,n._)("tr",null,[$,(0,n._)("td",null,(0,i.zw)(this.$props.analysis.uniqueErrorCount),1)])])])),_:1})])),_:1})])):a.analysis.error?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("p",Y,"Valitud ajavahemikus ei tehtud ühtegi päringut."))])),_:1}))],64)}const H=e=>((0,n.dD)("data-v-fcc2805a"),e=e(),(0,n.Cn)(),e),X=H((()=>(0,n._)("br",null,null,-1))),J={class:"time-marker"},ee=H((()=>(0,n._)("br",null,null,-1))),te={class:"time-marker text-end"},ae=H((()=>(0,n._)("br",null,null,-1)));function le(e,t,a,l,s,r){const o=(0,n.up)("v-tooltip"),u=(0,n.up)("v-card"),d=(0,n.up)("v-row"),p=(0,n.up)("v-container");return(0,n.wg)(),(0,n.j4)(p,{class:"px-8"},{default:(0,n.w5)((()=>[(0,n.Wm)(d,{class:"py-2 justify-center"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.indexedItems,(e=>((0,n.wg)(),(0,n.j4)(u,{key:e.id,class:"rounded-0",elevation:"0",width:r.getGroupLength(e.count),height:48,color:e.valid?"light-green-lighten-1":"red-lighten-1"},{default:(0,n.w5)((()=>[(0,n.Wm)(o,{activator:"parent",location:"bottom",class:"text-center"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(e.count)+" "+(0,i.zw)(r.getGroupDescription(e))+" ",1),X,(0,n.Uk)(" "+(0,i.zw)(e.time),1)])),_:2},1024)])),_:2},1032,["width","color"])))),128))])),_:1}),(0,n.Wm)(d,{class:"px-6 d-flex justify-space-between flex-row"},{default:(0,n.w5)((()=>[(0,n._)("div",J,[(0,n.Uk)(" Algus: "),ee,(0,n.Uk)(" "+(0,i.zw)(a.queryEventGroups[0].time),1)]),(0,n._)("div",te,[(0,n.Uk)(" Lõpp: "),ae,(0,n.Uk)(" "+(0,i.zw)(a.endTime),1)])])),_:1})])),_:1})}var ne={name:"QueryEventsBar",props:{queryEventGroups:Array,totalQueryCount:Number,endTime:String},methods:{getGroupLength(e){return Math.round(750*e/this.$props.totalQueryCount)},getGroupDescription(e){return e.valid&&1===e.count?"korrektne päring":e.valid?"korrektset päringut":1===e.count?"vigane päring":"vigast päringut"}},computed:{indexedItems(){return this.queryEventGroups.map(((e,t)=>({id:t,...e})))}}};const se=(0,m.Z)(ne,[["render",le],["__scopeId","data-v-fcc2805a"]]);var ie=se,re={name:"AnalysisIndividual",components:{QueryEventsBar:ie},props:{analysis:{studentName:String,error:String,fileNames:Array,totalCount:Number,errorCount:Number,uniqueErrorCount:Number,validCount:Number,queryEventGroups:Array}},computed:{errorMessage(){return 0!==this.analysis.fileNames.length?"Logifaili lugemine ebaõnnestus, faili sisuks ei ole PostgreSQL serveri logid.":"Logifaile ei leitud"}}};const oe=(0,m.Z)(re,[["render",Q]]);var ue=oe,de=a(5866),pe=a(9646);const ce={colspan:3,class:"statement-code pa-8"};function me(e,t,a,l,s,r){const o=(0,n.up)("v-data-table");return null!=this.errors[0].statement?((0,n.wg)(),(0,n.j4)(o,{key:0,headers:s.headers,items:r.indexedItems,"show-expand":!0,expanded:s.expanded,"onUpdate:expanded":t[0]||(t[0]=e=>s.expanded=e),"item-value":"statement","items-per-page":"10"},{"expanded-row":(0,n.w5)((({item:e})=>[(0,n._)("tr",null,[(0,n._)("td",ce,(0,i.zw)(e.statement),1)])])),_:1},8,["headers","items","expanded"])):((0,n.wg)(),(0,n.j4)(o,{key:1,headers:s.headers,items:a.errors,"items-per-page":"10"},null,8,["headers","items"]))}var ve={name:"RepeatedErrorsPanel",props:{errors:Array},data(){return{headers:[{title:"Veateade",key:"message",sortable:!1},{title:void 0!==this.errors[0].statement?"Korduste arv":"Kogus",key:"amount"}],expanded:[]}},computed:{indexedItems(){return this.errors.map(((e,t)=>({id:t,...e})))}}};const ye=(0,m.Z)(ve,[["render",me],["__scopeId","data-v-1490ba32"]]);var ge=ye;const we={key:0},he={key:0,class:"statement-code",style:{"white-space":"pre-wrap"}},fe={key:1,class:"statement-code"},ke={key:2,class:"statement-code"},_e={key:3,class:"pt-2"},De={style:{color:"red"}},be={key:0},xe={key:0};function Ce(e,t,a,l,s,r){const o=(0,n.up)("v-btn"),u=(0,n.up)("v-card-actions"),d=(0,n.up)("v-chip"),p=(0,n.up)("v-divider"),c=(0,n.up)("v-container"),m=(0,n.up)("v-data-table"),v=(0,n.up)("v-card");return(0,n.wg)(),(0,n.j4)(v,null,{default:(0,n.w5)((()=>[(0,n.Wm)(c,{class:"pa-4"},{default:(0,n.w5)((()=>[(0,n.Wm)(u,null,{default:(0,n.w5)((()=>[(0,n.Wm)(o,{color:"primary",onclick:r.expandAll},{default:(0,n.w5)((()=>[(0,n.Uk)("Pikenda päringud")])),_:1},8,["onclick"]),(0,n.Wm)(o,{color:"primary",onclick:r.closeAll},{default:(0,n.w5)((()=>[(0,n.Uk)("Lühenda päringud")])),_:1},8,["onclick"])])),_:1}),(0,n.Wm)(m,{headers:s.headers,items:r.indexedItems,"show-expand":!0,expanded:s.expanded,"onUpdate:expanded":t[0]||(t[0]=e=>s.expanded=e),"items-per-page":"15","items-per-page-text":"Päringute arv leheküljel:"},{["item.timestamp"]:(0,n.w5)((({value:e})=>[(0,n.Uk)((0,i.zw)(new Date(e).toLocaleString("en-GB")),1)])),["item.errorType"]:(0,n.w5)((({item:e,value:t})=>[e.internal_query?((0,n.wg)(),(0,n.iD)("div",we,[(0,n.Wm)(d,{color:"orange",size:"small",class:"mt-2"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(s.errorTypes.function),1)])),_:1})])):(0,n.kq)("",!0),(0,n._)("div",null,[(0,n.Wm)(d,{color:"VALID"===t?"green":"red",size:"small",class:"my-2"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(s.errorTypes[t]),1)])),_:2},1032,["color"])])])),["item.statementError"]:(0,n.w5)((({item:e,isExpanded:t,internalItem:a})=>[(0,n.Wm)(c,{class:"px-0"},{default:(0,n.w5)((()=>[t(a)?((0,n.wg)(),(0,n.iD)("span",he,(0,i.zw)(e.statement),1)):r.isShort(e.statement)?((0,n.wg)(),(0,n.iD)("span",fe,(0,i.zw)(e.statement),1)):((0,n.wg)(),(0,n.iD)("span",ke,(0,i.zw)(e.statement.replace(/\s\s+/g," ").slice(0,63))+"... ",1)),t(a)&&e.message?((0,n.wg)(),(0,n.iD)("div",_e,[(0,n.Wm)(p,{class:"pb-2"}),(0,n._)("div",De,(0,i.zw)(e.message),1),e.internal_query?((0,n.wg)(),(0,n.iD)("div",be," Context: "+(0,i.zw)(e.context),1)):(0,n.kq)("",!0)])):(0,n.kq)("",!0)])),_:2},1024)])),["item.data-table-expand"]:(0,n.w5)((({item:e,internalItem:t,toggleExpand:a,isExpanded:l})=>[r.isShort(e.statement)&&"VALID"===e.errorType?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("td",xe,[(0,n.Wm)(o,{icon:l(t)?"mdi-chevron-up":"mdi-chevron-down",size:"small",variant:"text",onClick:e=>a(t)},null,8,["icon","onClick"])]))])),_:2},1032,["headers","items","expanded"])])),_:1})])),_:1})}var We={name:"LogViewer",props:{log:Array},data(){return{headers:[{title:"Aeg",key:"timestamp",sortable:!1,width:170},{title:"Vea tüüp",key:"errorType",sortable:!1},{title:"Päring",key:"statementError",sortable:!1}],expanded:[],errorTypes:{VALID:"Korrektne",SYNTAX:"Süntaks",NON_EXISTENT_VALUE:"Defineerimata",CONSTRAINT_VIOLATION:"Kitsendus",TYPO:"Trükiviga",AGGREGATE:"Agregatsioon",ALREADY_EXISTS:"Topelt defineerimine",DATATYPE_MISMATCH:"Andmetüübid",CUSTOM_EXCEPTION:"Enda veateade",OTHER:"Muu",function:"Funktsioon"}}},computed:{indexedItems(){return this.log.map(((e,t)=>({id:t,...e})))}},methods:{expandAll(){this.expanded=this.$props.log.map(((e,t)=>t))},closeAll(){this.expanded=[]},isShort(e){return e.replace(/\s\s+/g," ").length<65}}};const Ae=(0,m.Z)(We,[["render",Ce],["__scopeId","data-v-90cca47a"]]);var Ee=Ae;pe.kL.register(pe.Dx,pe.u,pe.De,pe.ZL,pe.uw,pe.f$);var Se={name:"AnalysisPage",components:{AnalysisIndividual:ue,AnalysisSummary:N,Bar:de.$Q,RepeatedErrorsPanel:ge,LogViewer:Ee},props:{analysisResult:Object},data(){return{isGroup:Object.prototype.hasOwnProperty.call(this.analysisResult,"summary"),displayData:this.analysisResult.summary??this.analysisResult,activeListItem:-1,chartOptions:{plugins:{legend:{display:!1}},scales:{y:{min:0,ticks:{stepSize:1}}}}}},computed:{chartData(){return{labels:["Süntaksivead",["Defineerimata","väärtuse","kasutamine"],["Kitsenduse","rikkumine"],"Trükivead",["Agregeeritud","funktsiooni","vead"],["Topelt","defineerimine"],["Andmetüübi","mittevastavus"],["Ise loodud","veateated"],"Muud vead"],datasets:[{title:"Veatüüpide jaotus",backgroundColor:["#5EBD9B","#F8DA62","#104D83","#F79F3D","#72CAD8","#E34F5B","#A048A4","#9561e2","#f66d9b"],data:[this.displayData.syntaxErrorCount,this.displayData.nonExistentValueCount,this.displayData.constraintViolationCount,this.displayData.typoCount,this.displayData.aggregateErrorCount,this.displayData.alreadyExistsErrorCount,this.displayData.datatypeMismatchCount,this.displayData.customErrorCount,this.displayData.otherErrorCount]}]}}}};const je=(0,m.Z)(Se,[["render",E],["__scopeId","data-v-0d208daa"]]);var ze=je,Ie=(0,n.aZ)({components:{AnalysisPage:ze,UploadPage:y},data(){return{showAnalysis:!1,analysis:void 0}},methods:{openAnalysis(e){this.analysis=e,console.log(this.analysis),this.showAnalysis=!0}}});const Te=(0,m.Z)(Ie,[["render",s]]);var Ue=Te,qe=(a(8026),a(730)),Ve=a(7560),Le=a(8600);const Oe=(0,qe.Rd)({components:{...Ve},directives:Le});(0,l.ri)(Ue).use(Oe).mount("#app")}},t={};function a(l){var n=t[l];if(void 0!==n)return n.exports;var s=t[l]={exports:{}};return e[l].call(s.exports,s,s.exports,a),s.exports}a.m=e,function(){var e=[];a.O=function(t,l,n,s){if(!l){var i=1/0;for(d=0;d<e.length;d++){l=e[d][0],n=e[d][1],s=e[d][2];for(var r=!0,o=0;o<l.length;o++)(!1&s||i>=s)&&Object.keys(a.O).every((function(e){return a.O[e](l[o])}))?l.splice(o--,1):(r=!1,s<i&&(i=s));if(r){e.splice(d--,1);var u=n();void 0!==u&&(t=u)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[l,n,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var l in t)a.o(t,l)&&!a.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,l){var n,s,i=l[0],r=l[1],o=l[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(n in r)a.o(r,n)&&(a.m[n]=r[n]);if(o)var d=o(a)}for(t&&t(l);u<i.length;u++)s=i[u],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(d)},l=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=a.O(void 0,[998],(function(){return a(7185)}));l=a.O(l)})();
//# sourceMappingURL=app.24281ecf.js.map