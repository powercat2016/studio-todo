montageDefine("ece8d1c","ui/flow.reel/flow-translate-composer",{dependencies:["montage","composer/translate-composer","core/event/event-manager","core/geometry/point","core/dom"],factory:function(e,t){var n=(e("montage").Montage,e("composer/translate-composer").TranslateComposer),r=(e("core/event/event-manager").defaultEventManager,e("core/geometry/point").Point),i=e("core/dom").convertPointFromPageToNode;t.FlowTranslateComposer=n.specialize({constructor:{value:function(){this.super(),this.handleMousewheel=this.handleWheel}},stealChildrenPointer:{value:!0},_scrollingMode:{value:"linear"},scrollingMode:{get:function(){return this._scrollingMode},set:function(e){switch(e){case"linear":case"drag":this._scrollingMode=e}}},_linearScrollingVector:{value:[-300,0]},linearScrollingVector:{get:function(){return this._linearScrollingVector},set:function(e){this._linearScrollingVector=e}},_startPageX:{value:null},_startPageY:{value:null},_pageX:{value:null},_pageY:{value:null},_pointerStartX:{value:null},_pointerStartY:{value:null},_contentOffsetX:{value:null},_contentOffsetY:{value:null},_start:{value:function(e,t){n._start.apply(this,arguments);var a=window.getComputedStyle(this._element,null),o=this.convertCssPixelsPropertyStringToNumber(a.getPropertyValue("border-left-width")),s=this.convertCssPixelsPropertyStringToNumber(a.getPropertyValue("border-top-width")),l=this.convertCssPixelsPropertyStringToNumber(a.getPropertyValue("padding-left")),u=this.convertCssPixelsPropertyStringToNumber(a.getPropertyValue("padding-top")),c=i(this._element,(new r).init(e,t));this._pointerStartX=this._pointerX=c.x-o-l,this._pointerStartY=this._pointerY=c.y-s-u,this._contentOffsetX=this._startPageX-this._pointerStartX,this._contentOffsetY=this._startPageY-this._pointerStartY,this._computePointedElement(),this._startPageX=this._pageX=e,this._startPageY=this._pageY=t,this._startScroll=this._scroll,this._previousScrollDelta=0,this._scrollEnd=null}},_analyzeMovement:{value:function(e){var t,n,r,i=e.velocity;i&&(t=i.speed,t>=this.startTranslateSpeed?this._stealPointer():(n=this.startPageX-e.pageX,r=this.startPageY-e.pageY,n*n+r*r>this.startTranslateRadius*this.startTranslateRadius&&this._stealPointer()))}},_dispatchTranslateStart:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("translateStart",!0,!0,null),e.scroll=this._scroll,e.translateX=0,e.translateY=0,e.pointer=this._observedPointer,this.dispatchEvent(e)}},_dispatchTranslateEnd:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("translateEnd",!0,!0,null),e.scroll=this._scroll,e.translateX=0,e.translateY=0,e.pointer=this._observedPointer,this.dispatchEvent(e)}},_dispatchTranslate:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("translate",!0,!0,null),e.scroll=this._scroll,e.translateX=0,e.translateY=0,e.pointer=this._observedPointer,this.dispatchEvent(e)}},_move:{value:function(e,t){this._isFirstMove&&(this._dispatchTranslateStart(),this._isFirstMove=!1),this._pageX=e,this._pageY=t,"drag"===this._scrollingMode?(this._pointerX=e-this._contentOffsetX,this._pointerY=t-this._contentOffsetY,this._updateDragScroll()):this._updateLinearScroll(),null!==this._closerIndex,this._shouldDispatchTranslate&&this._dispatchTranslate()}},_end:{value:function(e){this.eventManager.isPointerClaimedByComponent(this._observedPointer,this)&&(this.startTime=Date.now(),this.endX=this.startX=this._pageX,this.endY=this.startY=this._pageY,this._hasMomentum&&(e.velocity.speed>40||this.translateStrideX||this.translateStrideY)?(this.momentumX="vertical"!=this._axis?e.velocity.x*this._pointerSpeedMultiplier*(this._invertXAxis?1:-1):0,this.momentumY="horizontal"!=this._axis?e.velocity.y*this._pointerSpeedMultiplier*(this._invertYAxis?1:-1):0,this.endX=this.startX+this.momentumX*this.__momentumDuration/2e3,this.endY=this.startY+this.momentumY*this.__momentumDuration/2e3,this.startStrideXTime=null,this.startStrideYTime=null,this.animateMomentum=!0):this.animateMomentum=!1,this.animateMomentum?this._animationInterval():this._isFirstMove||this._dispatchTranslateEnd()),this._releaseInterest()}},_translateEndTimeout:{value:null},_mousewheelStrideTimeout:{value:null},_previousDeltaY:{value:0},handleWheel:{value:function(e){var t=this;if(this.eventManager.isPointerClaimedByComponent(this._WHEEL_POINTER,this.component)){var n=this._pageY,r=e.wheelDeltaY||-e.deltaY||0;this.translateStrideX?(window.clearTimeout(this._mousewheelStrideTimeout),(null===this._mousewheelStrideTimeout||Math.abs(r)>Math.abs(this._previousDeltaY*(null===this._mousewheelStrideTimeout?2:4)))&&(r>1?this.callDelegateMethod("previousStride",this):-1>r&&this.callDelegateMethod("nextStride",this)),this._mousewheelStrideTimeout=window.setTimeout(function(){t._mousewheelStrideTimeout=null,t._previousDeltaY=0},70),t._previousDeltaY=r,this._shouldPreventDefault(e)&&e.preventDefault()):(null===this._translateEndTimeout&&this._dispatchTranslateStart(),this._pageY=this._pageY+20*r/100,this._updateScroll(),this._dispatchTranslate(),window.clearTimeout(this._translateEndTimeout),this._translateEndTimeout=window.setTimeout(function(){t._dispatchTranslateEnd(),t._translateEndTimeout=null},400),n!==this._pageY&&this._shouldPreventDefault(e)&&e.preventDefault()),this.eventManager.forfeitPointer(this._WHEEL_POINTER,this.component)}}},_scroll:{value:0},scroll:{get:function(){return this._scroll},set:function(e){null!==this.minScroll&&this.minScroll>e&&(e=this.minScroll),null!==this.maxScroll&&e>this.maxScroll&&(e=this.maxScroll),this._scroll=e}},minScroll:{value:null},maxScroll:{value:null},_flow:{value:null},flow:{get:function(){return this._flow},set:function(e){this._flow=e,this.component=e}},_updateScroll:{value:function(){"linear"===this._scrollingMode?this._updateLinearScroll():this._updateDragScroll()}},_updateLinearScroll:{value:function(){var e=500/this._flow._height,t=(this._pageX-this._startPageX)*this._linearScrollingVector[0]*e,n=(this._pageY-this._startPageY)*this._linearScrollingVector[1]*e,r=this._linearScrollingVector[0]*this._linearScrollingVector[0]+this._linearScrollingVector[1]*this._linearScrollingVector[1],i=(t+n)/r;this.scroll+=i-this._previousScrollDelta,this._previousScrollDelta=i}},_updateDragScroll:{value:function(){var e=(this._pointerX-this._pointerStartX)*this._lineVectorX,t=(this._pointerY-this._pointerStartY)*this._lineVectorY,n=this._lineVectorX*this._lineVectorX+this._lineVectorY*this._lineVectorY,r=(e+t)/n;this.scroll+=r-this._previousScrollDelta,this._previousScrollDelta=r;var i,a,o,s,l,u,c,h,d,p,m,f,v,g,_,b,y,w,E,P,M=this._flow,C=M._cameraPosition,T=M._splinePaths,D=T.length,S=this._closerIndex%D,O=this.flow._splinePaths[S],A=Math.floor(this._closerIndex/D)-this._scroll+this._flow._paths[S].headOffset,x=null,L=null,z=0,j=.5*this._element.clientWidth,k=.5*this._element.clientHeight,e=j-this._pointerX,t=k-this._pointerY,I=M.cameraTargetPoint[0]-C[0],R=M.cameraTargetPoint[1]-C[1],N=M.cameraTargetPoint[2]-C[2],F=-Math.atan2(I,N),B=this._pointerIntersectionPosition;m=N*Math.cos(F)-I*Math.sin(F),f=-Math.atan2(R,m),b=Math.sin(F),y=Math.cos(F),w=Math.sin(f),E=Math.cos(f),g=k/Math.tan(.008726646259972*M.cameraFov),P=0,c=1e100;do p=O._convertSplineTimeToBezierIndexTime(A+P),null!==p&&(i=O.getPositionAtIndexTime(p),rotation=T[S].getRotationAtIndexTime(p),v=this._rotateXYZ(B,rotation),a=(C[2]-i[2]-v[2])*b-(i[0]-C[0]+v[0])*y,o=i[1]-C[1]+v[1],s=(i[2]-C[2]+v[2])*y-(i[0]-C[0]+v[0])*b,l=s*w+o*E,u=s*E-o*w,_=g/u,a=e+a*_,o=t+l*_,d=a*a+o*o,c>d&&(c=d,x=P)),P-=.025;while(P>-6);x+.025>0&&(x=-.025),P=x+.025,c=1e100;do p=O._convertSplineTimeToBezierIndexTime(A+P),null!==p&&(i=O.getPositionAtIndexTime(p),rotation=T[S].getRotationAtIndexTime(p),v=this._rotateXYZ(B,rotation),a=(C[2]-i[2]-v[2])*b-(i[0]-C[0]+v[0])*y,o=i[1]-C[1]+v[1],s=(i[2]-C[2]+v[2])*y-(i[0]-C[0]+v[0])*b,l=s*w+o*E,u=s*E-o*w,_=g/u,a=e+a*_,o=t+l*_,d=a*a+o*o,c>d&&(c=d,x=P)),P-=2e-4;while(P>x-.05);P=0,h=1e100;do p=O._convertSplineTimeToBezierIndexTime(A+P),null!==p&&(i=O.getPositionAtIndexTime(p),rotation=T[S].getRotationAtIndexTime(p),v=this._rotateXYZ(B,rotation),a=(C[2]-i[2]-v[2])*b-(i[0]-C[0]+v[0])*y,o=i[1]-C[1]+v[1],s=(i[2]-C[2]+v[2])*y-(i[0]-C[0]+v[0])*b,l=s*w+o*E,u=s*E-o*w,_=g/u,a=e+a*_,o=t+l*_,d=a*a+o*o,h>d&&(h=d,L=P)),P+=.025;while(6>P);0>L-.025&&(L=.025),P=L-.025,h=1e100;do p=O._convertSplineTimeToBezierIndexTime(A+P),null!==p&&(i=O.getPositionAtIndexTime(p),rotation=T[S].getRotationAtIndexTime(p),v=this._rotateXYZ(B,rotation),a=(C[2]-i[2]-v[2])*b-(i[0]-C[0]+v[0])*y,o=i[1]-C[1]+v[1],s=(i[2]-C[2]+v[2])*y-(i[0]-C[0]+v[0])*b,l=s*w+o*E,u=s*E-o*w,_=g/u,a=e+a*_,o=t+l*_,d=a*a+o*o,h>d&&(h=d,L=P)),P+=2e-4;while(L+.05>P);x?z=L?L*L>x*x?x:L:x:L&&(z=L),z>0?.05>=z&&(this.scroll=this._scroll-z):z>=-.05&&(this.scroll=this._scroll-z)}},frame:{value:function(){this.isAnimating&&this._animationInterval()}},convertCssPixelsPropertyStringToNumber:{value:function(e){return"string"==typeof e?"px"===e.substr(-2)?1*e.substr(0,e.length-2):0:0}},_rayPointDistance:{value:function(e,t){var n,r,i,a,o;return n=e[0]*t[0]+e[1]*t[1]+e[2]*t[2],n>=0?(r=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n/=r,i=e[0]*n-t[0],a=e[1]*n-t[1],o=e[2]*n-t[2],Math.sqrt(i*i+a*a+o*o)):!1}},_rayRectangleIntersection:{value:function(e,t,n,r){var i,a,o,s,l,u=e[1]*r[2]-e[2]*r[1],c=e[2]*r[0]-e[0]*r[2],h=e[0]*r[1]-e[1]*r[0],d=n[0]*u+n[1]*c+n[2]*h,p=1e-10,m=!1;return-p>d?(i=-t[0]*u-t[1]*c-t[2]*h,0>i&&i>d&&(o=n[1]*t[2]-n[2]*t[1],s=n[2]*t[0]-n[0]*t[2],l=n[0]*t[1]-n[1]*t[0],a=e[0]*o+e[1]*s+e[2]*l,0>a&&a>d&&(m=(r[0]*o+r[1]*s+r[2]*l)/d,0>m&&(m=!1)))):d>p&&(i=-t[0]*u-t[1]*c-t[2]*h,i>0&&d>i&&(o=n[1]*t[2]-n[2]*t[1],s=n[2]*t[0]-n[0]*t[2],l=n[0]*t[1]-n[1]*t[0],a=e[0]*o+e[1]*s+e[2]*l,a>0&&d>a&&(m=(r[0]*o+r[1]*s+r[2]*l)/d,0>m&&(m=!1)))),m}},_rayRectangleIntersectionPosition:{enumerable:!1,value:function(e,t,n,r){var i,a,o,s,l,u=e[1]*r[2]-e[2]*r[1],c=e[2]*r[0]-e[0]*r[2],h=e[0]*r[1]-e[1]*r[0],d=n[0]*u+n[1]*c+n[2]*h,p=this._flow._boundingBoxSize;return i=-t[0]*u-t[1]*c-t[2]*h,o=n[1]*t[2]-n[2]*t[1],s=n[2]*t[0]-n[0]*t[2],l=n[0]*t[1]-n[1]*t[0],a=e[0]*o+e[1]*s+e[2]*l,[i*p[0]/d-.5*p[0],a*p[1]/d-.5*p[1],0]}},_rotateXYZ:{enumerable:!1,value:function(e,t){var n,r,i,a,o=Math.cos(t[0]),s=Math.sin(t[0]),l=Math.cos(t[1]),u=Math.sin(t[1]),c=Math.cos(t[2]),h=Math.sin(t[2]);return r=o*e[1]-s*e[2],i=s*e[1]+o*e[2],a=l*e[0]+u*i,i=-u*e[0]+l*i,n=c*a-h*r,r=h*a+c*r,[n,r,i]}},_pointerIntersectionPosition:{enumerable:!1,value:null},_closerIndex:{enumerable:!1,value:null},_computePointedElement:{value:function(){var e=this._flow._splinePaths,t=e.length;if(t){var n,r,i,a,o,s,l,u,c,h=this._flow,d=h.cameraTargetPoint[0]-h.cameraPosition[0],p=h.cameraTargetPoint[2]-h.cameraPosition[2],m=Math.atan2(d,p),f=p*Math.cos(-m)-d*Math.sin(-m),v=Math.atan2(h.cameraTargetPoint[1]-h.cameraPosition[1],f),g=.5*this._element.clientWidth-this._pointerX,_=this._pointerY-.5*this._element.clientHeight,b=.5*this._element.offsetHeight/Math.tan(h.cameraFov*h._doublePI*(1/720)),y=[],w=h._visibleIndexes,E=w.length,P=null,M=1e100;for(r=b*Math.cos(v)-_*Math.sin(v),_=b*Math.sin(v)+_*Math.cos(v),n=r*Math.cos(m)-g*Math.sin(m),g=r*Math.sin(m)+g*Math.cos(m),l=[g,_,n],c=0;e.length>c;c++)y[c]=e[c].transform([1,0,0,0,0,1,0,0,0,0,1,0,-h.cameraPosition[0],-h.cameraPosition[1],-h.cameraPosition[2],1]);for(c=0;E>c;c++)u=this._flow.offset(w[c]),i=u.pathIndex,a=u.slideTime,s=y[i]._convertSplineTimeToBezierIndexTime(a),null!==s&&(pos=y[i].getPositionAtIndexTime(s),o=this._rayPointDistance(l,pos),o!==!1&&M>o&&(M=o,P=w[c]));this._closerIndex=P}}},test:{enumerable:!1,value:function(){var e,t,n,r,i,a,o,s,l,u,c=this._flow,h=this._bezierValue,d=c.cameraTargetPoint[0]-c.cameraPosition[0],p=c.cameraTargetPoint[1]-c.cameraPosition[1],m=c.cameraTargetPoint[2]-c.cameraPosition[2],f=Math.atan2(d,m),v=this._pointerX,g=this._pointerY;if(e=m*Math.cos(-f)-d*Math.sin(-f),t=Math.atan2(p,e),r=.5*this._element.clientWidth-v,i=g-.5*this._element.clientHeight,u=a=.5*this._element.offsetHeight/Math.tan(c.cameraFov*c._doublePI*(1/720)),l=a*Math.cos(t)-i*Math.sin(t),s=a*Math.sin(t)+i*Math.cos(t),o=r,a=l*Math.cos(f)-o*Math.sin(f),r=l*Math.sin(f)+o*Math.cos(f),i=s,this.t=n=this._raycastBezierTubes(c._cameraPosition[0],c._cameraPosition[1],c._cameraPosition[2],this._computeRotationValuesToXAxis(r,i,a)),null!==n[0]){var r,i,a,o,s,l,_,b,y,w,E,P=[c._splinePaths[n[0]]._knots[n[1]][0]-c._cameraPosition[0],c._splinePaths[n[0]]._knots[n[1]][1]-c._cameraPosition[1],c._splinePaths[n[0]]._knots[n[1]][2]-c._cameraPosition[2],c._splinePaths[n[0]]._nextHandlers[n[1]][0]-c._cameraPosition[0],c._splinePaths[n[0]]._nextHandlers[n[1]][1]-c._cameraPosition[1],c._splinePaths[n[0]]._nextHandlers[n[1]][2]-c._cameraPosition[2],c._splinePaths[n[0]]._previousHandlers[n[1]+1][0]-c._cameraPosition[0],c._splinePaths[n[0]]._previousHandlers[n[1]+1][1]-c._cameraPosition[1],c._splinePaths[n[0]]._previousHandlers[n[1]+1][2]-c._cameraPosition[2],c._splinePaths[n[0]]._knots[n[1]+1][0]-c._cameraPosition[0],c._splinePaths[n[0]]._knots[n[1]+1][1]-c._cameraPosition[1],c._splinePaths[n[0]]._knots[n[1]+1][2]-c._cameraPosition[2]],M=[];for(E=0;12>E;E+=3)M[0]=P[E+2]*Math.sin(-f)+P[E]*Math.cos(-f),M[1]=P[E+1],M[2]=P[E+2]*Math.cos(-f)-P[E]*Math.sin(-f),P[E]=M[0],P[E+1]=M[2]*Math.sin(-t)+M[1]*Math.cos(-t),P[E+2]=M[2]*Math.cos(-t)-M[1]*Math.sin(-t);a=h(P[2],P[5],P[8],P[11],n[2]),l=h(P[2],P[5],P[8],P[11],n[2]+1e-8),r=h(P[0],P[3],P[6],P[9],n[2])/a,o=h(P[0],P[3],P[6],P[9],n[2]+1e-8)/l,_=(o-r)*u/1e-8,i=h(P[1],P[4],P[7],P[10],n[2])/a,s=h(P[1],P[4],P[7],P[10],n[2]+1e-8)/l,dy=(s-i)*u/1e-8,b=Math.sqrt(_*_+dy*dy),y=Math.atan2(dy,_),w=c._splinePaths[n[0]]._densities[n[1]]*(1-n[2])+c._splinePaths[n[0]]._densities[n[1]+1]*n[2],this._lineVectorX=Math.cos(-y)*b/w,this._lineVectorY=Math.sin(-y)*b/w}}},_lineVectorX:{enumerable:!1,value:80*Math.cos(Math.PI-.6)},_lineVectorY:{enumerable:!1,value:80*Math.sin(Math.PI-.6)},_startX:{enumerable:!1,value:0},_startY:{enumerable:!1,value:0},_currentX:{enumerable:!1,value:0},_currentY:{enumerable:!1,value:0},_previousScrollDelta:{enumerable:!1,value:0},_startScroll:{enumerable:!1,value:0},_bezierValue:{enumerable:!1,value:function(e,t,n,r,i){var a=1-i;return e*a*a*a+3*t*a*a*i+3*n*a*i*i+r*i*i*i}},_computeRotationValuesToXAxis:{enumerable:!1,value:function(e,t,n){var r,i,a,o,s;return 1e-100>e*e&&(e=1e-50),r=e*e+t*t,i=Math.sqrt(r),a=1/i,s=e*a,o=-t*a,a=1/Math.sqrt(r+n*n),[o,s,-n*a,i*a]}},_infinite:{enumerable:!1,value:1e100},_sphereIntersection:{enumerable:!1,value:function(e,t){var n,r,i,a=e[0]*t[1]-e[1]*t[0],o=e[0]*t[0]+e[1]*t[1],s=a*t[2]+e[2]*t[3],l=e[3]*e[3];return l>=o*o+s*s?(n=a*t[3]-e[2]*t[2],r=Math.sqrt(l-o*o-s*s),i=n-r,0>i?0>n+r?this._infinite:0:i):this._infinite}},_bezierTubeBoundingSphere:{enumerable:!1,value:function(e,t){var n,r,i,a,o,s=e[0],l=e[1],u=e[2],c=e[0],h=e[1],d=e[2];return o=e[3],s>o?s=o:o>c&&(c=o),o=e[4],l>o?l=o:o>h&&(h=o),o=e[5],u>o?u=o:o>d&&(d=o),o=e[6],s>o?s=o:o>c&&(c=o),o=e[7],l>o?l=o:o>h&&(h=o),o=e[8],u>o?u=o:o>d&&(d=o),o=e[9],s>o?s=o:o>c&&(c=o),o=e[10],l>o?l=o:o>h&&(h=o),o=e[11],u>o?u=o:o>d&&(d=o),n=.5*(c-s),r=.5*(h-l),i=.5*(d-u),a=Math.sqrt(n*n+r*r+i*i)+t,[s+n,l+r,u+i,a]}},_raycastBezierTubes:{enumerable:!1,value:function(e,t,n,r){var i,a,o,s,l,u,c,h,d,p,m,f,v,g,_,b,y,w,E,P,M,C,T,D,S,O,A,x,L=[],z=this._infinite,j=null,k=0,I=null,R=0,N=this._flow._splinePaths;for(x=0;N.length>x;x++)for(A=0;N[x]._knots.length-1>A;A++)L[R]=[N[x]._knots[A][0]-e,N[x]._knots[A][1]-t,N[x]._knots[A][2]-n,N[x]._nextHandlers[A][0]-e,N[x]._nextHandlers[A][1]-t,N[x]._nextHandlers[A][2]-n,N[x]._previousHandlers[A+1][0]-e,N[x]._previousHandlers[A+1][1]-t,N[x]._previousHandlers[A+1][2]-n,N[x]._knots[A+1][0]-e,N[x]._knots[A+1][1]-t,N[x]._knots[A+1][2]-n,0,1048576,A,x],R++;for(A=R-1;A>=0;)c=L[A],h=.5*(c[0]+c[3]),d=.5*(c[3]+c[6]),p=.5*(c[6]+c[9]),g=.5*(c[1]+c[4]),_=.5*(c[4]+c[7]),b=.5*(c[7]+c[10]),P=.5*(c[2]+c[5]),M=.5*(c[5]+c[8]),C=.5*(c[8]+c[11]),m=.5*(h+d),f=.5*(d+p),v=.5*(m+f),y=.5*(g+_),w=.5*(_+b),E=.5*(y+w),T=.5*(P+M),D=.5*(M+C),S=.5*(T+D),O=c[13]>>1,o=[c[0],c[1],c[2],h,g,P,m,y,T,v,E,S,c[12],O,c[14],c[15]],i=this._bezierTubeBoundingSphere(o,this._flow._elementsBoundingSphereRadius),s=[v,E,S,f,w,D,p,b,C,c[9],c[10],c[11],c[12]+O,O,c[14],c[15]],a=this._bezierTubeBoundingSphere(s,this._flow._elementsBoundingSphereRadius),l=this._sphereIntersection(i,r),u=this._sphereIntersection(a,r),z>l?z>u?u>l?O?(L[A++]=s,L[A]=o):(z=l-1e-5,k=c[12],j=c[14],I=c[15],A--):O?(L[A++]=o,L[A]=s):(z=u-1e-5,k=c[12],j=c[14],I=c[15],A--):O?L[A]=o:(z=l-1e-5,k=c[12],j=c[14],I=c[15],A--):z>u?O?L[A]=s:(z=u-1e-5,k=c[12],j=c[14],I=c[15],A--):A--;return[I,j,k*(1/1048576)]}},_translateStride:{enumerable:!1,value:null},translateStride:{serializable:!0,get:function(){return this._translateStride},set:function(e){this._translateStride=e,this.translateStrideX=e}},startStrideTime:{enumerable:!1,value:null},_scrollEnd:{enumerable:!1,value:null},_scrollStart:{enumerable:!1,value:null},_hasMomentum:{enumerable:!1,value:!0},isLimitedToSingleStride:{value:!1},_animationInterval:{enumerable:!1,value:function(){var e,t,n,r,i,a,o=Date.now(),s=!1;i=this.minScroll,a=this.maxScroll,this.minScroll=null,this.maxScroll=null,null===this._scrollEnd&&(this._scrollStart=this.scroll,this._pageX=this.endX,this._pageY=this.endY,this._updateScroll(),this._scrollEnd=this.scroll,this.isLimitedToSingleStride&&this.translateStrideX&&(this._scrollEnd>Math.floor(this._scrollStart)+this.translateStrideX&&(this._scrollEnd=Math.floor(this._scrollStart)+this.translateStrideX),this._scrollEnd<Math.ceil(this._scrollStart)-this.translateStrideX&&(this._scrollEnd=Math.ceil(this._scrollStart)-this.translateStrideX)),this._pageX=this.startX,this._pageY=this.startY,this._updateScroll()),this.animateMomentum?(e=o-this.startTime,this.__momentumDuration>e?(this._pageX=this.startX+(this.momentumX+this.momentumX*(this.__momentumDuration-e)/this.__momentumDuration)*e/1e3/2,this._pageY=this.startY+(this.momentumY+this.momentumY*(this.__momentumDuration-e)/this.__momentumDuration)*e/1e3/2,this._updateScroll(),this.translateStrideX&&null===this.startStrideXTime&&(this.__momentumDuration-e<this.translateStrideDuration||Math.abs(this.scroll-this._scrollEnd)<.75*this.translateStrideX)&&(this.startStrideXTime=o,this._strideStartScroll=this._scroll)):this.animateMomentum=!1):null===this.startStrideXTime&&(this.startStrideXTime=this.startTime,this._strideStartScroll=this._scrollStart),r=this.scroll,this.startStrideXTime&&o-this.startStrideXTime>0&&(n=Math.round(this._scrollEnd/this.translateStrideX),o-this.startStrideXTime<this.translateStrideDuration?(e=this._bezierTValue((o-this.startStrideXTime)/this.translateStrideDuration,.275,0,.275,1),t=(o-this.startStrideXTime)/this.translateStrideDuration,r=r*(1-t)+(n*this.translateStrideX*e+this._strideStartScroll*(1-e))*t,s=!0):(r=n*this.translateStrideX,this.animateMomentum=!1)),this.minScroll=i,this.maxScroll=a,i>r&&(r=i,this.animateMomentum=!1,s=!1),r>a&&(r=a,this.animateMomentum=!1,s=!1),this.scroll=r,this.isAnimating=this.animateMomentum||s,this.isAnimating?this.needsFrame=!0:(this._dispatchTranslateEnd(),this._scrollEnd=null)}}})}});