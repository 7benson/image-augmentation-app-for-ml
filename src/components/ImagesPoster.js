import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from "@material-ui/core";
import axios from "axios"
import apiUrl from "../../config";
import {modelClasses} from "../../config";
import TextField from '@material-ui/core/TextField';
// import userActions from "../_actions/userActions" classes

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const UploadForm=({onFileChange})=>(
  <form
    style={{"height":"100%"}}
    encType="multipart/form-data"
  >
    <label htmlFor="file"
    style={{
      height:"100%",
      width:"100%",
      display:"flex",
      alignItems:'center',
      justifyContent: "space-around",
      fontSize:"2.1rem",
      fontWeight:"600",
      letterSpacing:"10px"
    }}
    >UPLOAD </label>
    <input
      style={{"display":"none","outline":"none","border":"none","padding":"6px 12px","cursor":"pointer","width":"100%","textAlignLast":"center","flexDirection":"column"}}
      type="file" className="form-control" id="file" name="file"
      accept="image/*"
      onChange={onFileChange}
      multiple
    />
  </form>
)



const ImagesPoster =()=>{
    const classes = useStyles();
    const [classNameDropDown, setClassNameDropDown] = React.useState('');
    const [selectedFile,setSelectedFiles]=useState([])
    const [classNameTextfield,setClassNameTextfield]=useState('')

    const handleDDChange = (event) => {
      setClassNameDropDown(event.target.value);
    };
    const handleTFChange = (event) => {
      setClassNameTextfield(event.target.value);
    };
  
    useEffect(() => {
      console.log({selectedFile})
    }, [selectedFile])

    const onFileChange = event => {
      let temp=[]
      console.log(event.target.files)
      Object.keys(event.target.files).map((item)=>{
        temp.push(event.target.files[item])
      })
      setSelectedFiles(temp)
    };

    const removeFile=(value)=>{
      let temp=selectedFile
      temp=temp.filter(function(item) {
        return item !== value
      })
      setSelectedFiles(temp)
    }

    const Submit=async ()=>{

        var data = new FormData();
        selectedFile?.map((file)=>{
            data.append("file",file);
        })
        
        if(classNameTextfield!==""){
          data.append("class",classNameTextfield)
        }
        data.append("class",classNameDropDown)

        await axios.post(`${apiUrl}/upload`,data,{
            headers: {
                "Content-Type":"application/json",
              'Access-Control-Allow-Origin': true,
            }})
        .then(resp1=>{
            console.log('Upload FIle Response',{resp1})
            setSelectedFiles([])
            if(classNameTextfield!==""){
              alert(`${resp1.data},"to the class",${classNameTextfield}`)
              return
            }

            alert(`${resp1.data},to the class,${classNameDropDown}`)

        })
        .catch(err=>{ console.log(err)})
    }
    return(
        <div
        className="top"
        style={{
            width: "99vw",
            height: "100vh",
            display: "flex",
            backgroundColor: "lightgrey",
            // margin:"50px",
          }}
        >
            <div
              className="options"
              style={{
                margin:"auto",
                padding:"20px",
              }}
            >
              <div
              style={{
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                placeContent: "space-around",
                padding: "50px",
              }}
              padding>
                <FormControl className={classes.formControl}>
                  <Select
                    value={classNameDropDown}
                    onChange={handleDDChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Choose Existing Class
                    </MenuItem>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                    {Object.keys(modelClasses)?.map((item,index)=>{
                      return(
                        <MenuItem id={index} value={modelClasses[item]}>{modelClasses[item]}</MenuItem>
                      )
                    })}
                  </Select>
                  <FormHelperText>Placeholder</FormHelperText>
                </FormControl>
                
                <TextField
                value={classNameTextfield}
                onChange={handleTFChange}
                id="outlined-search" label="Class Name" type="text" variant="outlined" />
                
              </div>
            </div>

            <div
            style={{
              margin:"auto",
              textAlign: "-webkit-center",
            }}
            >

            <div
              style={{
                height:"48vh",
                width:"48vw",
                border:"3px solid grey",
                margin:"auto",
                borderRadius:"20px"
              }}
              className="uploadbox"
            >
              {selectedFile?.length ==0 ?<UploadForm onFileChange={onFileChange}/>
              :
              <div 
              style={{
                display:"flex",
                flexDirection:"column",
                overflowX:"hidden",
                overflowY:"scroll",
                height:"100%",
                alignItems: 'center'
              }}
              >
                {
                  selectedFile?.map((file,index)=>{
                    return(
                      <Button
                      style={{
                        display:"flex",

                      }}
                      >
                        <img
                        style={{
                          height:"100px",
                          width:"100px",
                          objectFit:"contain"
                        }}
                        src={URL.createObjectURL(file)} />
                      <div>&nbsp;&nbsp;&nbsp;{file.name}<Button onClick={()=>removeFile(file)} >X</Button></div>
                      </Button>
                    )
                  })
                }
              </div>  
            }
            </div>
            { selectedFile?.length!==0 &&  
            <Button 
            color="primary"
            style={{
              marginTop:"20px"
            }}
            onClick={Submit}>Submit</Button>}
            </div>
        </div>
    )
}
export default ImagesPoster
