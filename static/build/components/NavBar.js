function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}/* eslint-disable react/prop-types */import Dropdown from"./Dropdown.js";const{useMemo}=React;export default function NavBar({children:a}){const b=useMemo(()=>a.map(a=>a),[a]);return/*#__PURE__*/React.createElement(React.Fragment,null,b)}NavBar.propTypes={children:PropTypes.array};export function ContentGroup({opts:a,title:b,rootUrl:c,...d}){const[e,f]=useMemo(()=>a?a.filter(Boolean).reduce((a,b)=>[[...a[0],b[1]],[...a[1],b[0]]],[[],[]]):[[],[]],[a]);return a?/*#__PURE__*/React.createElement(Dropdown,{baseClassName:"NavDropDown",changeOnClick:!1,value:b,onChange:({value:a})=>{window.location=f[e.indexOf(a)]},options:e}):/*#__PURE__*/React.createElement("a",_extends({href:c},d),b," ")}
//# sourceMappingURL=NavBar.js.map