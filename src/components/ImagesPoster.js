import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

 
const ImagesPoster =()=>{
    const classes = useStyles();
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
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
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Placeholder
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Placeholder</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Placeholder
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Placeholder</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Placeholder
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Placeholder</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div
              style={{
                height:"48vh",
                width:"48vw",
                border:"3px solid black",
                margin:"auto",
              }}
              className="uploadbox"
            >
              <h1>Upload</h1>
            </div>
        </div>
    )
}
export default ImagesPoster
