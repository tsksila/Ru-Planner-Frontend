import React from "react";
import { useState } from "react";
import Popup from "../../components/Popup";
import Controls from "../../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import RegisterForm from "./registerForm";


function Register() {
  
  const [openPopup, setOpenPopup] = useState(false);
  return (
    
<div> 
      <Controls.Button
        text="สมัครสามชิก"
        variant="outlined"
        startIcon={<AddIcon />}
        //className={classes.newButton}
        onClick={() => setOpenPopup(true)}
      />
      <Popup
        title="สมัครสมาชิก"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}

      >
        <RegisterForm/>
      </Popup >
    </div>
  );
}



export default Register;
