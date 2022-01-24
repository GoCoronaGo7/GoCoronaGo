import PaginatedDisplay from"./Paginator.js";export default function Patients({patients:a}){async function b(a){const b=await c({patient_name:a,completed:!0}).catch(console.error);200===b.status&&window.location.reload()}function c(a){return fetch("/dashboard/request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})}return/*#__PURE__*/React.createElement("div",{className:"window patients"}," ",/*#__PURE__*/React.createElement(PaginatedDisplay,{data:a.sort(b=>"pending"===b.status?-1:1),click:b,makeComponent:a=>/*#__PURE__*/React.createElement(TableItem,{data:a,click:b,addDetails:async a=>{const b=prompt("Enter note:",""),d=await c({patient_name:a,note:b}).catch(console.error);200===d.status&&window.location.reload()},key:a.patient_username})})," ")}function TableItem({data:a,click:b,addDetails:c}){const{patient_username:d,time:e,status:f,details:g}=a,h=new Date(+e),{meet_id:i}=window.metadata.doctor;return/*#__PURE__*/React.createElement("div",{className:"doctor patient",key:d},/*#__PURE__*/React.createElement("div",{className:"doctorProfile"},/*#__PURE__*/React.createElement("div",{className:"image"}," ",/*#__PURE__*/React.createElement("object",{data:"/static/images/doctor.svg","aria-label":"admin"})," "),/*#__PURE__*/React.createElement("span",null,d)),/*#__PURE__*/React.createElement("div",{className:"doctorDetails"},/*#__PURE__*/React.createElement("span",null,"Time: ",h.toString().split("GMT")[0]),/*#__PURE__*/React.createElement("span",null,"Details: ",g)),/*#__PURE__*/React.createElement("div",{className:"bookingButton bookingControl"},"pending"===f?/*#__PURE__*/React.createElement(React.Fragment,null,/*#__PURE__*/React.createElement("button",{className:"btn btn-primary btn-block"},/*#__PURE__*/React.createElement("a",{href:"https://meet.google.com/"+i},"Join Meet")),/*#__PURE__*/React.createElement("button",{className:"btn btn-primary btn-block",onClick:()=>c(d)},"Add Note"),/*#__PURE__*/React.createElement("button",{className:"btn btn-primary btn-block",onClick:()=>b(d)},"Mark as complete")):/*#__PURE__*/React.createElement("div",{className:"block-cursor"},/*#__PURE__*/React.createElement("button",{className:"btn btn-primary btn-block finished",disabled:!0}," ","Marked Complete"))))}