import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import * as authActions from '../../actions/authActions';
import { isLoaded } from 'react-redux-firebase'
import { useNavigate } from "react-router";

  function Login(props) {
    let navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    useEffect(() => {
      if(props.authFirebase?.uid){
        navigate('/')
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])
const handleEmail= (e)=>{
setEmail(e.target.value);
}
const handlePassword=(e)=>{
  setPassword(e.target.value);
}
    const onSubmit=()=>{
    
      let obj = {email:email,password:password}
      props.signIn(obj)
    }


    return (
      <>
      {!isLoaded(props.authFirebase)?<></>:
      <>
      {props.authMine?.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are logging you in</h4>:
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
                    <h2 className="form-heading center">Enter Login details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={email || ''}  onChange={handleEmail}  /><span></span>
                            </div>
                        </div>

                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={password || ''} onChange={handlePassword}/><span></span>
                            </div>
                        </div>
                        {props.authMine?.ErrorMessage?.message?<div className="input-group full">
                                <span className="error-message" >{props.authMine?.ErrorMessage?.message}</span> 
                        </div> :<></>}  
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Login</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  }
  </>
  }
        </>

        
    );
  }

const mapStateToProps =(state)=>{
  return{
    authMine:state.auth,
    authFirebase:state.firebase.auth
  }
}
const mapDispatchToProps = dispatch=>{
  return{
  signIn:(userData)=>dispatch(authActions.signIn(userData))
  }
}

 


  export default  connect(mapStateToProps,mapDispatchToProps)(Login)