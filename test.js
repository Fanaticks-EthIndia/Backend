//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ZmU0MDI5Zi03MzMzLTQ3NjAtODdkZi0wNzJlNTQ4ODk4ZWQiLCJlbWFpbCI6Imh1cm1hYW4xMjNhaG1lZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2U3ZjQwYTZmZmJjOGU4MTQyMWQiLCJzY29wZWRLZXlTZWNyZXQiOiI3NzdhNTdlOTRkMTJkMWFmZTdhZjAzN2I0MDM2MmY0ZGFmODRlMWE5OGUyYzNhMDMyMTYwN2QwZjYxYTIwMmE0IiwiaWF0IjoxNzAyMTAxMDgwfQ.v5p38HrrL9bt1RYz2FXrEXKV3TsON9WuMJbmnQXFoog

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ZmU0MDI5Zi03MzMzLTQ3NjAtODdkZi0wNzJlNTQ4ODk4ZWQiLCJlbWFpbCI6Imh1cm1hYW4xMjNhaG1lZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDA3ZWIwMDBmZDExODEwYTYwNjgiLCJzY29wZWRLZXlTZWNyZXQiOiJkZmE1MmU0NmIyNTEwMGE3OWRhNmRiMDc1ZWNlNTkyOTIyNGNiZWIxMWE0ZmQyNWE1ZjdmNDJmOTBhYjZlMjgxIiwiaWF0IjoxNzAyMTAxMTE2fQ.MxOZADsjJJ3Ft4fLi-Jt5c8wye06xY0ebQbLMazKXjY

//https://aqua-adjacent-bonobo-935.mypinata.cloud

const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ZmU0MDI5Zi03MzMzLTQ3NjAtODdkZi0wNzJlNTQ4ODk4ZWQiLCJlbWFpbCI6Imh1cm1hYW4xMjNhaG1lZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2U3ZjQwYTZmZmJjOGU4MTQyMWQiLCJzY29wZWRLZXlTZWNyZXQiOiI3NzdhNTdlOTRkMTJkMWFmZTdhZjAzN2I0MDM2MmY0ZGFmODRlMWE5OGUyYzNhMDMyMTYwN2QwZjYxYTIwMmE0IiwiaWF0IjoxNzAyMTAxMDgwfQ.v5p38HrrL9bt1RYz2FXrEXKV3TsON9WuMJbmnQXFoog

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()


// const axios = require('axios')
// const FormData = require('form-data')
// const fs = require('fs')
// const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ZmU0MDI5Zi03MzMzLTQ3NjAtODdkZi0wNzJlNTQ4ODk4ZWQiLCJlbWFpbCI6Imh1cm1hYW4xMjNhaG1lZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDA3ZWIwMDBmZDExODEwYTYwNjgiLCJzY29wZWRLZXlTZWNyZXQiOiJkZmE1MmU0NmIyNTEwMGE3OWRhNmRiMDc1ZWNlNTkyOTIyNGNiZWIxMWE0ZmQyNWE1ZjdmNDJmOTBhYjZlMjgxIiwiaWF0IjoxNzAyMTAxMTE2fQ.MxOZADsjJJ3Ft4fLi-Jt5c8wye06xY0ebQbLMazKXjY

// const pinFileToIPFS = async () => {
//     const formData = new FormData();
//     const src = "path/to/file.png";
    
//     const file = fs.createReadStream(src)
//     formData.append('file', file)
    
//     const pinataMetadata = JSON.stringify({
//       name: 'File name',
//     });
//     formData.append('pinataMetadata', pinataMetadata);
    
//     const pinataOptions = JSON.stringify({
//       cidVersion: 0,
//     })
//     formData.append('pinataOptions', pinataOptions);

//     try{
//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         maxBodyLength: "Infinity",
//         headers: {
//           'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//           'Authorization': `Bearer ${JWT}`
//         }
//       });
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
// }
// pinFileToIPFS()
