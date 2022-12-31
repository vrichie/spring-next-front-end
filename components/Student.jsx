import React, { useState ,useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [student, setStudent] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("student added");
    });
  };
  useEffect(() => {
    fetch("http://localhost:8080/getAll")
    .then((res) => res.json())
    .then((data)=>{setStudent(data);console.log("data",data)});
   
  }, [])
  
  return (
    <Container>
      <br />
      <Paper elavation={3}>
        <h1>Add student</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Student name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <TextField
            id="standard-basic"
            label="Student address"
            variant="standard"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            send
          </Button>
        </Box>
      </Paper>
      <br/>
      <Paper elavation={3}>
        <h1>students</h1>
          {
            student==null?
              <>loading</>
            
            :
              student.map((s,i)=>(
                <Paper elavation={6} key={i}>
                    Id:{s.id}<br/>
                    Name:{s.name}<br/>
                    Address:{s.address}<br/>
                </Paper>
            ))
            
            
          }
      </Paper>
    </Container>
  );
}
