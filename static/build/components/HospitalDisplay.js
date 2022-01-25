function a(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=new Array(b);c<b;c++)d[c]=a[c];return d}function b(a,b){return(function(a){if(Array.isArray(a))return a})(a)||(function(a,b){var c,d,e=null==a?null:"undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=e){var f=[],g=!0,h=!1;try{for(e=e.call(a);!(g=(c=e.next()).done)&&(f.push(c.value),!b||f.length!==b);g=!0);}catch(i){h=!0,d=i}finally{try{g||null==e.return||e.return()}finally{if(h)throw d}}return f}})(a,b)||b(a,b)||(function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")})()}var c=React.useState,d=React.useEffect,e={start:function(a,b,c){return!(1>=a)&&(c&&b(1),!0)},previous:function(a,b,c){return 1!==a&&(c&&b(a-1),!0)},next:function(a,b,c,d){return!(a>=d)&&(c&&b(a+1),!0)},end:function(a,b,c,d){return a!==d&&(c&&b(d),!0)}};export default function f(a){var e=a.hospitals,f=b(c(1),2),i=f[0],j=f[1],k=(0,Math.ceil)(e.length/15);return d(function(){j(1)},[j,e.length]),React.createElement("div",{id:"hospitalsDisplay"},React.createElement(g,{page:i,setPage:j,maxPages:k}),React.createElement(h,{hospitals:e,page:i}))};function g(a){var c=a.page,f=a.setPage,g=a.maxPages;return d(function(){var a=[],d=!0,h=!1,i=void 0;try{for(var j,k=function(d,e){var h,i=b(d.value,2),j=i[0],k=i[1],l=document.getElementById("nav-".concat(j)),m=(h=k,function(){h(c,f,!0,g)});l.addEventListener("click",m),a.push([l,m])},l=Object.entries(e)[Symbol.iterator]();!(d=(j=l.next()).done);d=!0)k(j,l)}catch(m){h=!0,i=m}finally{try{d||null==l.return||l.return()}finally{if(h)throw i}}return function(){var c=!0,d=!1,e=void 0;try{for(var f,g=a[Symbol.iterator]();!(c=(f=g.next()).done);c=!0){var h=b(f.value,2),i=h[0],j=h[1];i.removeEventListener("click",j)}}catch(k){d=!0,e=k}finally{try{c||null==g.return||g.return()}finally{if(d)throw e}}}}),d(function(){var a=!0,d=!1,h=void 0;try{for(var i,j=function(a,d){var e,h=b(a.value,2),i=h[0],j=h[1],k=document.getElementById("nav-".concat(i)),l=(e=j,function(){return e(c,f,!1,g)});l()?k.removeAttribute("disabled"):k.setAttribute("disabled","disabled")},k=Object.entries(e)[Symbol.iterator]();!(a=(i=k.next()).done);a=!0)j(i,k)}catch(l){d=!0,h=l}finally{try{a||null==k.return||k.return()}finally{if(d)throw h}}},[c,f,g]),React.createElement("div",{id:"navigator"},React.createElement("button",{id:"nav-start"}," ",React.createElement("img",{src:"https://github.com/google/material-design-icons/raw/master/ios/av/fast_rewind/materialicons/black/baseline_fast_rewind_black_48pt.xcassets/baseline_fast_rewind_black_48pt.imageset/baseline_fast_rewind_black_48pt_3x.png",alt:"start"})),React.createElement("button",{id:"nav-previous"}," ",React.createElement("img",{style:{transform:"translateX(5px)"},src:"https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_back_ios/materialicons/black/baseline_arrow_back_ios_black_48pt.xcassets/baseline_arrow_back_ios_black_48pt.imageset/baseline_arrow_back_ios_black_48pt_3x.png",alt:"previous"})),React.createElement("button",{id:"nav-current",style:{display:"flex",width:"60px",justifyContent:"center"}}," ",c," "),React.createElement("button",{id:"nav-next"}," ",React.createElement("img",{src:"https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_forward_ios/materialicons/black/baseline_arrow_forward_ios_black_48pt.xcassets/baseline_arrow_forward_ios_black_48pt.imageset/baseline_arrow_forward_ios_black_48pt_3x.png",alt:"next"})),React.createElement("button",{id:"nav-end"}," ",React.createElement("img",{src:"https://github.com/google/material-design-icons/raw/master/ios/av/fast_forward/materialicons/black/baseline_fast_forward_black_48pt.xcassets/baseline_fast_forward_black_48pt.imageset/baseline_fast_forward_black_48pt_3x.png",alt:"end"})))}function h(b){var c,e=b.hospitals,f=b.page;return d(function(){document.getElementById("hospitalsTable").scrollTop=0},[e.length,f]),React.createElement("div",{id:"hospitalsTable"},React.createElement("div",{className:"hospitalTableRow header"},React.createElement("span",{className:"hospitalName"},"\xa0"),React.createElement("span",{className:"statsCell"}," Normal Beds "),React.createElement("span",{className:"statsCell"}," Oxygen Beds "),React.createElement("span",{className:"statsCell"}," ICU Units "),React.createElement("span",{className:"statsCell"}," Ventilator Units ")),((function(a){if(Array.isArray(a))return a(a)})(c=e)||(function(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)})(c)||(function(b,c){if(b){if("string"==typeof b)return a(b,c);var d=Object.prototype.toString.call(b).slice(8,-1);if("Object"===d&&b.constructor&&(d=b.constructor.name),"Map"===d||"Set"===d)return Array.from(d);if("Arguments"===d||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d))return a(b,c)}})(c)||(function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")})()).splice((f-1)*15,15).map(function(a){return React.createElement(i,{key:a.hospital_name,data:a})}))}function i(a){var c=a.data;if(!c)return null;var d={normal:[c.available_beds_without_oxygen,c.total_beds_without_oxygen],oxygen:[c.available_beds_with_oxygen,c.total_beds_with_oxygen],icu:[c.available_icu_beds_without_ventilator,c.total_icu_beds_without_ventilator],vent:[c.available_icu_beds_with_ventilator,c.total_icu_beds_with_ventilator]},e=[],f=!0,g=!1,h=void 0;try{for(var i,k=Object.entries(d)[Symbol.iterator]();!(f=(i=k.next()).done);f=!0){var l=b(i.value,2),m=l[0],n=l[1];e.push(React.createElement("span",{key:m,className:"statsCell statsDisplayCell "+j(n)},n[0],"/ ",n[1]))}}catch(o){g=!0,h=o}finally{try{f||null==k.return||k.return()}finally{if(g)throw h}}return React.createElement("div",{className:"hospitalTableRow"},React.createElement("div",{className:"hospitalName"},React.createElement("div",null,React.createElement("span",{className:"left"}," ",c.hospital_name," ")),React.createElement("span",{className:"region"}," ",c.area," ")),e)}function j(a){return -1===a[0]|| -1===a[1]?(a[0]="?",a[1]="?","orange"):0===a[0]?"red":a[0]===a[1]?"green":"orange"}