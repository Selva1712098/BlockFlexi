import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import './pay.css';
// import axios from "axios";
function Pay(){
  // const[schemeId,setSchemeId]=useState([])
  // const[schemes,setSchemes]=useState([])
  // const handleSchemes = (data) => {
  //   console.log('id',data)
  //   if (data && data.length > 0) {
  //     setSchemeId([...data]);
  //   } else {
  //     setSchemeId([]);
  //   }
  // };
  
  // const handleSchemeName=(data)=>{
  // console.log('datas:',data)
  // if (data && data.length > 0) {
  //   setSchemes([...data]);
  // } else {
  //   setSchemes([]);
  // }
  
  // }
     
  //     useEffect(()=>{
  //       async function getSchemeID(){
  //         try{
  //           await axios.post('http://localhost:5000/GetSchemeID',{
  //             jewellerid,
  //             customerid
  //             }).then(res=>{
  //               if(res.data ){
  //                // console.log('inside use effect', res.data.schemecheck)
  //                 handleSchemes(res.data.schemecheck)
              
                
  //               }
               
  //               else{
  //                 console.log("Could not get your Scheme")
  //               }
               
  //             })
  //         }catch(e){
  //           console.log(e)
  //         }
         
          
  //       }
  //       getSchemeID()})
  //       useEffect(() => {
  //         async function getScheme() {
  //           const schemeIds = schemeId.map(scheme => scheme.SchemeID);
  //           try {
  //             const promises = schemeIds.map(id =>
  //               axios.post('http://localhost:5000/GetScheme', { schemeid: id })
  //             );
  //             const responses = await Promise.all(promises);
  //             const schemes = responses.map(res => res.data.schemecheck);
  //             handleSchemeName(schemes);
  //           } catch (e) {
  //             console.log(e);
  //           }
  //         }
  //         getScheme();
  //       }, [schemeId]);
    return(
        <div>
            
            <div className="row">
            {/* {schemes && schemes.map((scheme)=>( */}
  <div className="column">
    <div className="card"><h2>your scheme 1</h2>
    <p>scheme details</p>
    <button>Pay</button>
    </div>
  </div>
            {/* ))} */}
  </div>
  </div>
    )
}
export default Pay;