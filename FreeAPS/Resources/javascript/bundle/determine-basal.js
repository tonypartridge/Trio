var freeaps_determineBasal;(()=>{var e={4051:(e,a,r)=>{var t=r(6880);function o(e,a){a||(a=0);var r=Math.pow(10,a);return Math.round(e*r)/r}function i(e,a){return"mmol/L"===a.out_units?o(e/18,1):Math.round(e)}var n="",s="",l="",m="",u="",d="",c="",g="",f="";function p(e,a){var r=[2,7,12,16,20,50,60,80,90,100,110,150,180,200],t=[0,0,.4,.7,.7,-.5,-.5,-.3,-.2,0,0,.5,.7,.7],o=r.length-1,i=r[0],n=t[0],s=r[o],l=t[o],m=1,u=1,d=1,c=i;if(i>e)m=(u=n)+((l=t[1])-u)/((s=r[1])-(d=i))*(e-d);else if(s<e)m=(u=n=t[o-1])+(l-u)/(s-(d=i=r[o-1]))*(e-d);else for(var g=0;g<=o;g++){if(n=t[g],(i=r[g])==e){m=n;break}if(i>e){m=u+(n-u)/(i-(d=c))*(e-d);break}u=n,c=i}return m*=e>100?a.higher_ISFrange_weight:e>40?a.lower_ISFrange_weight:a.delta_ISFrange_weight}function h(e,a,r){if(void 0===e.smb_delivery_ratio_bg_range||0===e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio set to fixed value "+e.smb_delivery_ratio),e.smb_delivery_ratio;var t=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a<=r)return console.error("SMB delivery ratio limitLoged by minimum value "+t),t;var i=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a>=r+e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio limitLoged by maximum value "+i),i;var n=t+(i-t)*(a-r)/e.smb_delivery_ratio_bg_range;return console.error("SMB delivery ratio set to interpolated value "+o(n,2)),n}e.exports=function(e,a,r,b,v,_,B,M,y,x,S,w,C){var F,I,D,G=0,O="",T="",R=0,U=0,A=0,P=0,j=0,k=0;function L(e,a){var r=e.getTime();return new Date(r+36e5*a)}function q(e){var a=b.bolus_increment;.05!=a&&(a=.1);var r=e/a;return r>=1?o(Math.floor(r)*a,5):0}function E(e){function a(e){return e<10&&(e="0"+e),e}return a(e.getHours())+":"+a(e.getMinutes())+":00"}function W(e,a){var r=new Date("1/1/1999 "+e),t=new Date("1/1/1999 "+a);return(r.getTime()-t.getTime())/36e5}function z(e,a){var r=0,t=a,o=(e-a)/36e5,i=0,n=o,s=0;do{if(o>0){var l=E(t),m=C[0].start;for(let e=0;e<C.length;e++){var u=C[e].start;if(l==u){if(e+1<C.length){o>=(s=W(C[e+1].start,C[e].start))?i=s:o<s&&(i=o)}else if(e+1==C.length){let a=C[0].start;o>=(s=24-W(C[e].start,a))?i=s:o<s&&(i=o)}r+=q((m=C[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+q(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=L(t,i)}else if(l>u)if(e+1<C.length){var d=C[e+1].start;l<d&&(o>=(s=W(d,l))?i=s:o<s&&(i=o),r+=q((m=C[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+q(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=L(t,i))}else if(e==C.length-1){o>=(s=W("23:59:59",l))?i=s:o<s&&(i=o),r+=q((m=C[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+q(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=L(t,i)}}}}while(o>0&&o<n);return r}let N=S.length;var Z,$,H=new Date(S[N-1].timestamp),J=new Date(S[0].timestamp);("TempBasalDuration"==S[0]._type&&(J=new Date),(G=(J-H)/36e5)<23.5)?(j=z(H,(Z=24-G,$=H.getTime(),new Date($-36e5*Z))),O="24 hours of data is required for an accurate tdd calculation. Currently only "+G.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+j.toPrecision(5)+" U. "):O="";for(let e=0;e<S.length;e++)"Bolus"==S[e]._type&&(P+=S[e].amount);for(let e=1;e<S.length;e++)if("TempBasal"==S[e]._type&&S[e].rate>0){R=e,k=S[e].rate;var K=S[e-1]["duration (min)"]/60,Q=K,V=new Date(S[e-1].timestamp);do{if(e--,e<=0){morePresentTime=new Date;break}if("TempBasal"==S[e]._type||"PumpSuspend"==S[e]._type){morePresentTime=new Date(S[e].timestamp);break}}while(e>=0);var X=(morePresentTime-V)/36e5;X<Q&&(K=X),A+=q(k*K),e=R}for(let e=0;e<S.length;e++)if(0,0==S[e]["duration (min)"]||"PumpResume"==S[e]._type){let a=new Date(S[e].timestamp),r=a,t=e;do{if(--t,"TempBasal"==S[t]._type&&t>=0){r=new Date(S[t].timestamp);break}}while(t>0);(r-a)/36e5>0&&(j+=z(r,a))}for(let e=S.length-1;e>0;e--)if("TempBasalDuration"==S[e]._type){let a=S[e]["duration (min)"]/60,r=new Date(S[e].timestamp);var Y=r;let t=e;do{if(--t,t>=0&&("TempBasal"==S[t]._type||"PumpSuspend"==S[t]._type)){Y=new Date(S[t].timestamp);break}}while(t>0);if(0==e&&"TempBasalDuration"==S[0]._type&&(Y=new Date,a=S[e]["duration (min)"]/60),(Y-r)/36e5-a>0){j+=z(Y,L(r,a))}}U=P+A+j,I=". Bolus insulin: "+P.toPrecision(5)+" U",D=". Temporary basal insulin: "+A.toPrecision(5)+" U",F=". Insulin with scheduled basal rate: "+j.toPrecision(5)+" U",T=O+(". tdd past 24h is: "+U.toPrecision(5)+" U")+I+D+F,tddReason=", TDD: "+o(U,2)+" U";const ee=e.glucose;var ae=w.enableChris,re=w.enableDynamicCR;const te=b.autosens_min,oe=b.autosens_max,ie=w.adjustmentFactor,ne=b.min_bg;var se=!1,le="";1!=b.high_temptarget_raises_sensitivity&&1!=b.exercise_mode||(se=!0),1==b.use_autoisf&&1==ae&&(b.use_autoisf=!1),ne>=118&&1==se&&(b.use_autoisf=!1,ae=!1,le="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+ne);var me=", Dynamic ratios log: ",ue=", AF: "+ie,de="BG: "+ee+" mg/dl ("+(.0555*ee).toPrecision(2)+" mmol/l). ",ce="";const ge=w.curve,fe=w.insulinPeakTime,pe=w.useCustomPeakTime;var he=55;switch(ge){case"rapid-acting":he=55;break;case"ultra-rapid":he=fe<75&&1==pe?120-fe:70}if(1==w.useNewFormula){var be=b.sens*ie*U*Math.log(ee/he+1)/1800;ce=", Logarithmic formula. InsulinFactor: "+he}else{be=b.sens*ie*U*ee/277700;ce=", Original formula"}var ve=b.carb_ratio,_e="",Be="";if(1==ae&&U>0){if(_e=", Dynamic ISF/CR: On/",be>oe?(le=", Dynamic ISF hit limitLog by autosens_max setting: "+oe+" ("+be.toPrecision(3)+"), ",Be=", Autosens/Dynamic Limit: "+oe+" ("+be.toPrecision(3)+")",be=oe):be<te&&(le=", Dynamic ISF hit limitLog by autosens_min setting: "+te+" ("+be.toPrecision(3)+"). ",Be=", Autosens/Dynamic Limit: "+te+" ("+be.toPrecision(3)+")",be=te),1==re){_e+="On";var Me=" CR: "+(ve=o(ve/be,2))+" g/U";b.carb_ratio=ve}else Me=" CR: "+ve+" g/U",_e+="Off";var ye=b.sens/be;le+="Dynamic autosens.ratio set to "+be.toPrecision(3)+" with ISF: "+ye.toPrecision(3)+" mg/dl/U ("+(.0555*ye).toPrecision(3)+" mmol/l/U). "+_e,v.ratio=be,T+=me+de+ue+ce+le+Me}else T+=0==ae&&1==re?me+de+ue+ce+"Dynamic ISF is off."+Me:me+"Dynamic ISF is off. Dynamic CR is off.";console.log(T),tddReason+=0==ae&&0==re?"":_e+ce+Be;var xe={},Se=new Date;if(x&&(Se=x),void 0===b||void 0===b.current_basal)return xe.error="Error: could not get current basal rate",xe;var we=t(b.current_basal,b),Ce=we,Fe=new Date;x&&(Fe=x);var Ie,De=new Date(e.date),Ge=o((Fe-De)/60/1e3,1),Oe=e.glucose,Te=e.noise;Ie=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var Re=Math.min(e.delta,e.short_avgdelta),Ue=Math.min(e.short_avgdelta,e.long_avgdelta),Ae=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(Oe<=10||38===Oe||Te>=3)&&(xe.reason="CGM is calibrating, in ??? state, or noise is high");if(Oe>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+i(Oe,b)+"+"+i(e.delta,b)+") for 5m w/ "+i(e.short_avgdelta,b)+" mg/dL ~15m change & "+i(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),Ge>12||Ge<-5?xe.reason="If current system time "+Fe+" is correct, then BG data is too old. The last BG data was read "+Ge+"m ago at "+De:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?xe.reason="CGM was just calibrated":xe.reason="CGM data is unchanged ("+i(Oe,b)+"+"+i(e.delta,b)+") for 5m w/ "+i(e.short_avgdelta,b)+" mg/dL ~15m change & "+i(e.long_avgdelta,b)+" mg/dL ~45m change"),Oe<=10||38===Oe||Te>=3||Ge>12||Ge<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return a.rate>=Ce?(xe.reason+=". Canceling high temp basal of "+a.rate,xe.deliverAt=Se,xe.temp="absolute",xe.duration=0,xe.rate=0,xe):0===a.rate&&a.duration>30?(xe.reason+=". Shortening "+a.duration+"m long zero temp to 30m. ",xe.deliverAt=Se,xe.temp="absolute",xe.duration=30,xe.rate=0,xe):(xe.reason+=". Temp "+a.rate+" <= current basal "+Ce+"U/hr; doing nothing. ",xe);var Pe,je,ke,Le=b.max_iob;if(void 0!==b.min_bg&&(je=b.min_bg),void 0!==b.max_bg&&(ke=b.max_bg),void 0===b.min_bg||void 0===b.max_bg)return xe.error="Error: could not determine target_bg. ",xe;Pe=(b.min_bg+b.max_bg)/2;var qe=b.exercise_mode||b.high_temptarget_raises_sensitivity,Ee=100,We=160;if(b.half_basal_exercise_target&&(We=b.half_basal_exercise_target),qe&&b.temptargetSet&&Pe>Ee||b.low_temptarget_lowers_sensitivity&&b.temptargetSet&&Pe<Ee){var ze=We-Ee;ze+Pe-Ee>0?(sensitivityRatio=ze/(ze+Pe-Ee),sensitivityRatio=Math.min(sensitivityRatio,b.autosens_max),sensitivityRatio=o(sensitivityRatio,2)):sensitivityRatio=b.autosens_max,process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+Pe+"; ")}else void 0!==v&&v&&(sensitivityRatio=v.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&(Ce=b.current_basal*sensitivityRatio,(Ce=t(Ce,b))!==we?process.stderr.write("Adjusting basal from "+we+" to "+Ce+"; "):process.stderr.write("Basal unchanged: "+Ce+"; ")),b.temptargetSet);else if(void 0!==v&&v&&(b.sensitivity_raises_target&&v.ratio<1||b.resistance_lowers_target&&v.ratio>1)){je=o((je-60)/v.ratio)+60,ke=o((ke-60)/v.ratio)+60;var Ne=o((Pe-60)/v.ratio)+60;Pe===(Ne=Math.max(80,Ne))?process.stderr.write("target_bg unchanged: "+Ne+"; "):process.stderr.write("target_bg from "+Pe+" to "+Ne+"; "),Pe=Ne}var Ze=200,$e=200,He=200;if(e.noise>=2){var Je=Math.max(1.1,b.noisyCGMTargetMultiplier);Math.min(250,b.maxRaw);Ze=o(Math.min(200,je*Je)),$e=o(Math.min(200,Pe*Je)),He=o(Math.min(200,ke*Je)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+Pe+" to "+$e+"; "),je=Ze,Pe=$e,ke=He}var Ke=je-.5*(je-40),Qe=o(b.sens,1),Ve=b.sens;if(void 0!==v&&v&&((Ve=o(Ve=b.sens/sensitivityRatio,1))!==Qe?process.stderr.write("ISF from "+i(Qe,b)+" to "+i(Ve,b)):process.stderr.write("ISF unchanged: "+i(Ve,b)),n+="Autosens ratio: "+o(sensitivityRatio,2)+", ISF: "+i(Qe,b)+"→"+i(Ve,b)),console.error("CR:"+b.carb_ratio),Ve=function(e,a,r,t,b,v,_,B){if(!r.use_autoisf)return console.error("autoISF disabled in Preferences"),e;var M=t.dura_p,y=t.delta_pl,x=t.delta_pn,S=t.r_squ,w=t.bg_acceleration,C=t.parabola_fit_a0,F=t.parabola_fit_a1,I=t.parabola_fit_a2,D=t.autoISF_duration,G=t.autoISF_average,O=r.autoisf_max,T=!1,R=1,U=1,A=1,P=a+10-G;if(!(b.mealCOB>0)||r.enableautoisf_with_COB){var j=t.pp_debug;if(d+="BG-accel: "+o(w,3)+", PF-minutes: "+M+", PF-corr: "+o(S,4)+", PF-nextDelta: "+i(x,r)+", PF-lastDelta: "+i(y,r)+", regular Delta: "+i(t.delta,r),console.error(j+d+" , Weights Accel/Brake: "+r.bgAccel_ISF_weight+" / "+r.bgBrake_ISF_weight),r.enable_BG_acceleration){var k=w;if(0!=t.parabola_fit_a2){var L=-F/2/I*5,q=o(C-L*L/25*I,1);(L=o(L,1))<0&&k<0?(f="saw max of "+i(q,r)+", about "+-L+" min ago",console.error("Parabolic fit "+f)):L<0&&k>0?(f="saw min of "+i(q,r)+", about "+-L+" min ago",console.error("Parabolic fit "+f)):L>0&&k<0?(f="predicts max of "+i(q,r)+", in about "+L+"min",console.error("Parabolic fit "+f)):L>0&&k>0&&(f="predicts min of "+i(q,r)+", in about "+L+" min",console.error("Parabolic fit "+f))}var E=S;if(E<=.9)f="acce_ISF by-passed, as correlation, "+o(E,3)+", is too low",console.error("Parabolic fit "+f),c+=", Parabolic Fit, "+f;else{c+=", Parabolic Fit, "+f+", lastΔ: "+i(y,r)+", nextΔ: "+i(x,r)+", Corr "+o(S,3)+", BG-Accel: "+o(k,2);var W=10*(E-.9),z=1;t.glucose<r.target_bg&&k>1&&(z=.5),A=1+k*z*(k<0?r.bgBrake_ISF_weight:r.bgAccel_ISF_weight)*W,console.error("Original result for acce_ISF: "+o(A,2)),1!=A&&(T=!0,c+=", acce-ISF Ratio: "+o(A,2))}}else console.error("autoISF BG accelertion adaption disabled in Preferences");var N=h(r,t.glucose,a);n+=", SMB Delivery Ratio:, "+o(N,2)+c+", autoISF";var Z=1+p(100-P,r);console.error("bg_ISF adaptation is "+o(Z,2)),Z<1&&A>1&&(g="bg-ISF adaptation lifted to "+o(Z*=A,2)+", as BG accelerates already",s="(lifted by "+o(A,2)+")",console.error(g));var $=1;if(Z<1)return($=Math.min(Z,A))<r.autoisf_min&&(g="final ISF factor "+o($,2)+" limitLoged by autoisf_min "+r.autoisf_min,console.error(g),$=r.autoisf_min),s=" (lmtd.)",earlysens=Math.min(720,o(r.sens/Math.min(B,$),1)),console.error("early Return autoISF:  "+i(earlysens,r)),n+=", bg-ISF Ratio: "+o(Z,2)+s+", ISF: "+i(earlysens,r),earlysens;Z>1&&(T=!0,n+=", bg-ISF Ratio: "+o(Z,2));var H=t.delta;P>0?console.error("delta_ISF adaptation by-passed as average glucose < "+i(a+10,r)):t.short_avgdelta<0?console.error("delta_ISF adaptation by-passed as no rise or too short lived"):r.enableppisf_always||r.postmeal_ISF_duration>=(v-b.lastCarbTime)/1e3/3600?(R=1+Math.max(0,H*r.postmeal_ISF_weight),console.error("pp_ISF adaptation is "+o(R,2)),m=", pp-ISF Ratio: "+o(R,2),1!=R&&(T=!0)):(U=p(H,r),P>-20&&(U*=.5),U=1+U,console.error("delta_ISF adaptation is "+o(U,2)),u=", Δ-ISF Ratio: "+o(U,2),1!=U&&(T=!0));var J=1,K=r.autoisf_hourlychange;return b.mealCOB>0&&!r.enableautoisf_with_COB?console.error("dura_ISF by-passed; preferences disabled mealCOB of "+o(b.mealCOB,1)):D<10?console.error("dura_ISF by-passed; BG is only "+D+"m at level "+G):G<=a?console.error("dura_ISF by-passed; avg. glucose "+G+" below target "+i(a,r)):(J+=D/60*(K/a)*(G-a),T=!0,l=", Duration: "+D+", Avg: "+i(G,r)+", dura-ISF Ratio: "+o(J,2),console.error("dura_ISF  adaptation is "+o(J,2)+" because ISF "+e+" did not do it for "+o(D,1)+"m")),$=1,T?($=Math.max(J,Z,U,A,R),console.error("autoISF adaption ratios:"),console.error("  dura "+o(J,2)),console.error("  bg "+o(Z,2)),console.error("  delta "+o(U,2)),console.error("  pp "+o(R,2)),console.error("  accel "+o(A,2)),A<1&&(console.error("strongest ISF factor "+o($,2)+" weakened to "+o($*A,2)+" as bg decelerates already"),$*=A),$<r.autoisf_min?(console.error("final ISF factor "+o($,2)+" limitLoged by autoisf_min "+r.autoisf_min),$=r.autoisf_min):$>O&&(console.error("final ISF factor "+o($,2)+" limitLoged by autoisf_max "+O),$=O),$>=1&&(e=o(r.sens/Math.max($,B),1)),$<1&&(e=o(r.sens/Math.min($,B),1))):$=B,n+=m+u+l+", Ratio: "+o($,2)+", ISF: "+i(e,r),console.error("Inside autoISF: Ratio "+o($,2)+" resulting in "+i(e,r)),e}console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+o(b.mealCOB,1))}(Ve,Pe,b,e,_,x,0,sensitivityRatio),void 0===r)return xe.error="Error: iob_data undefined. ",xe;var Xe,Ye=r;if(r.length,r.length>1&&(r=Ye[0]),void 0===r.activity||void 0===r.iob)return xe.error="Error: iob_data missing some property. ",xe;var ea=((Xe=void 0!==r.lastTemp?o((new Date(Fe).getTime()-r.lastTemp.date)/6e4):0)+a.duration)%30;if(console.error("currenttemp:"+a.rate+" lastTempAge:"+Xe+"m, tempModulus:"+ea+"m"),xe.temp="absolute",xe.deliverAt=Se,M&&a&&r.lastTemp&&a.rate!==r.lastTemp.rate&&Xe>10&&a.duration)return xe.reason="Warning: currenttemp rate "+a.rate+" != lastTemp rate "+r.lastTemp.rate+" from pumphistory; canceling temp",B.setTempBasal(0,0,b,xe,a);if(a&&r.lastTemp&&a.duration>0){var aa=Xe-r.lastTemp.duration;if(aa>5&&Xe>10)return xe.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+aa+"m ago; canceling temp",B.setTempBasal(0,0,b,xe,a)}var ra=o(-r.activity*Ve*5,2),ta=o(6*(Re-ra));ta<0&&(ta=o(6*(Ue-ra)))<0&&(ta=o(6*(e.long_avgdelta-ra)));var oa=Oe,ia=(oa=r.iob>0?o(Oe-r.iob*Ve):o(Oe-r.iob*Math.min(Ve,b.sens)))+ta;if(void 0===ia||isNaN(ia))return xe.error="Error: could not calculate eventualBG. Sensitivity: "+Ve+" Deviation: "+ta,xe;var na=function(e,a,r){return o(r+(e-a)/24,1)}(Pe,ia,ra);xe={temp:"absolute",bg:Oe,tick:Ie,eventualBG:ia,insulinReq:0,reservoir:y,deliverAt:Se,sensitivityRatio,TDD:U};var sa=[],la=[],ma=[],ua=[];sa.push(Oe),la.push(Oe),ua.push(Oe),ma.push(Oe);var da=function(e,a,r,t){return a?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of",t),!1):!0===r.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&r.mealCOB?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of",r.mealCOB),!0):!0===e.enableSMB_after_carbs&&r.carbs?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of",i(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(b,M,_,Pe),ca=b.enableUAM,ga=0,fa=0;ga=o(Re-ra,1);var pa=o(Re-ra,1);csf=Ve/b.carb_ratio,console.error("profile.sens:"+i(b.sens,b)+", sens:"+i(Ve,b)+", CSF:"+o(csf,1));var ha=o(30*csf*5/60,1);ga>ha&&(console.error("Limiting carb impact from "+ga+" to "+ha+"mg/dL/5m (30g/h)"),ga=ha);var ba=3;sensitivityRatio&&(ba/=sensitivityRatio);var va=ba;if(_.carbs){ba=Math.max(ba,_.mealCOB/20);var _a=o((new Date(Fe).getTime()-_.lastCarbTime)/6e4),Ba=(_.carbs-_.mealCOB)/_.carbs;va=o(va=ba+1.5*_a/60,1),console.error("Last carbs "+_a+" minutes ago; remainingCATime:"+va+"hours; "+o(100*Ba)+"% carbs absorbed")}var Ma=Math.max(0,ga/5*60*va/2)/csf,ya=90,xa=1;b.remainingCarbsCap&&(ya=Math.min(90,b.remainingCarbsCap)),b.remainingCarbsFraction&&(xa=Math.min(1,b.remainingCarbsFraction));var Sa=1-xa,wa=Math.max(0,_.mealCOB-Ma-_.carbs*Sa),Ca=(wa=Math.min(ya,wa))*csf*5/60/(va/2),Fa=o(_.slopeFromMaxDeviation,2),Ia=o(_.slopeFromMinDeviation,2),Da=Math.min(Fa,-Ia/3),Ga=0;0===ga?fa=0:!0===b.floating_carbs?(fa=Math.min(60*va/5/2,Math.max(0,_.carbs*csf/ga)),Ga=Math.min(60*va/5/2,Math.max(0,_.mealCOB*csf/ga)),_.carbs>0&&(n+=", Floating Carbs:, CID: "+o(fa,1)+", MealCarbs: "+o(_.carbs,1)+", Not Floating:, CID: "+o(Ga,1)+", MealCOB: "+o(_.mealCOB,1),console.error("Floating Carbs CID: "+o(fa,1)+" / MealCarbs: "+o(_.carbs,1)+" vs. Not Floating:"+o(Ga,1)+" / MealCOB:"+o(_.mealCOB,1)))):fa=Math.min(60*va/5/2,Math.max(0,_.mealCOB*csf/ga)),console.error("Carb Impact:"+ga+"mg/dL per 5m; CI Duration:"+o(5*fa/60*2,1)+"hours; remaining CI ("+va/2+"h peak):",o(Ca,1)+"mg/dL per 5m");var Oa,Ta,Ra,Ua,Aa,Pa=999,ja=999,ka=999,La=Oe,qa=999,Ea=999,Wa=999,za=999,Na=ia,Za=Oe,$a=Oe,Ha=0,Ja=[],Ka=[];try{Ye.forEach((function(e){var a=o(-e.activity*Ve*5,2),r=o(-e.iobWithZeroTemp.activity*Ve*5,2),t=ga*(1-Math.min(1,la.length/12));Na=la[la.length-1]+a+t;var i=ua[ua.length-1]+r,n=Math.max(0,Math.max(0,ga)*(1-sa.length/Math.max(2*fa,1))),s=Math.min(sa.length,12*va-sa.length),l=Math.max(0,s/(va/2*12)*Ca);n+l,Ja.push(o(l,0)),Ka.push(o(n,0)),COBpredBG=sa[sa.length-1]+a+Math.min(0,t)+n+l;var m=Math.max(0,pa+ma.length*Da),u=Math.max(0,pa*(1-ma.length/Math.max(36,1))),d=Math.min(m,u);d>0&&(Ha=o(5*(ma.length+1)/60,1)),UAMpredBG=ma[ma.length-1]+a+Math.min(0,t)+d,la.length<48&&la.push(Na),sa.length<48&&sa.push(COBpredBG),ma.length<48&&ma.push(UAMpredBG),ua.length<48&&ua.push(i),COBpredBG<qa&&(qa=o(COBpredBG)),UAMpredBG<Ea&&(Ea=o(UAMpredBG)),Na<Wa&&(Wa=o(Na)),i<za&&(za=o(i));la.length>18&&Na<Pa&&(Pa=o(Na)),Na>Za&&(Za=Na),(fa||Ca>0)&&sa.length>18&&COBpredBG<ja&&(ja=o(COBpredBG)),(fa||Ca>0)&&COBpredBG>Za&&($a=COBpredBG),ca&&ma.length>12&&UAMpredBG<ka&&(ka=o(UAMpredBG)),ca&&UAMpredBG>Za&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}_.mealCOB&&(console.error("predCIs (mg/dL/5m):"+Ka.join(" ")),console.error("remainingCIs:      "+Ja.join(" "))),xe.predBGs={},la.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))}));for(var Qa=la.length-1;Qa>12&&la[Qa-1]===la[Qa];Qa--)la.pop();for(xe.predBGs.IOB=la,Ra=o(la[la.length-1]),ua.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Qa=ua.length-1;Qa>6&&!(ua[Qa-1]>=ua[Qa]||ua[Qa]<=Pe);Qa--)ua.pop();if(xe.predBGs.ZT=ua,o(ua[ua.length-1]),_.mealCOB>0&&(ga>0||Ca>0)){for(sa.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Qa=sa.length-1;Qa>12&&sa[Qa-1]===sa[Qa];Qa--)sa.pop();xe.predBGs.COB=sa,Ua=o(sa[sa.length-1]),ia=Math.max(ia,o(sa[sa.length-1]))}if(ga>0||Ca>0){if(ca){for(ma.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Qa=ma.length-1;Qa>12&&ma[Qa-1]===ma[Qa];Qa--)ma.pop();xe.predBGs.UAM=ma,Aa=o(ma[ma.length-1]),ma[ma.length-1]&&(ia=Math.max(ia,o(ma[ma.length-1])))}xe.eventualBG=ia}console.error("UAM Impact:"+pa+"mg/dL per 5m; UAM Duration:"+Ha+"hours"),Pa=Math.max(39,Pa),ja=Math.max(39,ja),ka=Math.max(39,ka),Oa=o(Pa);var Va=_.mealCOB/_.carbs;Ta=o(ka<999&&ja<999?(1-Va)*UAMpredBG+Va*COBpredBG:ja<999?(Na+COBpredBG)/2:ka<999?(Na+UAMpredBG)/2:Na),za>Ta&&(Ta=za),La=o(La=fa||Ca>0?ca?Va*qa+(1-Va)*Ea:qa:ca?Ea:Wa);var Xa=ka;if(za<Ke)Xa=(ka+za)/2;else if(za<Pe){var Ya=(za-Ke)/(Pe-Ke);Xa=(ka+(ka*Ya+za*(1-Ya)))/2}else za>ka&&(Xa=(ka+za)/2);if(Xa=o(Xa),_.carbs)if(!ca&&ja<999)Oa=o(Math.max(Pa,ja));else if(ja<999){var er=Va*ja+(1-Va)*Xa;Oa=o(Math.max(Pa,ja,er))}else Oa=ca?Xa:La;else ca&&(Oa=o(Math.max(Pa,Xa)));Oa=Math.min(Oa,Ta),process.stderr.write("minPredBG: "+Oa+" minIOBPredBG: "+Pa+" minZTGuardBG: "+za),ja<999&&process.stderr.write(" minCOBPredBG: "+ja),ka<999&&process.stderr.write(" minUAMPredBG: "+ka),console.error(" avgPredBG:"+Ta+" COB/Carbs:"+_.mealCOB+"/"+_.carbs),$a>Oe&&(Oa=Math.min(Oa,$a)),xe.COB=_.mealCOB,xe.IOB=r.iob,xe.BGI=i(ra,b),xe.deviation=i(ta,b),xe.ISF=i(Ve,b),xe.CR=o(b.carb_ratio,2),xe.target_bg=i(Pe,b),xe.TDD=o(U,2),xe.reason=n+", COB: "+xe.COB+", Dev: "+xe.deviation+", BGI: "+xe.BGI+", CR: "+xe.CR+", Target: "+xe.target_bg+", minPredBG "+i(Oa,b)+", minGuardBG "+i(La,b)+", IOBpredBG "+i(Ra,b)+tddReason,Ua>0&&(xe.reason+=", COBpredBG "+i(Ua,b)),Aa>0&&(xe.reason+=", UAMpredBG "+i(Aa,b)),xe.reason+="; ";var ar=oa;ar<40&&(ar=Math.min(La,ar));var rr,tr=Ke-ar,or=240,ir=240;if(_.mealCOB>0&&(ga>0||Ca>0)){for(Qa=0;Qa<sa.length;Qa++)if(sa[Qa]<je){or=5*Qa;break}for(Qa=0;Qa<sa.length;Qa++)if(sa[Qa]<Ke){ir=5*Qa;break}}else{for(Qa=0;Qa<la.length;Qa++)if(la[Qa]<je){or=5*Qa;break}for(Qa=0;Qa<la.length;Qa++)if(la[Qa]<Ke){ir=5*Qa;break}}da&&La<Ke&&(console.error("minGuardBG "+i(La,b)+" projected below "+i(Ke,b)+" - disabling SMB"),da=!1),void 0===b.maxDelta_bg_threshold&&(rr=.2),void 0!==b.maxDelta_bg_threshold&&(rr=Math.min(b.maxDelta_bg_threshold,.4)),Ae>rr*Oe&&(console.error("maxDelta "+i(Ae,b)+" > "+100*rr+"% of BG "+i(Oe,b)+" - disabling SMB"),xe.reason+="maxDelta "+i(Ae,b)+" > "+100*rr+"% of BG "+i(Oe,b)+" - SMB disabled!, ",da=!1),console.error("BG projected to remain above "+i(je,b)+" for "+or+"minutes"),(ir<240||or<60)&&console.error("BG projected to remain above "+i(Ke,b)+" for "+ir+"minutes");var nr=ir,sr=b.current_basal*Ve*nr/60,lr=Math.max(0,_.mealCOB-.25*_.carbs),mr=(tr-sr)/csf-lr;sr=o(sr),mr=o(mr),console.error("naive_eventualBG:"+oa+" bgUndershoot:"+tr+" zeroTempDuration:"+nr+" zeroTempEffect:"+sr+" carbsReq:"+mr),mr>=b.carbsReqThreshold&&ir<=45&&(xe.carbsReq=mr,xe.reason+=mr+" add'l carbs req w/in "+ir+"m; ");var ur=0;if(Oe<Ke&&r.iob<20*-b.current_basal/60&&Re>0&&Re>na)xe.reason+="IOB "+r.iob+" < "+o(20*-b.current_basal/60,2),xe.reason+=" and minDelta "+i(Re,b)+" > expectedDelta "+i(na,b)+"; ";else if(Oe<Ke||La<Ke)return xe.reason+="minGuardBG "+i(La,b)+"<"+i(Ke,b),ur=o(60*((tr=Pe-La)/Ve)/b.current_basal),ur=30*o(ur/30),ur=Math.min(120,Math.max(30,ur)),B.setTempBasal(0,ur,b,xe,a);if(b.skip_neutral_temps&&xe.deliverAt.getMinutes()>=55)return xe.reason+="; Canceling temp at "+xe.deliverAt.getMinutes()+"m past the hour. ",B.setTempBasal(0,0,b,xe,a);var dr=0,cr=Ce;if(ia<je){if(xe.reason+="Eventual BG "+i(ia,b)+" < "+i(je,b),Re>na&&Re>0&&!mr)return oa<40?(xe.reason+=", naive_eventualBG < 40. ",B.setTempBasal(0,30,b,xe,a)):(e.delta>Re?xe.reason+=", but Delta "+i(Ie,b)+" > expectedDelta "+i(na,b):xe.reason+=", but Min. Delta "+Re.toFixed(2)+" > Exp. Delta "+i(na,b),a.duration>15&&t(Ce,b)===t(a.rate,b)?(xe.reason+=", temp "+a.rate+" ~ req "+Ce+"U/hr. ",xe):(xe.reason+="; setting current basal of "+Ce+" as temp. ",B.setTempBasal(Ce,30,b,xe,a)));dr=o(dr=2*Math.min(0,(ia-Pe)/Ve),2);var gr=Math.min(0,(oa-Pe)/Ve);if(gr=o(gr,2),Re<0&&Re>na)dr=o(dr*(Re/na),2);if(cr=t(cr=Ce+2*dr,b),a.duration*(a.rate-Ce)/60<Math.min(dr,gr)-.3*Ce)return xe.reason+=", "+a.duration+"m@"+a.rate.toFixed(2)+" is a lot less than needed. ",B.setTempBasal(cr,30,b,xe,a);if(void 0!==a.rate&&a.duration>5&&cr>=.8*a.rate)return xe.reason+=", temp "+a.rate+" ~< req "+cr+"U/hr. ",xe;if(cr<=0){if((ur=o(60*((tr=Pe-oa)/Ve)/b.current_basal))<0?ur=0:(ur=30*o(ur/30),ur=Math.min(120,Math.max(0,ur))),ur>0)return xe.reason+=", setting "+ur+"m zero temp. ",B.setTempBasal(cr,ur,b,xe,a)}else xe.reason+=", setting "+cr+"U/hr. ";return B.setTempBasal(cr,30,b,xe,a)}if(Re<na&&(!M||!da))return e.delta<Re?xe.reason+="Eventual BG "+i(ia,b)+" > "+i(je,b)+" but Delta "+i(Ie,b)+" < Exp. Delta "+i(na,b):xe.reason+="Eventual BG "+i(ia,b)+" > "+i(je,b)+" but Min. Delta "+Re.toFixed(2)+" < Exp. Delta "+i(na,b),a.duration>15&&t(Ce,b)===t(a.rate,b)?(xe.reason+=", temp "+a.rate+" ~ req "+Ce+"U/hr. ",xe):(xe.reason+="; setting current basal of "+Ce+" as temp. ",B.setTempBasal(Ce,30,b,xe,a));if(Math.min(ia,Oa)<ke&&(!M||!da))return xe.reason+=i(ia,b)+"-"+i(Oa,b)+" in range: no temp required",a.duration>15&&t(Ce,b)===t(a.rate,b)?(xe.reason+=", temp "+a.rate+" ~ req "+Ce+"U/hr. ",xe):(xe.reason+="; setting current basal of "+Ce+" as temp. ",B.setTempBasal(Ce,30,b,xe,a));if(ia>=ke&&(xe.reason+="Eventual BG "+i(ia,b)+" >= "+i(ke,b)+", "),r.iob>Le)return xe.reason+="IOB "+o(r.iob,2)+" > max_iob "+Le,a.duration>15&&t(Ce,b)===t(a.rate,b)?(xe.reason+=", temp "+a.rate+" ~ req "+Ce+"U/hr. ",xe):(xe.reason+="; setting current basal of "+Ce+" as temp. ",B.setTempBasal(Ce,30,b,xe,a));(dr=o((Math.min(Oa,ia)-Pe)/Ve,2))>Le-r.iob&&(xe.reason+="max_iob "+Le+", ",dr=Le-r.iob),cr=t(cr=Ce+2*dr,b),dr=o(dr,3),xe.insulinReq=dr;var fr=o((new Date(Fe).getTime()-r.lastBolusTime)/6e4,1);if(M&&da&&Oe>Ke){var pr=o(_.mealCOB/b.carb_ratio,3);if(b.use_autoisf)hr=b.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var hr=1}hr>1&&console.error("SMB max range extended from default by factor "+hr);var br=0;void 0===b.maxSMBBasalMinutes?(br=o(hr*b.current_basal*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m")):r.iob>pr&&r.iob>0?(console.error("IOB",r.iob,"> COB",_.mealCOB+"; mealInsulinReq =",pr),b.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes:",b.maxUAMSMBBasalMinutes,"profile.current_basal:",b.current_basal),br=o(hr*b.current_basal*b.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),br=o(30*b.current_basal/60,1))):(console.error("profile.maxSMBBasalMinutes:",b.maxSMBBasalMinutes,"profile.current_basal:",b.current_basal),br=o(hr*b.current_basal*b.maxSMBBasalMinutes/60,1));var vr=b.bolus_increment,_r=1/vr;if(b.use_autoisf)var Br=h(b,Oe,Pe);else console.error("autoISF disabled, don't adjust SMB Delivery Ratio"),Br=.5;Br>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(Br,2));var Mr=Math.min(dr*Br,br);Mr=Math.floor(Mr*_r)/_r,ur=o(60*((Pe-(oa+Pa)/2)/Ve)/b.current_basal),dr>0&&Mr<vr&&(ur=0);var yr=0;ur<=0?ur=0:ur>=30?(ur=30*o(ur/30),ur=Math.min(60,Math.max(0,ur))):(yr=o(Ce*ur/30,2),ur=30),xe.reason+=" insulinReq "+dr,Mr>=br&&(xe.reason+="; maxBolus "+br),ur>0&&(xe.reason+="; setting "+ur+"m low temp of "+yr+"U/h"),xe.reason+=". ";var xr=3;b.SMBInterval&&(xr=Math.min(10,Math.max(1,b.SMBInterval)));var Sr=o(xr-fr,0),wr=o(60*(xr-fr),0)%60;if(console.error("naive_eventualBG",oa+",",ur+"m "+yr+"U/h temp needed; last bolus",fr+"m ago; maxBolus: "+br),fr>xr?Mr>0&&(xe.units=Mr,xe.reason+="Microbolusing "+Mr+"U. "):xe.reason+="Waiting "+Sr+"m "+wr+"s to microbolus again. ",ur>0)return xe.rate=yr,xe.duration=ur,xe}var Cr=B.getMaxSafeBasal(b);return cr>Cr&&(xe.reason+="adj. req. rate: "+cr+" to maxSafeBasal: "+Cr+", ",cr=t(Cr,b)),a.duration*(a.rate-Ce)/60>=2*dr?(xe.reason+=a.duration+"m@"+a.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+cr+"U/hr. ",B.setTempBasal(cr,30,b,xe,a)):void 0===a.duration||0===a.duration?(xe.reason+="no temp, setting "+cr+"U/hr. ",B.setTempBasal(cr,30,b,xe,a)):a.duration>5&&t(cr,b)<=t(a.rate,b)?(xe.reason+="temp "+a.rate+" >~ req "+cr+"U/hr. ",xe):(xe.reason+="temp "+a.rate+"<"+cr+"U/hr. ",B.setTempBasal(cr,30,b,xe,a))}},6880:(e,a,r)=>{var t=r(6654);e.exports=function(e,a){var r=20;void 0!==a&&"string"==typeof a.model&&(t(a.model,"54")||t(a.model,"23"))&&(r=40);return e<1?Math.round(e*r)/r:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,a,r)=>{var t=r(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,a){for(var r=-1,t=null==e?0:e.length,o=Array(t);++r<t;)o[r]=a(e[r],r,e);return o}},9750:e=>{e.exports=function(e,a,r){return e==e&&(void 0!==r&&(e=e<=r?e:r),void 0!==a&&(e=e>=a?e:a)),e}},4239:(e,a,r)=>{var t=r(2705),o=r(9607),i=r(2333),n=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":n&&n in Object(e)?o(e):i(e)}},531:(e,a,r)=>{var t=r(2705),o=r(9932),i=r(1469),n=r(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(a){if("string"==typeof a)return a;if(i(a))return o(a,e)+"";if(n(a))return l?l.call(a):"";var r=a+"";return"0"==r&&1/a==-Infinity?"-0":r}},7561:(e,a,r)=>{var t=r(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,a,r)=>{var t="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=t},9607:(e,a,r)=>{var t=r(2705),o=Object.prototype,i=o.hasOwnProperty,n=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var a=i.call(e,s),r=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=n.call(e);return t&&(a?e[s]=r:delete e[s]),o}},2333:e=>{var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},5639:(e,a,r)=>{var t=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=t||o||Function("return this")();e.exports=i},7990:e=>{var a=/\s/;e.exports=function(e){for(var r=e.length;r--&&a.test(e.charAt(r)););return r}},6654:(e,a,r)=>{var t=r(9750),o=r(531),i=r(554),n=r(9833);e.exports=function(e,a,r){e=n(e),a=o(a);var s=e.length,l=r=void 0===r?s:t(i(r),0,s);return(r-=a.length)>=0&&e.slice(r,l)==a}},1469:e=>{var a=Array.isArray;e.exports=a},3218:e=>{e.exports=function(e){var a=typeof e;return null!=e&&("object"==a||"function"==a)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,a,r)=>{var t=r(4239),o=r(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,a,r)=>{var t=r(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,a,r)=>{var t=r(8601);e.exports=function(e){var a=t(e),r=a%1;return a==a?r?a-r:a:0}},4841:(e,a,r)=>{var t=r(7561),o=r(3218),i=r(3448),n=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(o(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=o(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var r=s.test(e);return r||l.test(e)?m(e.slice(2),r?2:8):n.test(e)?NaN:+e}},9833:(e,a,r)=>{var t=r(531);e.exports=function(e){return null==e?"":t(e)}}},a={};function r(t){var o=a[t];if(void 0!==o)return o.exports;var i=a[t]={exports:{}};return e[t](i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var t=r(4051);freeaps_determineBasal=t})();
