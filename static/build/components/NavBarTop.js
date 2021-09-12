import NavBar,{ContentGroup}from"./NavBar.js";const{useEffect,useState}=React,initialMode=window.darkMode,themeColours={background:["","#faebd7"],link:["","rgb(87, 158, 132)"],rowBackground:["#002025",""]};function Nav(){const[a,b]=useState(initialMode);window.darkMode!==a&&b(window.darkMode),useEffect(()=>{window.swapCall=b.bind(this)},[b]);const c={};for(const[b,d]of Object.entries(themeColours))c[b]=d[+a];return/*#__PURE__*/React.createElement(React.Fragment,null,/*#__PURE__*/React.createElement(NavBar,{id:"navbar-pro",contentBackground:c.rowBackground,debug:!0,contentTop:"-2"},/*#__PURE__*/React.createElement(ContentGroup,{as:"a",className:"navbar-brand",title:FLASK_SESSION.loggedin?FLASK_SESSION.name:"GoCoronaGo",rootUrl:"/"}),/*#__PURE__*/React.createElement("div",{className:"navbar-collapse"},/*#__PURE__*/React.createElement(ContentGroup,{title:"Accounts",width:"300",height:"100",opts:FLASK_SESSION.loggedin?[["/dashboard","Dashboard"],["/logout","Log Out"]]:[["/login","Login"],["/register","Register"]]}),/*#__PURE__*/React.createElement(ContentGroup,{title:"Stats",width:"300",height:"100",opts:[["/stats","Stats"],["/hospitals","Hospitals"]]}),/*#__PURE__*/React.createElement(ContentGroup,{title:"Blogs",width:"300",height:"100",opts:[["/blog","View Blogs"],["/add_blog","Add Blog"]]}))))}export default Nav;
//# sourceMappingURL=NavBarTop.js.map