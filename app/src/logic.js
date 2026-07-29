import React from "react";

export class PlannerLogic extends React.Component {
  DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  PL = { 1:"Urgent / Important", 2:"Important", 3:"Not Important", 4:"Not Important / Not Urgent" };
  PC = { 1:{solid:"#DC2626"}, 2:{solid:"#D97706"}, 3:{solid:"#2563EB"}, 4:{solid:"#6B7280"} };
  RO = [{value:"none",label:"No repeat"},{value:"daily",label:"Daily"},{value:"weekdays",label:"Weekdays"},{value:"weekly",label:"Weekly"},{value:"monthly",label:"Monthly"}];
  MEAL_SLOTS = { "07:30":"Breakfast", "12:30":"Lunch", "18:00":"Dinner" };
  MAX_HRS = 4;
  SL = (function(){ var s=[]; for(var h=6;h<=20;h++) for(var m=0;m<60;m+=30) s.push((h<10?"0"+h:""+h)+":"+(m===0?"00":"30")); return s; })();
  TZS = ["Pacific/Auckland","Pacific/Chatham","Australia/Sydney","Australia/Melbourne","Australia/Brisbane","Australia/Perth","Asia/Hong_Kong","Asia/Singapore","Asia/Tokyo","Asia/Bangkok","Asia/Kolkata","Europe/London","Europe/Paris","Europe/Berlin","America/New_York","America/Chicago","America/Denver","America/Los_Angeles","Pacific/Honolulu"];
  STATUS_OPTIONS = [
    {value:"active",label:"Active",icon:"\u25CF",color:"#22C55E"},
    {value:"blocked",label:"Blocked",icon:"\u26D4",color:"#DC2626"},
    {value:"deferred",label:"Deferred",icon:"\u23F8",color:"#F59E0B"},
    {value:"reminder",label:"Reminder",icon:"\uD83D\uDD14",color:"#8B5CF6"}
  ];
  SG = [
    {id:"g1",name:"Crawley Design",color:"#6366F1"},{id:"g2",name:"Ian Wellbeing",color:"#EC4899"},
    {id:"g3",name:"Smart Bin",color:"#10B981"},{id:"g4",name:"Marama Sale",color:"#F97316"},
    {id:"g5",name:"Investments",color:"#0EA5E9"},{id:"g6",name:"Tiger",color:"#EAB308"},
    {id:"g7",name:"Vehicles/Boats",color:"#8B5CF6"},{id:"g8",name:"Development",color:"#14B8A6"},
    {id:"g9",name:"Fun",color:"#F43F5E"}
  ];
  ST = [
    {id:"t01",name:"Ian Crawley Tax/Maintenance",groupId:"g1",priority:1,estimatedHours:2,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t02",name:"Pay Deasil Tax",groupId:"g1",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t03",name:"Body Corp Accounts",groupId:"g1",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t04",name:"MSD Bills",groupId:"g2",priority:1,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t05",name:"Finger",groupId:"g2",priority:1,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t06",name:"Wart",groupId:"g2",priority:2,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t07",name:"Knee",groupId:"g2",priority:2,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t08",name:"Tai Chai",groupId:"g2",priority:2,estimatedHours:1,completed:false,recurring:"daily",description:"Daily practice",parentId:null,status:"active"},
    {id:"t09",name:"Dentist",groupId:"g2",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t10",name:"RFID",groupId:"g3",priority:1,estimatedHours:8,completed:false,recurring:"none",description:"Smart Bin RFID - 8h total",parentId:null,status:"active"},
    {id:"t11",name:"Development Plan",groupId:"g3",priority:2,estimatedHours:2,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t12",name:"Domain Setup",groupId:"g3",priority:2,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t13",name:"Marcus",groupId:"g3",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t14",name:"GST",groupId:"g3",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t15",name:"Grok Plan",groupId:"g4",priority:2,estimatedHours:2,completed:false,recurring:"none",description:"Marama sale strategy",parentId:null,status:"active"},
    {id:"t16",name:"Update Website",groupId:"g4",priority:2,estimatedHours:2,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t17",name:"Investment Grok Plan",groupId:"g5",priority:2,estimatedHours:2,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t18",name:"Craigs",groupId:"g5",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t19",name:"2025 Accounts",groupId:"g6",priority:4,estimatedHours:3,completed:false,recurring:"none",description:"Tiger accounts",parentId:null,status:"active"},
    {id:"t20",name:"Close Hang Seng Account",groupId:"g6",priority:4,estimatedHours:1,completed:false,recurring:"none",description:"Need to go to Hong Kong",parentId:null,status:"blocked"},
    {id:"t21",name:"VW Brakes/Wheels",groupId:"g7",priority:2,estimatedHours:3,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t22",name:"Sell Alfa Parts",groupId:"g7",priority:2,estimatedHours:2,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t23",name:"Oil Change GT",groupId:"g7",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t24",name:"Oil Change VW",groupId:"g7",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"},
    {id:"t25",name:"GT Wine",groupId:"g7",priority:3,estimatedHours:1,completed:false,recurring:"none",description:"",parentId:null,status:"active"}
  ];
  SA = [{id:"a01",name:"Dentist",days:[3],time:"10:00",duration:1,color:"#DC2626",notes:"Regular checkup"}];
  SGo = ["Sell Marama $1,400,000","Investments return 25%","SmartBin $1,000,000 sales","Travel","Cashflow to pay for life","Fun","Leverage AI & Software Products","Get off Job Seeker"];
  SEED_M = "Ians Advancement - Power of choices from profit. Financially Independent through Passive Income. Choices to Retire. Transfer effort to own software products (High Margin, no capital). More money in Investing. Cheap place to live in NZ with Income. Spend winters offshore.";
  SPr = {
    blocks: [
      {id:"b1",label:"Sharpen the Saw",start:"06:00",end:"07:30",priority:null,note:"Thinking, Tai Chi, wellbeing"},
      {id:"b2",label:"Deep Work",start:"08:00",end:"12:30",priority:1,note:"P1/P2 complex tasks"},
      {id:"b3",label:"General Work",start:"13:00",end:"17:00",priority:2,note:"P2/P3 tasks"},
      {id:"b4",label:"Admin & Light",start:"17:00",end:"18:00",priority:4,note:"P4 admin"},
      {id:"b5",label:"Evening",start:"18:30",end:"21:00",priority:3,note:"Light / overflow"}
    ],
    maxContinuousHours: 2.5, workDays: [0,1,2,3,4,5], timezone: "Pacific/Auckland"
  };

  resizeGuard = { active:false, until:0 };
  edgeGuard = { until:0, side:null };

  state = {
    view:"calendar", tasks:this.ST, groups:this.SG, goals:this.SGo, mission:this.SEED_M,
    cal:{}, appts:this.SA, prefs:this.SPr, wgoals:{}, loaded:false,
    anchorMs:this.getMon(new Date()).getTime(), dragId:null, dragOrigin:null,
    plFilter:"all", editWG:-1, wgDraft:"", nowTick:Date.now(), mobDay:0, sideOpen:false,
    isMob:false, isPortrait:false, navHover:null, drawerOpen:false, hoverTask:null,
    toast:null, undoStack:[], modal:null, draft:null,
    taskFilter:"all", groupFilter:"all", missionEdit:false, missionDraft:"", goalDrafts:[],
    prefsEdit:false, prefsDraft:null
  };

  /* ---------- utils ---------- */
  pad2(n){ return n<10?"0"+n:""+n; }
  getMon(d){ var x=new Date(d); var dy=x.getDay(); x.setDate(x.getDate()-dy+(dy===0?-6:1)); x.setHours(0,0,0,0); return x; }
  localKey(d){ return d.getFullYear()+"-"+this.pad2(d.getMonth()+1)+"-"+this.pad2(d.getDate()); }
  uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
  rlb(v){ for(var i=0;i<this.RO.length;i++) if(this.RO[i].value===v) return this.RO[i].label; return ""; }
  fmtW(m){ var s=new Date(m); s.setDate(s.getDate()+6); var o={day:"numeric",month:"short"}; return m.toLocaleDateString("en-NZ",o)+" \u2014 "+s.toLocaleDateString("en-NZ",o); }
  getTodayIdx(tz){ try{ var str=new Date().toLocaleDateString("en-US",{weekday:"short",timeZone:tz}); var map={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}; return map[str]!==undefined?map[str]:(new Date().getDay()===0?6:new Date().getDay()-1);}catch(e){ var d=new Date().getDay(); return d===0?6:d-1; } }
  getNowInTz(tz){ try{ return new Date().toLocaleString("en-US",{timeZone:tz,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).replace(/\s/g,""); }catch(e){ var n=new Date(); return this.pad2(n.getHours())+":"+this.pad2(n.getMinutes()); } }
  isResizing(){ return this.resizeGuard.active || Date.now() < this.resizeGuard.until; }
  wk(){ return this.getMon(new Date(this.state.anchorMs)).toISOString().slice(0,10); }
  ld(k,f){ try{ var v=localStorage.getItem("konqr_"+k); return v!==null?JSON.parse(v):f; }catch(e){ return f; } }
  sv(k,d){ try{ localStorage.setItem("konqr_"+k,JSON.stringify(d)); }catch(e){} }
  /* ---------- cloud data file sync ---------- */
  hasFS(){ return "showOpenFilePicker" in window; }
  buildSnapshot(){
    var s=this.state;
    return { app:"KONQR", version:13, savedAt:new Date().toISOString(),
      tasks:s.tasks, groups:s.groups, goals:s.goals, mission:s.mission,
      cal:s.cal, appts:s.appts, prefs:s.prefs, wgoals:s.wgoals };
  }
  applySnapshot(d){
    var p={};
    ["tasks","groups","goals","mission","cal","appts","prefs","wgoals"].forEach(function(k){ if(d[k]!==undefined) p[k]=d[k]; });
    this.setState(p);
  }
  scheduleFileSave(){
    if(!this._fileHandle) return;
    var self=this; this._fileDirty=true;
    if(this.state.fileStatus!=="dirty"&&this.state.fileStatus!=="blocked") this.setState({fileStatus:"dirty"});
    clearTimeout(this._ft);
    this._ft=setTimeout(function(){ self.writeDataFile(); },900);
  }
  async writeDataFile(){
    if(!this._fileHandle) return;
    try{
      var w=await this._fileHandle.createWritable();
      await w.write(JSON.stringify(this.buildSnapshot(),null,2));
      await w.close();
      this._fileDirty=false;
      this._fileRetried=false;
      if(this.state.fileStatus!=="on") this.setState({fileStatus:"on"});
    }catch(e){
      var self=this;
      if(!this._fileRetried){
        this._fileRetried=true;
        clearTimeout(this._ft);
        this._ft=setTimeout(function(){ self.writeDataFile(); },1600);
      } else {
        this._fileRetried=false;
        if(this.state.fileStatus!=="blocked") this.setState({fileStatus:"blocked"});
      }
    }
  }
  async connectDataFile(){
    var self=this;
    if(this.hasFS()){
      try{
        var res=await window.showOpenFilePicker({types:[{description:"KONQR data",accept:{"application/json":[".json"]}}]});
        var h=res[0]; this._fileHandle=h;
        try{ if(h.requestPermission) await h.requestPermission({mode:"readwrite"}); }catch(e){}
        var f=await h.getFile(); var txt=await f.text();
        if(txt && txt.trim().length){
          try{ this.applySnapshot(JSON.parse(txt)); this.toast("Loaded from "+f.name+" \u2014 autosave on"); }
          catch(e){ this.toast("File is not valid JSON \u2014 it will be overwritten on next change"); }
        } else { this.toast("Connected "+f.name+" \u2014 autosave on"); }
        this._fileDirty=false;
        this.setState({fileStatus:"on", fileName:f.name});
      }catch(e){
        if(e && e.name==="AbortError"){
          this.toast("No file yet \u2014 choose where to create konqr-data.json");
          this.saveDataFile();
        }
      }
    } else {
      var input=document.createElement("input"); input.type="file"; input.accept=".json,application/json";
      input.onchange=function(e){
        var f=e.target.files[0]; if(!f) return;
        var r=new FileReader();
        r.onload=function(ev){
          try{ self.applySnapshot(JSON.parse(ev.target.result)); self.setState({fileStatus:"loaded", fileName:f.name}); self.toast("Loaded "+f.name); }
          catch(err){ self.toast("Load failed \u2014 not valid JSON"); }
        };
        r.readAsText(f);
      };
      input.click();
    }
  }
  async saveDataFile(){
    if(this._fileHandle){ this.writeDataFile(); this.toast("Saved"); return; }
    if(this.hasFS()){
      try{
        var h=await window.showSaveFilePicker({suggestedName:"konqr-data.json",types:[{description:"KONQR data",accept:{"application/json":[".json"]}}]});
        this._fileHandle=h;
        try{ if(h.requestPermission) await h.requestPermission({mode:"readwrite"}); }catch(e){}
        await this.writeDataFile();
        this.setState({fileName:h.name||"konqr-data.json"});
        this.toast("Saved \u2014 autosave on");
      }catch(e){}
    } else {
      var data=JSON.stringify(this.buildSnapshot(),null,2);
      var url=URL.createObjectURL(new Blob([data],{type:"application/json"}));
      var a=document.createElement("a"); a.href=url; a.download="konqr-data.json"; a.click(); URL.revokeObjectURL(url);
      this.toast("Downloaded copy \u2014 replace the one in your OneDrive folder");
    }
  }
  filePillLabel(){
    var st=this.state.fileStatus;
    if(st==="on") return "\u25CF "+(this.state.fileName||"Synced");
    if(st==="dirty") return "\u25CF Saving\u2026";
    if(st==="blocked") return "\u25CF Blocked \u2014 tap to retry";
    if(st==="loaded") return "\u25CF "+(this.state.fileName||"Loaded")+" (copy)";
    return "\u25CB Data file";
  }
  filePillColor(){
    var st=this.state.fileStatus;
    if(st==="on") return "#22C55E";
    if(st==="dirty") return "#F59E0B";
    if(st==="blocked") return "#EF4444";
    if(st==="loaded") return "#38BDF8";
    return "rgba(231,233,236,.45)";
  }
  onFilePill(){
    if(this.state.fileStatus==="blocked"){ this.writeDataFile(); }
    else if(!this._fileHandle){ this.connectDataFile(); }
    else { this.saveDataFile(); }
  }

  toast(m){ var self=this; this.setState({toast:m}); clearTimeout(this._tt); this._tt=setTimeout(function(){ self.setState({toast:null}); },3000); }

  componentDidMount(){
    var self=this;
    this.setState({
      tasks:this.ld("v13-tasks",this.ST), groups:this.ld("v13-groups",this.SG), goals:this.ld("v13-goals",this.SGo),
      mission:this.ld("v13-mission",this.SEED_M), cal:this.ld("v13-cal",{}), appts:this.ld("v13-appts",this.SA),
      prefs:this.ld("v13-prefs",this.SPr), wgoals:this.ld("v13-wgoals",{}) || {}, loaded:true, fileStatus:"off", fileName:"",
      isMob: window.innerWidth < 820, isPortrait: window.innerHeight > window.innerWidth
    });
    this._rz=function(){ self.setState({isMob: window.innerWidth < 820, isPortrait: window.innerHeight > window.innerWidth}); };
    window.addEventListener("resize",this._rz);
    this._iv=setInterval(function(){ self.setState({nowTick:Date.now()}); },30000);
    this._bu=function(e){ if(self._fileDirty && self._fileHandle){ self.writeDataFile(); } };
    window.addEventListener("beforeunload",this._bu);
    setTimeout(function(){ if(!self._fileHandle && self.hasFS()){ self.toast("Tip: click \u25CB Data file (top right) to load your synced data"); } },1200);
  }
  componentWillUnmount(){ window.removeEventListener("resize",this._rz); window.removeEventListener("beforeunload",this._bu); clearInterval(this._iv); clearTimeout(this._tt); clearTimeout(this._ft); }
  componentDidUpdate(pp, ps){
    if(!this.state.loaded) return;
    var s=this.state;
    this.sv("v13-tasks",s.tasks); this.sv("v13-groups",s.groups); this.sv("v13-goals",s.goals);
    this.sv("v13-mission",s.mission); this.sv("v13-cal",s.cal); this.sv("v13-appts",s.appts);
    this.sv("v13-prefs",s.prefs); this.sv("v13-wgoals",s.wgoals);
    var dataChanged = !ps || ps.tasks!==s.tasks || ps.groups!==s.groups || ps.goals!==s.goals || ps.mission!==s.mission || ps.cal!==s.cal || ps.appts!==s.appts || ps.prefs!==s.prefs || ps.wgoals!==s.wgoals;
    if(dataChanged) this.scheduleFileSave();
  }

  /* ---------- styling helpers ---------- */
  accent(){ return this.props.accent || "#6D5AF0"; }
  glossAmt(){ var g=this.props.gloss; return g===undefined||g===null?1:Number(g); }
  glossFill(hex){
    var g=this.glossAmt();
    return "linear-gradient(180deg,rgba(255,255,255,"+(0.26*g).toFixed(3)+"),rgba(255,255,255,"+(0.04*g).toFixed(3)+") 46%,rgba(0,0,0,"+(0.16*g).toFixed(3)+")), "+hex;
  }
  glossShadow(){
    var g=this.glossAmt();
    return "inset 0 1px 0 rgba(255,255,255,"+(0.4*g).toFixed(2)+"), inset 0 -1px 0 rgba(0,0,0,.25), 0 10px 22px -14px rgba(0,0,0,.95)";
  }
  solidChip(hex,dim){
    return {
      background:this.glossFill(dim?"#3B4149":hex),
      color:dim?"rgba(255,255,255,.5)":"#FFFFFF",
      boxShadow:this.glossShadow(),
      border:"1px solid rgba(255,255,255,.12)"
    };
  }
  glassBtn(active,color){
    var c=color||this.accent();
    return active
      ? {padding:"6px 12px",borderRadius:9,border:"1px solid "+c,background:this.glossFill(c),color:"#fff",fontSize:11.5,fontWeight:600,cursor:"pointer",boxShadow:this.glossShadow()}
      : {padding:"6px 12px",borderRadius:9,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.05)",color:"rgba(231,233,236,.75)",fontSize:11.5,fontWeight:500,cursor:"pointer"};
  }

  /* ---------- derived ---------- */
  gMap(){ var m={}; this.state.groups.forEach(function(g){ m[g.id]=g; }); return m; }
  apptMap(){
    var m={}, SL=this.SL;
    this.state.appts.forEach(function(a){
      var span=Math.max(1,Math.ceil((a.duration||1)*2));
      var ti=SL.indexOf(a.time); if(ti<0) return;
      (a.days||[]).forEach(function(di){ for(var i=0;i<span&&ti+i<SL.length;i++) m[di+"-"+SL[ti+i]]={apptId:a.id,isStart:i===0,span:span,appt:a}; });
    });
    return m;
  }
  setWCal(fn){
    var wk=this.wk();
    this.setState(function(s){ var o=s.cal[wk]||{}; var r=Object.assign({},s.cal); r[wk]=typeof fn==="function"?fn(o):fn; return {cal:r}; });
  }
  pushUndo(){
    var s=this.state, wk=this.wk();
    this.setState(function(st){ return {undoStack: st.undoStack.concat([{cal:JSON.parse(JSON.stringify(st.cal[wk]||{})),tasks:JSON.parse(JSON.stringify(st.tasks))}]).slice(-20)}; });
  }

  /* ---------- actions ---------- */
  placeTask(tid,col,time){
    this.pushUndo();
    var self=this, am=this.apptMap(), SL=this.SL;
    var task=this.state.tasks.find(function(t){ return t.id===tid; }); if(!task) return;
    var span=Math.max(1,Math.ceil((task.estimatedHours||1)*2));
    var ti=SL.indexOf(time); if(ti<0) return;
    if(am[col.di+"-"+SL[ti]]){ this.toast("Blocked by appointment"); return; }
    var days=[col.di], rec=task.recurring||"none";
    if(rec==="daily") days=[0,1,2,3,4,5,6]; else if(rec==="weekdays") days=[0,1,2,3,4];
    var overlap=false;
    this.setState(function(s){
      var src=s.cal[col.wkKey]||{}, n={};
      Object.keys(src).forEach(function(k){ if(!src[k]||src[k].taskId!==tid) n[k]=src[k]; });
      days.forEach(function(di){
        for(var i=0;i<span&&ti+i<SL.length;i++){
          var ck=di+"-"+SL[ti+i];
          if(am[ck]||(n[ck]&&n[ck].taskId!==tid)) overlap=true;
          n[ck]={taskId:tid,isStart:i===0,span:span,recurring:days.length>1};
        }
      });
      var r=Object.assign({},s.cal); r[col.wkKey]=n; return {cal:r};
    });
    if(days.length>1) this.toast("Placed on "+days.length+" days at "+time+(overlap?" (some overlaps)":""));
    else if(overlap) this.toast("Placed with overlap - consider moving");
  }
  handleDrop(tid,col,time){
    var origin=this.state.dragOrigin;
    if(origin && origin!==col.wkKey){
      this.setState(function(s){
        var src=s.cal[origin]||{}, cleaned={};
        Object.keys(src).forEach(function(k){ if(!src[k]||src[k].taskId!==tid) cleaned[k]=src[k]; });
        var r=Object.assign({},s.cal); r[origin]=cleaned; return {cal:r};
      });
    }
    this.placeTask(tid,col,time);
    this.setState({dragId:null,dragOrigin:null});
  }
  removeFromCal(tid){ this.setWCal(function(prev){ var n={}; Object.keys(prev).forEach(function(k){ if(!prev[k]||prev[k].taskId!==tid) n[k]=prev[k]; }); return n; }); }
  toggleDone(tid){ this.setState(function(s){ return {tasks:s.tasks.map(function(t){ return t.id===tid?Object.assign({},t,{completed:!t.completed}):t; })}; }); }
  delTask(id){ this.removeFromCal(id); this.setState(function(s){ return {tasks:s.tasks.filter(function(t){ return t.id!==id; }),modal:null,draft:null}; }); }
  reassignPriority(tid,p){ this.setState(function(s){ return {tasks:s.tasks.map(function(t){ return t.id===tid?Object.assign({},t,{priority:p}):t; })}; }); this.toast("Moved to P"+p); }

  duplicateTask(tid){
    var s=this.state, wk=this.wk(), SL=this.SL, am=this.apptMap();
    var orig=s.tasks.find(function(t){ return t.id===tid; }); if(!orig) return;
    var dup=Object.assign({},orig,{id:this.uid(),name:orig.name+" (copy)",completed:false});
    this.setState(function(st){ return {tasks:st.tasks.concat([dup])}; });
    var span=Math.max(1,Math.ceil((dup.estimatedHours||1)*2)), cur=s.cal[wk]||{}, spot=null;
    for(var d=0;d<7&&!spot;d++){
      for(var ti=0;ti<=SL.length-span;ti++){
        var ok=true;
        for(var i=0;i<span;i++){ var ck=d+"-"+SL[ti+i]; if(cur[ck]||am[ck]){ ok=false; break; } }
        if(ok){ spot={d:d,t:SL[ti]}; break; }
      }
    }
    if(spot){
      this.setWCal(function(prev){
        var n=Object.assign({},prev), si=SL.indexOf(spot.t);
        for(var i=0;i<span;i++) n[spot.d+"-"+SL[si+i]]={taskId:dup.id,isStart:i===0,span:span};
        return n;
      });
      this.toast("Copy placed "+this.DAYS[spot.d]+" "+spot.t+" - drag to move");
    } else this.toast("Copy created in Parking Lot");
  }

  saveTaskDraft(){
    var d=this.state.draft; if(!d||!d.name||!d.name.trim()) return;
    var hrs=Number(d.estimatedHours)||1;
    var payload={name:d.name.trim(),description:d.description||"",groupId:d.groupId||"",priority:Number(d.priority),estimatedHours:hrs,recurring:d.recurring,parentId:d.parentId||null,status:d.status||"active"};
    if(d.id){ payload.id=d.id; payload.completed=d.completed; }
    if(hrs>this.MAX_HRS && !payload.parentId){
      var n=Math.ceil(hrs/this.MAX_HRS);
      var each=Math.min(this.MAX_HRS,Math.round((hrs/n)*10)/10);
      var last=Math.round((hrs-each*(n-1))*10)/10;
      var base=(payload.name||"").replace(/ \(\d+\/\d+\)$/,"");
      var parts=[];
      for(var i=0;i<n;i++) parts.push({name:base+" - Part "+(i+1),hours:i===n-1?last:each});
      this.setState({modal:{kind:"split"},draft:{parent:payload,parts:parts,total:hrs}});
      return;
    }
    var s=this.state, old=s.tasks.find(function(t){ return t.id===payload.id; });
    var tid=payload.id||this.uid();
    var updated = (payload.id&&old) ? s.tasks.map(function(t){ return t.id===payload.id?Object.assign({},payload,{id:tid}):t; })
                                    : s.tasks.concat([Object.assign({},payload,{id:tid,completed:false})]);
    this.setState({tasks:updated,modal:null,draft:null});
    var SL=this.SL, am=this.apptMap(), prefs=s.prefs;
    var recurChanged = old && old.recurring!==payload.recurring;
    var hoursChanged = old && old.estimatedHours!==payload.estimatedHours;
    if(recurChanged){
      var task=updated.find(function(t){ return t.id===tid; });
      var span=Math.max(1,Math.ceil((task.estimatedHours||1)*2));
      var dtp=[]; if(task.recurring==="daily") dtp=[0,1,2,3,4,5,6]; else if(task.recurring==="weekdays") dtp=[0,1,2,3,4]; else if(task.recurring==="weekly"||task.recurring==="monthly") dtp=[0];
      this.setWCal(function(prev){
        var n={}; Object.keys(prev).forEach(function(k){ if(!prev[k]||prev[k].taskId!==tid) n[k]=prev[k]; });
        if(task.recurring!=="none"){
          var blocks=(prefs.blocks||[]).slice().sort(function(a,b){ return SL.indexOf(a.start)-SL.indexOf(b.start); });
          dtp.forEach(function(di){
            var placed=false;
            blocks.forEach(function(block){
              if(placed) return;
              var si=SL.indexOf(block.start), ei=SL.indexOf(block.end); if(si<0||ei<0) return;
              for(var c=si;c<=ei-span;c++){
                var ok=true;
                for(var i=0;i<span;i++){ var ck=di+"-"+SL[c+i]; if(am[ck]||n[ck]){ ok=false; break; } }
                if(ok){ for(var j=0;j<span;j++) n[di+"-"+SL[c+j]]={taskId:tid,isStart:j===0,span:span,recurring:true}; placed=true; return; }
              }
            });
          });
        }
        return n;
      });
    } else if(hoursChanged){
      var t2=updated.find(function(t){ return t.id===tid; });
      if(t2){
        var sp=Math.max(1,Math.ceil((t2.estimatedHours||1)*2));
        this.setWCal(function(prev){
          var n={}, starts=[];
          Object.keys(prev).forEach(function(k){ if(prev[k]&&prev[k].taskId===tid){ if(prev[k].isStart) starts.push(k); } else n[k]=prev[k]; });
          starts.forEach(function(sk){
            var di=parseInt(sk.split("-")[0],10), tm=sk.substring(sk.indexOf("-")+1), sti=SL.indexOf(tm);
            for(var i=0;i<sp&&sti+i<SL.length;i++) n[di+"-"+SL[sti+i]]={taskId:tid,isStart:i===0,span:sp,recurring:prev[sk]?prev[sk].recurring:false};
          });
          return n;
        });
      }
    }
  }

  createSubTasks(){
    var d=this.state.draft; if(!d) return;
    var parent=d.parent, parts=d.parts, self=this;
    if(!parts.every(function(p){ return (p.name||"").trim(); })) return;
    var tasks=this.state.tasks;
    var old=tasks.find(function(t){ return t.id===parent.id; });
    var cleaned=tasks.filter(function(t){
      if(old && t.parentId===old.id) return false;
      if(old && t.id===old.id) return false;
      return true;
    });
    var pid=parent.id||this.uid();
    var subs=parts.map(function(p,i){ return Object.assign({},parent,{id:i===0?pid:self.uid(),name:p.name,estimatedHours:Number(p.hours),parentId:pid,completed:false}); });
    if(old) this.removeFromCal(old.id);
    this.setState({tasks:cleaned.concat(subs),modal:null,draft:null});
    this.toast(parts.length+" sub-tasks created");
  }

  clearCalendar(){
    this.pushUndo();
    var tasks=this.state.tasks, parents={}, nonSubs=[];
    tasks.forEach(function(t){
      if(t.parentId){ if(!parents[t.parentId]) parents[t.parentId]={totalHours:0,tasks:[]}; parents[t.parentId].totalHours+=(t.estimatedHours||1); parents[t.parentId].tasks.push(t); }
      else nonSubs.push(t);
    });
    var merged=nonSubs.slice();
    Object.keys(parents).forEach(function(pid){
      var grp=parents[pid], tmpl=grp.tasks[0];
      var existing=nonSubs.find(function(t){ return t.id===pid; });
      if(existing) merged=merged.map(function(t){ return t.id===pid?Object.assign({},t,{estimatedHours:Math.round(grp.totalHours*10)/10}):t; });
      else merged.push(Object.assign({},tmpl,{id:pid,name:tmpl.name.replace(/ - Part \d+$/,"").replace(/ \(\d+\/\d+\)$/,""),estimatedHours:Math.round(grp.totalHours*10)/10,parentId:null,completed:false}));
    });
    merged=merged.filter(function(t){ return !t.parentId; });
    this.setState({tasks:merged});
    this.setWCal(function(){ return {}; });
    this.toast("Calendar cleared, sub-tasks reassembled");
  }

  doUndo(){
    var st=this.state.undoStack;
    if(st.length===0){ this.toast("Nothing to undo"); return; }
    var snap=st[st.length-1];
    this.setState({undoStack:st.slice(0,st.length-1),tasks:snap.tasks});
    this.setWCal(function(){ return snap.cal; });
    this.toast("Undone");
  }

  autoSchedule(){
    this.pushUndo();
    var s=this.state, wk=this.wk(), SL=this.SL, am=this.apptMap(), prefs=s.prefs;
    var existing=s.cal[wk]||{}, nc=Object.assign({},existing), alreadyPlaced={};
    Object.keys(nc).forEach(function(k){ if(nc[k]&&nc[k].taskId) alreadyPlaced[nc[k].taskId]=true; });
    var tz=prefs.timezone||"Pacific/Auckland";
    var isCur = wk===this.getMon(new Date()).toISOString().slice(0,10);
    var todayIdx = isCur?this.getTodayIdx(tz):0;
    var blocks=(prefs.blocks||[]).slice().sort(function(a,b){ return SL.indexOf(a.start)-SL.indexOf(b.start); });
    var wd=(prefs.workDays||[0,1,2,3,4,5]).filter(function(d){ return d>=todayIdx; });
    var maxC=Math.ceil((prefs.maxContinuousHours||2.5)*2);
    function isFree(di,si){ var ck=di+"-"+SL[si]; return !nc[ck]&&!am[ck]; }
    var recur=s.tasks.filter(function(t){ return !t.completed&&(t.status||"active")==="active"&&t.recurring&&t.recurring!=="none"&&!alreadyPlaced[t.id]; });
    var oneOff=s.tasks.filter(function(t){ return !t.completed&&(t.status||"active")==="active"&&(!t.recurring||t.recurring==="none")&&!alreadyPlaced[t.id]; }).sort(function(a,b){ return a.priority-b.priority; });
    var placed0=Object.keys(alreadyPlaced).length, placedCount=placed0;
    recur.forEach(function(task){
      var dtp=[];
      if(task.recurring==="daily") dtp=[0,1,2,3,4,5,6];
      else if(task.recurring==="weekdays") dtp=[0,1,2,3,4];
      else if(task.recurring==="weekly") dtp=wd.length>0?[wd[0]]:[todayIdx];
      else dtp=[todayIdx];
      dtp=dtp.filter(function(d){ return d>=todayIdx; });
      var span=Math.max(1,Math.ceil((task.estimatedHours||1)*2));
      dtp.forEach(function(di){
        var done=false;
        blocks.forEach(function(block){
          if(done) return;
          var si=SL.indexOf(block.start), ei=SL.indexOf(block.end); if(si<0||ei<0) return;
          for(var c=si;c<=ei-span;c++){
            var ok=true;
            for(var i=0;i<span;i++) if(!isFree(di,c+i)){ ok=false; break; }
            if(ok){ for(var j=0;j<span;j++) nc[di+"-"+SL[c+j]]={taskId:task.id,isStart:j===0,span:span,recurring:true}; done=true; placedCount++; return; }
          }
        });
      });
    });
    var queue=oneOff.slice();
    wd.forEach(function(di){
      blocks.forEach(function(block){
        var si=SL.indexOf(block.start), ei=SL.indexOf(block.end); if(si<0||ei<0) return;
        var cursor=si;
        while(cursor<ei && queue.length>0){
          if(!isFree(di,cursor)){ cursor++; continue; }
          var bi=-1;
          for(var q=0;q<queue.length;q++){ if(block.priority!==null&&queue[q].priority>block.priority+1) continue; bi=q; break; }
          if(bi<0) break;
          var task=queue[bi];
          var span=Math.min(Math.max(1,Math.ceil((task.estimatedHours||1)*2)),maxC,ei-cursor);
          var as=0; for(var i=0;i<span;i++){ if(isFree(di,cursor+i)) as++; else break; }
          if(as>0){ for(var j=0;j<as;j++) nc[di+"-"+SL[cursor+j]]={taskId:task.id,isStart:j===0,span:as}; queue.splice(bi,1); placedCount++; cursor+=as; }
          else cursor++;
        }
      });
    });
    this.setWCal(function(){ return nc; });
    this.toast("Kept "+placed0+" placed, added "+(placedCount-placed0)+" more, "+queue.length+" unscheduled");
  }

  setWeekGoal(idx,patch){
    var wk=this.wk();
    this.setState(function(s){
      var cur=(s.wgoals[wk]||[]).slice();
      while(cur.length<4) cur.push({t:"",d:false});
      var row=Object.assign({},cur[idx],patch);
      cur[idx]=row;
      var r=Object.assign({},s.wgoals); r[wk]=cur; return {wgoals:r};
    });
  }

  edgeScroll(side){
    var now=Date.now();
    if(this.edgeGuard.side!==side){ this.edgeGuard.side=side; this.edgeGuard.until=now+250; return; }
    if(now<this.edgeGuard.until) return;
    this.edgeGuard.until=now+450;
    this.shift(side==="next"?1:-1);
  }
  shift(n){ this.setState(function(s){ var d=new Date(s.anchorMs); d.setDate(d.getDate()+n); return {anchorMs:d.getTime()}; }); }

  exportData(){
    var s=this.state;
    var data=JSON.stringify({tasks:s.tasks,groups:s.groups,goals:s.goals,mission:s.mission,cal:s.cal,appts:s.appts,prefs:s.prefs},null,2);
    var url=URL.createObjectURL(new Blob([data],{type:"application/json"}));
    var a=document.createElement("a"); a.href=url; a.download="planner-"+new Date().toISOString().slice(0,10)+".json"; a.click(); URL.revokeObjectURL(url);
    this.toast("Exported");
  }
  importData(){
    var self=this, input=document.createElement("input"); input.type="file"; input.accept=".json";
    input.onchange=function(e){
      var f=e.target.files[0]; if(!f) return;
      var r=new FileReader();
      r.onload=function(ev){
        try{
          var d=JSON.parse(ev.target.result), p={};
          ["tasks","groups","goals","mission","cal","appts","prefs"].forEach(function(k){ if(d[k]) p[k]=d[k]; });
          self.setState(p); self.toast("Imported");
        }catch(err){ self.toast("Import failed"); }
      };
      r.readAsText(f);
    };
    input.click();
  }
  resetData(){ this.setState({tasks:this.ST,groups:this.SG,goals:this.SGo,mission:this.SEED_M,cal:{},appts:this.SA,prefs:this.SPr}); this.toast("Reset to seed data"); }

  /* ---------- draft plumbing ---------- */
  patchDraft(patch){ this.setState(function(s){ return {draft:Object.assign({},s.draft,patch)}; }); }
  openTaskModal(t){
    var g=this.state.groups;
    this.setState({modal:{kind:"task"},draft: t&&t.id ? Object.assign({},t) : {name:"",description:"",groupId:"",priority:3,estimatedHours:1,recurring:"none",status:"active",parentId:null}});
  }
  openGroupModal(g){ this.setState({modal:{kind:"group"},draft: g&&g.id?Object.assign({},g):{name:"",color:"#6366F1"}}); }
  openApptModal(a){ this.setState({modal:{kind:"appt"},draft: a&&a.id?Object.assign({},a):{name:"",time:"09:00",duration:1,color:"#DC2626",notes:"",days:[1]}}); }
  closeModal(){ this.setState({modal:null,draft:null}); }

  saveGroupDraft(){
    var d=this.state.draft; if(!d.name||!d.name.trim()) return;
    var self=this;
    this.setState(function(s){
      var exists=d.id&&s.groups.find(function(g){ return g.id===d.id; });
      return {groups: exists ? s.groups.map(function(g){ return g.id===d.id?Object.assign({},d):g; }) : s.groups.concat([Object.assign({},d,{id:self.uid()})]), modal:null, draft:null};
    });
  }
  saveApptDraft(){
    var d=this.state.draft; if(!d.name||!d.name.trim()||!(d.days||[]).length) return;
    var self=this;
    this.setState(function(s){
      var exists=d.id&&s.appts.find(function(a){ return a.id===d.id; });
      var norm=Object.assign({},d,{duration:Number(d.duration)});
      return {appts: exists ? s.appts.map(function(a){ return a.id===d.id?norm:a; }) : s.appts.concat([Object.assign({},norm,{id:self.uid()})]), modal:null, draft:null};
    });
  }

  /* ---------- render values ---------- */
  renderVals(){
    var self=this, s=this.state, SL=this.SL, gMap=this.gMap(), am=this.apptMap();
    var accent=this.accent();
    var tz=s.prefs.timezone||"Pacific/Auckland";
    var viewStart=new Date(s.anchorMs);
    var wk=this.wk();
    var todayKey=new Date().toLocaleDateString("en-CA",{timeZone:tz});
    var primaryBtnStyle={padding:"7px 14px",borderRadius:9,border:"1px solid "+accent,background:this.glossFill(accent),color:"#fff",fontSize:11.5,fontWeight:700,cursor:"pointer",boxShadow:this.glossShadow()};

    var cols=[0,1,2,3,4,5,6].map(function(i){
      var d=new Date(viewStart); d.setDate(d.getDate()+i);
      var dow=d.getDay(), di=dow===0?6:dow-1;
      return {date:d,di:di,wkKey:self.getMon(d).toISOString().slice(0,10),isToday:self.localKey(d)===todayKey};
    });

    var wkEndKey=(function(){ var d=new Date(viewStart); d.setDate(d.getDate()+6); return self.getMon(d).toISOString().slice(0,10); })();
    var schedIds={};
    [wk,wkEndKey].forEach(function(k){ var c=s.cal[k]||{}; Object.keys(c).forEach(function(ck){ if(c[ck]&&c[ck].taskId) schedIds[c[ck].taskId]=true; }); });
    var unsched=s.tasks.filter(function(t){ return !t.completed && (t.status||"active")==="active" && !schedIds[t.id]; });
    var parked=s.tasks.filter(function(t){ var st=t.status||"active"; return !t.completed && (st==="blocked"||st==="deferred"||st==="reminder"); });

    /* nav */
    var NAV=[
      {id:"calendar",label:"Calendar",short:"Week",icon:"\u25A4"},
      {id:"tasks",label:"Tasks",short:"Tasks",icon:"\u2261"},
      {id:"priority",label:"Priority Matrix",short:"Priority",icon:"\u26A1"},
      {id:"appointments",label:"Appointments",short:"Appts",icon:"\u25CE"},
      {id:"groups",label:"Groups",short:"Groups",icon:"\u25A6"},
      {id:"mission",label:"Mission & Goals",short:"Mission",icon:"\u25C7"},
      {id:"preferences",label:"Preferences",short:"Prefs",icon:"\u2699"}
    ];
    var navItems=NAV.map(function(n){
      var active=s.view===n.id;
      return {
        id:n.id, label:n.label, short:n.short, icon:n.icon,
        onClick:function(){ self.setState({view:n.id,sideOpen:false}); },
        onEnter:function(){ if(!s.isMob) self.setState({navHover:n.id}); },
        onLeave:function(){ if(!s.isMob) self.setState({navHover:null}); },
        showCaption:s.isMob, showFlyout:!s.isMob&&s.navHover===n.id,
        wrapStyle:s.isMob?{position:"relative",flex:1}:{position:"relative",padding:"0 9px"},
        iconStyle:{fontSize:s.isMob?17:18,lineHeight:1},
        captionStyle:{fontSize:8.5,fontWeight:700,letterSpacing:".04em",textTransform:"uppercase",opacity:.9},
        style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:s.isMob?3:0,
          width:"100%",height:s.isMob?52:44,marginBottom:s.isMob?0:4,borderRadius:12,cursor:"pointer",
          border:active?"1px solid "+accent:"1px solid transparent",
          background:active?self.glossFill(accent):"transparent",
          color:active?"#fff":"rgba(231,233,236,.6)",
          boxShadow:active?self.glossShadow():"none"},
        flyoutStyle:{position:"absolute",left:"100%",top:"50%",transform:"translateY(-50%)",marginLeft:6,whiteSpace:"nowrap",
          padding:"6px 11px",borderRadius:9,fontSize:12,fontWeight:600,color:"#F4F6F8",zIndex:200,
          background:"rgba(24,28,36,.95)",border:"1px solid rgba(255,255,255,.14)",boxShadow:"0 14px 30px -14px rgba(0,0,0,1)"}
      };
    });

    /* weekly goals */
    var wgRows=[0,1,2,3].map(function(gi){
      var rows=s.wgoals[wk]||[]; var row=rows[gi]||{t:"",d:false};
      var editing=s.editWG===gi;
      return {
        editing:editing, notEditing:!editing, mark:row.d?"\u2713":"", text:row.t||("Goal "+(gi+1)+"..."), draft:s.wgDraft,
        checkStyle:{width:16,height:16,borderRadius:5,flexShrink:0,cursor:row.t?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",padding:0,
          border:"1px solid "+(row.d?"#22C55E":row.t?accent:"rgba(255,255,255,.18)"),
          background:row.d?self.glossFill("#22C55E"):"rgba(255,255,255,.04)"},
        textStyle:{flex:1,minWidth:0,fontSize:11.5,padding:"4px 7px",borderRadius:7,cursor:"text",
          color:row.t?(row.d?"rgba(231,233,236,.4)":"#E7E9EC"):"rgba(231,233,236,.28)",
          textDecoration:row.d?"line-through":"none",fontWeight:row.t?600:400,minHeight:19,
          background:row.t?"transparent":"rgba(255,255,255,.03)",
          border:"1px dashed "+(row.t?"transparent":"rgba(255,255,255,.08)")},
        onCheck:function(){ if(row.t) self.setWeekGoal(gi,{d:!row.d}); },
        onEdit:function(){ self.setState({wgDraft:row.t,editWG:gi}); },
        onDraft:function(e){ self.setState({wgDraft:e.target.value}); },
        onCommit:function(){ self.setWeekGoal(gi,{t:s.wgDraft.trim()}); self.setState({editWG:-1}); },
        onKey:function(e){ if(e.key==="Enter"){ self.setWeekGoal(gi,{t:e.target.value.trim()}); self.setState({editWG:-1}); } if(e.key==="Escape") self.setState({editWG:-1}); }
      };
    });

    /* parking lot */
    var plList=unsched.filter(function(t){ if(s.plFilter==="all") return true; if(s.plFilter==="none") return !t.groupId; return t.groupId===s.plFilter; });
    var unschedList=plList.map(function(t){
      var pc=self.PC[t.priority]||self.PC[4], chip=self.solidChip(pc.solid,false);
      return {
        name:t.name, meta:(t.estimatedHours||1)+"h \u00B7 P"+t.priority+(t.parentId?" \u00B7 sub":"")+(gMap[t.groupId]?" \u00B7 "+gMap[t.groupId].name:""),
        style:Object.assign({padding:"7px 10px",marginBottom:5,borderRadius:8,cursor:"grab"},chip),
        onDragStart:function(e){ e.dataTransfer.setData("text/plain",t.id); self.setState({dragId:t.id,dragOrigin:wk}); },
        onClick:function(){ if(!s.dragId) self.openTaskModal(t); else self.setState({dragId:null}); }
      };
    });
    var parkedList=parked.map(function(t){
      var so=self.STATUS_OPTIONS.find(function(x){ return x.value===(t.status||"active"); });
      return {
        icon:so?so.icon:"", name:t.name, meta:(so?so.label:"")+(t.description?" \u00B7 "+t.description.slice(0,30):""),
        style:{padding:"7px 10px",marginBottom:5,borderRadius:8,cursor:"pointer",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderLeft:"3px solid "+(so?so.color:"#888"),color:"rgba(231,233,236,.75)"},
        onClick:function(){ self.openTaskModal(t); }
      };
    });

    /* grid */
    var colHeads=cols.map(function(c){
      return {
        day:self.DAYS[c.di], date:c.date.toLocaleDateString("en-NZ",{day:"numeric",month:"short"}),
        style:{padding:"7px 4px 9px",textAlign:"center",borderBottom:c.isToday?"2px solid "+accent:"1px solid rgba(255,255,255,.14)",position:"relative",
          background:c.isToday?"linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,0))":"transparent",borderRadius:"8px 8px 0 0"}
      };
    });

    var nowStr=this.getNowInTz(tz);
    var nowH=parseInt(nowStr.split(":")[0],10), nowM=parseInt(nowStr.split(":")[1],10);

    var rows=SL.map(function(time){
      var isH=time.slice(-2)==="00", meal=self.MEAL_SLOTS[time];
      var slotH=parseInt(time.split(":")[0],10), slotM=parseInt(time.split(":")[1],10);
      var inSlot=(nowH===slotH)&&(nowM>=slotM)&&(nowM<slotM+30);
      var nowPct=inSlot?((nowM-slotM)/30)*100:0;
      var cells=cols.map(function(c){
        var colCal=s.cal[c.wkKey]||{}, ck=c.di+"-"+time, entry=colCal[ck], aE=am[ck];
        var task=entry?s.tasks.find(function(t){ return t.id===entry.taskId; }):null;
        var cell={
          style:{borderTop:isH?"1px solid rgba(255,255,255,.11)":"1px solid rgba(255,255,255,.045)",borderLeft:"1px solid rgba(255,255,255,.045)",minHeight:34,padding:1,position:"relative",
            background: (aE&&!entry) ? "rgba(220,38,38,.10)" : (s.dragId?"rgba(109,90,240,.09)":"transparent")},
          onDragOver:function(e){ e.preventDefault(); },
          onDrop:function(e){ e.preventDefault(); var tid=e.dataTransfer.getData("text/plain")||s.dragId; if(tid) self.handleDrop(tid,c,time); },
          onClick:function(){ if(s.dragId) self.handleDrop(s.dragId,c,time); },
          meal:meal||null, appt:null, task:null,
          todayStyle:c.isToday?{position:"absolute",left:-1,top:-1,bottom:-1,width:2,background:entry?"rgba(255,255,255,.85)":accent,zIndex:6,pointerEvents:"none"}:null,
          nowStyle:inSlot?{position:"absolute",left:0,right:0,top:nowPct+"%",height:0,zIndex:7,pointerEvents:"none",borderTop:"2px solid "+(entry?"rgba(255,255,255,.9)":"#FF3D6E"),boxShadow:"0 0 8px rgba(255,61,110,.8)"}:null
        };
        if(aE&&aE.isStart&&!entry){
          var ac=aE.appt.color||"#DC2626";
          cell.appt={
            label:"\u25CE  "+aE.appt.name,
            style:Object.assign({position:"absolute",top:1,left:1,right:1,height:"calc("+(aE.span*100)+"% - 2px)",borderRadius:7,padding:"3px 7px",fontSize:10.5,fontWeight:700,zIndex:3,cursor:"pointer",overflow:"hidden"},self.solidChip(ac,false)),
            onClick:function(e){ e.stopPropagation(); self.openApptModal(aE.appt); }
          };
        }
        if(task&&entry.isStart){
          var pc=self.PC[task.priority]||self.PC[4];
          var chip=self.solidChip(pc.solid,task.completed);
          cell.task={
            name:(entry.recurring?"\u21BB ":"")+task.name,
            sub:task.estimatedHours+"h"+(task.parentId?" \u00B7 sub":""),
            showSub:entry.span>=3,
            checkStroke:task.completed?"#14181F":"rgba(255,255,255,.95)",
            nameStyle: entry.span>=2
              ? {display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:2,overflow:"hidden",fontSize:10.5,fontWeight:600,lineHeight:1.25,paddingRight:26,maxHeight:26}
              : {display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontSize:10.5,fontWeight:600,lineHeight:1.25,paddingRight:26},
            showDup: s.hoverTask===task.id+"@"+c.wkKey+"-"+ck,
            onEnter:function(){ self.setState({hoverTask:task.id+"@"+c.wkKey+"-"+ck}); },
            onLeave:function(){ self.setState({hoverTask:null}); },
            style:Object.assign({position:"absolute",top:1,left:1,right:1,height:"calc("+(entry.span*100)+"% - 2px)",borderRadius:7,padding:"3px 5px",fontSize:10.5,cursor:"grab",zIndex:2,lineHeight:1.28,display:"flex",flexDirection:"column",overflow:"hidden",textDecoration:task.completed?"line-through":"none"},chip),
            doneStyle:{width:20,height:20,borderRadius:6,border:"1px solid rgba(255,255,255,.6)",background:task.completed?"linear-gradient(180deg,#FFFFFF,rgba(255,255,255,.78))":"linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,.10))",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,flexShrink:0,boxShadow:"inset 0 1px 0 rgba(255,255,255,.5)"},
            onDragStart:function(e){ e.dataTransfer.setData("text/plain",task.id); self.setState({dragId:task.id,dragOrigin:c.wkKey}); },
            onClick:function(e){ e.stopPropagation(); if(self.isResizing()) return; self.openTaskModal(task); },
            onDup:function(e){ e.stopPropagation(); self.duplicateTask(task.id); },
            onDone:function(e){ e.stopPropagation(); self.toggleDone(task.id); },
            onResize:function(e){
              e.stopPropagation(); e.preventDefault();
              self.resizeGuard.active=true;
              var startY=e.clientY, origSpan=entry.span, taskId=task.id, dayI=c.di, wkC=c.wkKey, timeStr=time, recFlag=entry.recurring;
              var onMove=function(ev){
                var diff=Math.round((ev.clientY-startY)/34);
                var newSpan=Math.max(1,Math.min(origSpan+diff,16));
                var newHrs=Math.round(newSpan*5)/10;
                self.setState(function(st){ return {tasks:st.tasks.map(function(t){ return t.id===taskId?Object.assign({},t,{estimatedHours:newHrs}):t; })}; });
                var ti2=SL.indexOf(timeStr);
                self.setState(function(st){
                  var src=st.cal[wkC]||{}, n={};
                  Object.keys(src).forEach(function(k){ if(!src[k]||src[k].taskId!==taskId) n[k]=src[k]; });
                  for(var i=0;i<newSpan&&ti2+i<SL.length;i++) n[dayI+"-"+SL[ti2+i]]={taskId:taskId,isStart:i===0,span:newSpan,recurring:recFlag};
                  var r=Object.assign({},st.cal); r[wkC]=n; return {cal:r};
                });
              };
              var onUp=function(){ self.resizeGuard.active=false; self.resizeGuard.until=Date.now()+400; document.removeEventListener("mousemove",onMove); document.removeEventListener("mouseup",onUp); };
              document.addEventListener("mousemove",onMove); document.addEventListener("mouseup",onUp);
            }
          };
        }
        return cell;
      });
      return {
        label:time, cells:cells,
        timeStyle:{padding:"3px 6px",fontSize:9.5,fontWeight:600,letterSpacing:".02em",color:isH?"rgba(231,233,236,.5)":"rgba(231,233,236,.26)",
          borderTop:isH?"1px solid rgba(255,255,255,.11)":"1px solid rgba(255,255,255,.045)",display:"flex",alignItems:"center"}
      };
    });

    /* task row builder */
    function taskRow(t,opts){
      var pc=self.PC[t.priority]||self.PC[4], chip=self.solidChip(pc.solid,t.completed);
      var g=gMap[t.groupId];
      var badges=[];
      badges.push("P"+t.priority);
      badges.push((t.estimatedHours||1)+"h");
      if(g) badges.push(g.name);
      if(t.parentId) badges.push("sub-task");
      if(t.recurring&&t.recurring!=="none") badges.push("\u21BB "+self.rlb(t.recurring));
      if(t.status&&t.status!=="active"){ var so=self.STATUS_OPTIONS.find(function(x){ return x.value===t.status; }); if(so) badges.push(so.icon+" "+so.label); }
      return {
        name:t.name, meta:badges.join("  \u00B7  "),
        nameStyle:{fontWeight:600,fontSize:13.5,textDecoration:t.completed?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},
        style:Object.assign({display:"flex",alignItems:"center",gap:11,padding:"10px 13px",borderRadius:10,opacity:t.completed?0.65:1,cursor:(opts&&opts.draggable)?"grab":"default"},chip),
        checkStyle:{width:19,height:19,borderRadius:6,border:"1px solid rgba(255,255,255,.6)",background:t.completed?"rgba(255,255,255,.85)":"rgba(255,255,255,.14)",color:t.completed?"#1a1a1a":"#fff",cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
        mark:t.completed?"\u2713":"",
        onToggle:function(){ self.toggleDone(t.id); },
        onEdit:function(){ self.openTaskModal(t); },
        onDel:function(e){ e.stopPropagation(); self.delTask(t.id); },
        onDragStart:function(e){ e.dataTransfer.setData("text/plain",t.id); }
      };
    }

    /* mission view */
    var mv={
      editing:s.missionEdit, notEditing:!s.missionEdit, draft:s.missionDraft, btnLabel:s.missionEdit?"Save":"Edit",
      heroStyle:{borderRadius:18,padding:26,marginBottom:16,color:"#fff",
        background:"linear-gradient(150deg,rgba(255,255,255,.20),rgba(255,255,255,.04) 42%,rgba(0,0,0,.18)), linear-gradient(135deg,"+accent+",#0E9F94)",
        border:"1px solid rgba(255,255,255,.18)",boxShadow:"inset 0 1px 0 rgba(255,255,255,.4),0 30px 60px -34px rgba(0,0,0,1)"},
      onToggle:function(){
        if(s.missionEdit){ self.setState({mission:s.missionDraft,goals:s.goalDrafts.filter(function(g){ return g.trim(); }),missionEdit:false}); }
        else self.setState({missionEdit:true,missionDraft:s.mission,goalDrafts:s.goals.slice()});
      },
      onDraft:function(e){ self.setState({missionDraft:e.target.value}); },
      onAdd:function(){ self.setState(function(st){ return {goalDrafts:st.goalDrafts.concat([""])}; }); },
      goals:s.goals.map(function(g,i){ return {n:i+1,text:g,numStyle:{fontWeight:800,fontSize:17,color:accent,minWidth:20}}; }),
      goalDrafts:s.goalDrafts.map(function(g,i){
        return {value:g,
          onChange:function(e){ var v=e.target.value; self.setState(function(st){ var n=st.goalDrafts.slice(); n[i]=v; return {goalDrafts:n}; }); },
          onDel:function(){ self.setState(function(st){ return {goalDrafts:st.goalDrafts.filter(function(_,j){ return j!==i; })}; }); }};
      })
    };

    /* groups view */
    var gv={
      onNew:function(){ self.openGroupModal(null); },
      items:s.groups.map(function(g){
        var a=s.tasks.filter(function(t){ return t.groupId===g.id; });
        var done=a.filter(function(t){ return t.completed; }).length;
        return {name:g.name,count:a.length+" tasks",doneLabel:done+" done",
          onClick:function(){ self.openGroupModal(g); },
          style:Object.assign({borderRadius:14,padding:18,cursor:"pointer"},self.solidChip(g.color,false))};
      })
    };

    /* tasks view */
    var tlist = s.taskFilter==="all" ? s.tasks
      : s.taskFilter==="active" ? s.tasks.filter(function(t){ return !t.completed&&(t.status||"active")==="active"; })
      : s.taskFilter==="completed" ? s.tasks.filter(function(t){ return t.completed; })
      : s.tasks.filter(function(t){ var st=t.status||"active"; return !t.completed&&(st==="blocked"||st==="deferred"||st==="reminder"); });
    if(s.groupFilter!=="all") tlist=tlist.filter(function(t){ return s.groupFilter==="none"?!t.groupId:t.groupId===s.groupFilter; });
    tlist=tlist.slice().sort(function(a,b){ return a.priority-b.priority; });
    var groupOpts=[{value:"all",label:"All groups"},{value:"none",label:"No group"}].concat(s.groups.map(function(g){ return {value:g.id,label:g.name}; }));
    var tv={
      filters:["all","active","parked","completed"].map(function(f){
        return {label:f.charAt(0).toUpperCase()+f.slice(1),style:self.glassBtn(s.taskFilter===f),onClick:function(){ self.setState({taskFilter:f}); }};
      }),
      groupFilter:s.groupFilter, groupOpts:groupOpts,
      onGroupFilter:function(e){ self.setState({groupFilter:e.target.value}); },
      onNew:function(){ self.openTaskModal(null); },
      rows:tlist.map(function(t){ return taskRow(t,{}); })
    };

    /* priority view */
    var pv={
      quads:[1,2,3,4].map(function(pr){
        var pc=self.PC[pr], pts=s.tasks.filter(function(t){ return t.priority===pr; });
        var dn=pts.filter(function(t){ return t.completed; }).length;
        return {
          title:"P"+pr+" \u00B7 "+self.PL[pr], count:pts.length-dn,
          style:{borderRadius:16,overflow:"hidden",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",backdropFilter:"blur(20px) saturate(150%)",boxShadow:"inset 0 1px 0 rgba(255,255,255,.07)"},
          headStyle:Object.assign({padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"},self.solidChip(pc.solid,false),{borderRadius:0,border:"none"}),
          badgeStyle:{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,.22)",border:"1px solid rgba(255,255,255,.4)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13},
          onDragOver:function(e){ e.preventDefault(); },
          onDrop:function(e){ e.preventDefault(); var tid=e.dataTransfer.getData("text/plain"); if(tid) self.reassignPriority(tid,pr); },
          rows:pts.map(function(t){ return taskRow(t,{draggable:true}); })
        };
      })
    };

    /* appointments view */
    var av={
      onNew:function(){ self.openApptModal(null); },
      items:s.appts.map(function(a){
        return {name:a.name,
          meta:(a.days||[]).map(function(d){ return self.DAYS[d].slice(0,3); }).join(", ")+" \u00B7 "+a.time+" \u00B7 "+(a.duration||1)+"h",
          style:Object.assign({display:"flex",alignItems:"center",gap:12,padding:"13px 16px",borderRadius:12,cursor:"pointer"},self.solidChip(a.color||"#DC2626",false)),
          onClick:function(){ self.openApptModal(a); },
          onDel:function(e){ e.stopPropagation(); self.setState(function(st){ return {appts:st.appts.filter(function(x){ return x.id!==a.id; })}; }); }};
      })
    };

    /* preferences view */
    var pd=s.prefsDraft||s.prefs;
    var slotOpts=SL.map(function(x){ return {value:x,label:x}; });
    var prv={
      editing:s.prefsEdit, notEditing:!s.prefsEdit, btnLabel:s.prefsEdit?"Save":"Edit",
      slotOpts:slotOpts,
      priOpts:[{value:"null",label:"Any"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],
      tzOpts:this.TZS.map(function(x){ return {value:x,label:x}; }),
      tz:pd.timezone||"Pacific/Auckland",
      maxH:pd.maxContinuousHours,
      maxHLabel:(pd.maxContinuousHours||2.5)+"h",
      maxHStyle:{fontSize:22,fontWeight:700,color:accent},
      tzStyle:{fontSize:15,fontWeight:700,color:accent},
      nowLabel:"Current time: "+this.getNowInTz(pd.timezone||"Pacific/Auckland")+" ("+this.DAYS[this.getTodayIdx(pd.timezone||"Pacific/Auckland")]+")",
      onToggle:function(){
        if(s.prefsEdit) self.setState({prefs:Object.assign({},s.prefsDraft),prefsEdit:false,prefsDraft:null});
        else self.setState({prefsEdit:true,prefsDraft:JSON.parse(JSON.stringify(s.prefs))});
      },
      onMaxH:function(e){ var v=Number(e.target.value); self.setState(function(st){ return {prefsDraft:Object.assign({},st.prefsDraft,{maxContinuousHours:v})}; }); },
      onTz:function(e){ var v=e.target.value; self.setState(function(st){ return {prefsDraft:Object.assign({},st.prefsDraft,{timezone:v})}; }); },
      days:this.DAYS.map(function(d,i){
        var on=(pd.workDays||[]).indexOf(i)>=0;
        return {label:d.slice(0,3),style:self.glassBtn(on),
          onClick:function(){ if(!s.prefsEdit) return; self.setState(function(st){ var wdl=(st.prefsDraft.workDays||[]).slice();
            var idx=wdl.indexOf(i); if(idx>=0) wdl.splice(idx,1); else { wdl.push(i); wdl.sort(); }
            return {prefsDraft:Object.assign({},st.prefsDraft,{workDays:wdl})}; }); }};
      }),
      blocks:(pd.blocks||[]).map(function(b,i){
        function patch(p){ self.setState(function(st){ var bl=(st.prefsDraft.blocks||[]).slice(); bl[i]=Object.assign({},bl[i],p); return {prefsDraft:Object.assign({},st.prefsDraft,{blocks:bl})}; }); }
        return {
          label:b.label, start:b.start, end:b.end, pri:b.priority===null||b.priority===undefined?"null":String(b.priority),
          meta:b.start+" - "+b.end+(b.priority?" \u00B7 P"+b.priority+"+":" \u00B7 Any")+(b.note?" \u00B7 "+b.note:""),
          style:{padding:"10px 13px",borderRadius:11,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",
            borderLeft:"3px solid "+(b.priority===1?"#DC2626":b.priority===2?"#D97706":b.priority===4?"#6B7280":accent)},
          onLabel:function(e){ patch({label:e.target.value}); },
          onStart:function(e){ patch({start:e.target.value}); },
          onEnd:function(e){ patch({end:e.target.value}); },
          onPri:function(e){ patch({priority:e.target.value==="null"?null:Number(e.target.value)}); }
        };
      }),
      onExport:function(){ self.exportData(); },
      onImport:function(){ self.importData(); },
      onConnectFile:function(){ self.connectDataFile(); },
      onSaveFile:function(){ self.saveDataFile(); },
      fileStatusText:self.filePillLabel(),
      fileStatusColor:self.filePillColor(),
      fileHelp:(self.hasFS()
        ? "First time: click Save to create konqr-data.json in your OneDrive data folder. After that, Connect it once per session and every change autosaves straight to it."
        : "This browser cannot write files directly. Load the JSON from your OneDrive app, and Save downloads an updated copy to put back."),
      fsAvailable:self.hasFS()
    };

    /* modal */
    var modal=null, d=s.draft;
    if(s.modal && d){
      var kind=s.modal.kind;
      if(kind==="task"){
        var over=Number(d.estimatedHours)>this.MAX_HRS && !d.parentId;
        var so=this.STATUS_OPTIONS.find(function(x){ return x.value===(d.status||"active"); });
        modal={
          title:d.id?"Edit Task":"New Task", isTask:true, d:d,
          saveLabel:d.id?"Update":"Create", canDelete:!!d.id,
          groupOpts:[{value:"",label:"No group"}].concat(s.groups.map(function(g){ return {value:g.id,label:g.name}; })),
          priOpts:[1,2,3,4].map(function(x){ return {value:String(x),label:"P"+x+" \u00B7 "+self.PL[x]}; }),
          recOpts:this.RO.map(function(r){ return {value:r.value,label:r.label}; }),
          statusBtns:this.STATUS_OPTIONS.map(function(x){
            var on=(d.status||"active")===x.value;
            return {label:x.icon+" "+x.label,style:self.glassBtn(on,x.color),onClick:function(){ self.patchDraft({status:x.value}); }};
          }),
          statusNote: (d.status==="deferred") ? "Not auto-scheduled and hidden from unscheduled."
            : (d.status==="reminder") ? "Visible in the parking lot as a future reminder."
            : (d.status==="blocked") ? "Describe the blocker in the description field." : null,
          statusNoteStyle:{fontSize:11,marginTop:7,color:so?so.color:"#999"},
          splitWarn: over ? ("Tasks over "+this.MAX_HRS+"h create sub-tasks. You will name each next.") : null,
          onName:function(e){ self.patchDraft({name:e.target.value}); },
          onDesc:function(e){ self.patchDraft({description:e.target.value}); },
          onGroup:function(e){ self.patchDraft({groupId:e.target.value}); },
          onPriority:function(e){ self.patchDraft({priority:Number(e.target.value)}); },
          onHours:function(e){ self.patchDraft({estimatedHours:e.target.value}); },
          onRecurring:function(e){ self.patchDraft({recurring:e.target.value}); },
          onSave:function(){ self.saveTaskDraft(); },
          onDelete:function(){ self.delTask(d.id); }
        };
      } else if(kind==="group"){
        var CL=["#6366F1","#EC4899","#10B981","#F97316","#0EA5E9","#EAB308","#8B5CF6","#14B8A6","#F43F5E","#84CC16","#06B6D4","#D946EF"];
        modal={
          title:d.id?"Edit Group":"New Group", isGroup:true, d:d, saveLabel:d.id?"Update":"Create", canDelete:!!d.id,
          swatches:CL.map(function(cl){
            return {style:Object.assign({width:32,height:32,borderRadius:9,cursor:"pointer"},self.solidChip(cl,false),{border:d.color===cl?"2px solid #fff":"1px solid rgba(255,255,255,.14)"}),
              onClick:function(){ self.patchDraft({color:cl}); }};
          }),
          onName:function(e){ self.patchDraft({name:e.target.value}); },
          onSave:function(){ self.saveGroupDraft(); },
          onDelete:function(){ var id=d.id; self.setState(function(st){ return {groups:st.groups.filter(function(g){ return g.id!==id; }),modal:null,draft:null}; }); }
        };
      } else if(kind==="appt"){
        var ACL=["#DC2626","#F97316","#2563EB","#10B981","#8B5CF6","#EC4899"];
        modal={
          title:d.id?"Edit Appointment":"New Appointment", isAppt:true, d:d, saveLabel:d.id?"Update":"Create", canDelete:!!d.id,
          slotOpts:slotOpts,
          dayBtns:this.DAYS.map(function(dn,i){
            var on=(d.days||[]).indexOf(i)>=0;
            return {label:dn.slice(0,3),style:self.glassBtn(on),
              onClick:function(){ var days=(d.days||[]).slice(); var ix=days.indexOf(i); if(ix>=0) days.splice(ix,1); else { days.push(i); days.sort(); } self.patchDraft({days:days}); }};
          }),
          swatches:ACL.map(function(cl){
            return {style:Object.assign({width:30,height:30,borderRadius:9,cursor:"pointer"},self.solidChip(cl,false),{border:d.color===cl?"2px solid #fff":"1px solid rgba(255,255,255,.14)"}),
              onClick:function(){ self.patchDraft({color:cl}); }};
          }),
          onName:function(e){ self.patchDraft({name:e.target.value}); },
          onTime:function(e){ self.patchDraft({time:e.target.value}); },
          onDuration:function(e){ self.patchDraft({duration:e.target.value}); },
          onNotes:function(e){ self.patchDraft({notes:e.target.value}); },
          onSave:function(){ self.saveApptDraft(); },
          onDelete:function(){ var id=d.id; self.setState(function(st){ return {appts:st.appts.filter(function(a){ return a.id!==id; }),modal:null,draft:null}; }); }
        };
      } else if(kind==="split"){
        var total=(d.parts||[]).reduce(function(a,p){ return a+(Number(p.hours)||0); },0);
        var okTotal=total===d.total;
        var gc=(gMap[d.parent.groupId]||{}).color||"#6B7280";
        var pcs=self.PC[d.parent.priority]||self.PC[4];
        modal={
          title:"Name Sub-Tasks: "+(d.parent.name||""), isSplit:true, saveLabel:"Create "+d.parts.length+" Sub-Tasks",
          intro:"Break this "+d.total+"h task into named activities. Add or remove sub-tasks as needed.",
          previewStyle:Object.assign({padding:"10px 13px",borderRadius:10,fontSize:11.5,borderLeft:"4px solid "+gc},self.solidChip(pcs.solid,false)),
          partCount:d.parts.length+" sub-tasks",
          totalLabel:"Total: "+Math.round(total*10)/10+"h"+(okTotal?" \u2713":" (original: "+d.total+"h)"),
          totalStyle:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 13px",borderRadius:10,
            background:okTotal?"rgba(34,197,94,.14)":"rgba(245,158,11,.16)",border:"1px solid "+(okTotal?"rgba(34,197,94,.5)":"rgba(245,158,11,.5)"),
            color:okTotal?"#B7F0CB":"#FFE0B0"},
          parts:d.parts.map(function(p,i){
            return {name:p.name,hours:p.hours,canRemove:d.parts.length>2,
              chipStyle:Object.assign({width:20,height:20,borderRadius:6,flexShrink:0,borderLeft:"3px solid "+gc},self.solidChip(pcs.solid,false)),
              onName:function(e){ var v=e.target.value; self.setState(function(st){ var ps=st.draft.parts.slice(); ps[i]=Object.assign({},ps[i],{name:v}); return {draft:Object.assign({},st.draft,{parts:ps})}; }); },
              onHours:function(e){ var v=Number(e.target.value); self.setState(function(st){ var ps=st.draft.parts.slice(); ps[i]=Object.assign({},ps[i],{hours:v}); return {draft:Object.assign({},st.draft,{parts:ps})}; }); },
              onRemove:function(){ self.setState(function(st){ var ps=st.draft.parts.filter(function(_,j){ return j!==i; }); return {draft:Object.assign({},st.draft,{parts:ps})}; }); }};
          }),
          onAddPart:function(){ self.setState(function(st){ var ps=st.draft.parts.concat([{name:(st.draft.parent.name||"Part")+" - Part "+(st.draft.parts.length+1),hours:1}]); return {draft:Object.assign({},st.draft,{parts:ps})}; }); },
          onSave:function(){ self.createSubTasks(); }
        };
      }
    }

    return {
      liquidLayerStyle:{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden",
        opacity:this.props.showLiquid===false?0:1,
        filter:"hue-rotate("+(this.props.liquidHue||0)+"deg)"},
      brandDotStyle:{width:6,height:6,borderRadius:"50%",background:accent,boxShadow:"0 0 10px "+accent,display:"inline-block"},
      clockLabel:nowStr+" \u00B7 "+tz.split("/")[1].replace("_"," "),
      toast:s.toast, isMob:s.isMob,
      showNav: true,
      navStyle: s.isMob
        ? {position:"fixed",left:0,right:0,bottom:0,zIndex:130,display:"flex",gap:2,padding:"6px 6px 8px",
           background:"rgba(12,15,21,.86)",backdropFilter:"blur(24px) saturate(160%)",borderTop:"1px solid rgba(255,255,255,.09)"}
        : {width:62,flexShrink:0,padding:"12px 0",overflowY:"visible",
           background:"rgba(12,15,21,.5)",backdropFilter:"blur(24px) saturate(160%)",
           borderRight:"1px solid rgba(255,255,255,.07)",position:"relative",zIndex:90},
      navItems:navItems,
      onToggleSide:function(){ self.setState({sideOpen:!s.sideOpen}); },
      onReset:function(){ self.resetData(); },
      filePill:self.filePillLabel(),
      filePillColor:self.filePillColor(),
      onFilePill:function(){ self.onFilePill(); },
      isCalendar:s.view==="calendar", isMission:s.view==="mission", isGroups:s.view==="groups",
      isTasks:s.view==="tasks", isPriority:s.view==="priority", isAppts:s.view==="appointments", isPrefs:s.view==="preferences",
      primaryBtnStyle:primaryBtnStyle,
      weekLabel:this.fmtW(viewStart),
      weekLabelStyle:{fontSize:s.isMob?14:17,fontWeight:700,letterSpacing:"-0.01em",marginRight:6,
        color:s.anchorMs===this.getMon(new Date()).getTime()?"#F4F6F8":accent},
      onPrev:function(){ self.shift(-7); }, onNext:function(){ self.shift(7); },
      onToday:function(){ self.setState({anchorMs:self.getMon(new Date()).getTime()}); },
      onRoll:function(){ self.shift(7); },
      onUndo:function(){ self.doUndo(); },
      undoLabel:"Undo"+(s.undoStack.length>0?" ("+s.undoStack.length+")":""),
      undoStyle:{padding:"7px 13px",borderRadius:9,border:"1px solid rgba(255,255,255,.10)",background:"rgba(255,255,255,.04)",color:"#E7E9EC",fontSize:11.5,cursor:"pointer",opacity:s.undoStack.length===0?0.4:1},
      onClear:function(){ self.clearCalendar(); },
      onAuto:function(){ self.autoSchedule(); },
      onNewTask:function(){ self.openTaskModal(null); },
      onNewAppt:function(){ self.openApptModal(null); },
      showRotateHint: s.isMob && s.isPortrait,
      calRowStyle:{display:"flex",gap:14,alignItems:"flex-start",paddingBottom:s.isMob?96:0},
      showSideCol: !s.isMob || s.drawerOpen,
      showFabs: s.isMob && s.view==="calendar",
      onToggleDrawer:function(){ self.setState({drawerOpen:!s.drawerOpen}); },
      drawerFabStyle:{width:52,height:52,borderRadius:16,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
        border:"1px solid rgba(255,255,255,.2)",color:"#F2F4F7",
        background:s.drawerOpen?self.glossFill(accent):"linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,.05))",
        boxShadow:"inset 0 1px 0 rgba(255,255,255,.35),0 14px 28px -12px rgba(0,0,0,1)"},
      addFabStyle:{width:60,height:60,borderRadius:19,border:"1px solid "+accent,background:self.glossFill(accent),color:"#fff",fontSize:26,fontWeight:400,cursor:"pointer",
        boxShadow:"inset 0 1px 0 rgba(255,255,255,.45),0 16px 32px -12px rgba(0,0,0,1)"},
      sideColStyle: s.isMob
        ? {position:"fixed",left:0,right:0,bottom:70,zIndex:125,maxHeight:"62vh",overflowY:"auto",padding:"12px 12px 16px",
           display:"flex",flexDirection:"column",gap:10,
           background:"rgba(12,15,21,.92)",backdropFilter:"blur(26px) saturate(160%)",
           borderTop:"1px solid rgba(255,255,255,.12)",borderRadius:"18px 18px 0 0",
           boxShadow:"0 -24px 50px -20px rgba(0,0,0,1)"}
        : {width:210,flexShrink:0,display:"flex",flexDirection:"column",gap:10},
      wgRows:wgRows,
      parkingPanelStyle:{width:"100%",background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.09)",backdropFilter:"blur(20px) saturate(150%)",
        borderRadius:14,padding:13,maxHeight:s.isMob?200:"calc(100vh - 340px)",overflowY:"auto",boxShadow:"inset 0 1px 0 rgba(255,255,255,.07)"},
      parkingTitle:"PARKING LOT ("+unsched.length+")",
      parkedTitle:"PARKED ("+parked.length+")",
      showPlFilter:s.groups.length>0&&unsched.length>6,
      plFilter:s.plFilter,
      plOptions:[{value:"all",label:"All groups"},{value:"none",label:"No group"}].concat(s.groups.map(function(g){ return {value:g.id,label:g.name}; })),
      onPlFilter:function(e){ self.setState({plFilter:e.target.value}); },
      unschedList:unschedList, noUnsched:unsched.length===0,
      parkedList:parkedList, hasParked:parked.length>0,
      gridStyle:{display:"grid",gridTemplateColumns:(s.isMob?"44px":"58px")+" repeat("+cols.length+", minmax(0,1fr))",minWidth:s.isMob?600:660},
      colHeads:colHeads, rows:rows,
      onGridDragOver:function(e){
        var r=e.currentTarget.getBoundingClientRect(), x=e.clientX;
        if(x<r.left+62) self.edgeScroll("prev");
        else if(x>r.right-40) self.edgeScroll("next");
        else self.edgeGuard.side=null;
      },
      mission:s.mission, mv:mv, gv:gv, tv:tv, pv:pv, av:av, prv:prv,
      modal:modal, onCloseModal:function(){ self.closeModal(); }, stopProp:function(e){ e.stopPropagation(); }
    };
  }
}
