import Nav from"./components/NavBarTop.js";const{render,unmountComponentAtNode}=ReactDOM;let target,oldNav,showNav=!1;document.addEventListener("DOMContentLoaded",()=>{renderNav(),window.onresize=renderNav});function renderNav(){target||=document.getElementById("navBar-react"),oldNav||=document.querySelectorAll(".navbar-normal");const a=window.matchMedia("(min-width: 768px)")?.matches;return a?showNav?void 0:(showNav=!0,oldNav.forEach(a=>{a.style.display="none",a.style.visibility="hidden"}),target.style.display="flex",render(/*#__PURE__*/React.createElement(Nav,null),target)):void(oldNav.forEach(a=>{a.style.removeProperty("display"),a.style.removeProperty("visibility")}),target.style.display="none",unmountComponentAtNode(target),showNav=!1)}
//# sourceMappingURL=navbar.js.map