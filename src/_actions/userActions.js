import axios from "axios"
import config from "../../config"
const userActions={
    // uploadFile
}
// async function uploadFile({data}){
//     const fileData =data.fileData
//     var class = data.class
//     var data = new FormData();
//     fileData?.map((file)=>{
//         data.append("file",file);
//     })
//     await axios.post(`${config.apiUrl}/upload`,data,{
//         headers: {
//             "Content-Type":"application/json",
//           'Access-Control-Allow-Origin': true,
//         }})
//     .then(resp1=>{
//         console.log('Upload FIle Response',{resp1})
//     })
//     .catch(err=>{ localStorage.clear();})
// }
export default userActions