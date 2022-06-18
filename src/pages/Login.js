import { useState } from 'react';
import { NavLink,useNavigate,useLocation  } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { NavBarBrands } from '../components/NavBarBrands';
import { useAuth } from '../contexts/auth-context';
import axios from "axios";


export const Login = ()=> {
    const { setIsLoggedIn } = useAuth();
    const [credentials,setCredentials] = useState({email: "", password : ""})
    const navigate = useNavigate();
    const location = useLocation()
    const from = location?.state?.from.pathname || "/";

    const loginHandler = async (e,email,password)=>{ 
        setCredentials({email,password})
        e.preventDefault();
        console.log("entered email",email,"entered password",password);
        try{
            const res = await axios.post(`/api/auth/login`, {
                email,
                password
            })
            console.log(res)
            if (res.status === 200){
                localStorage.setItem("token", res.data.encodedToken);
                setIsLoggedIn((login)=> !login)
            }
            
            navigate(from, { replace: true });
        }
        catch(error){
            console.log(error)
        }

    }



    return (
        <>
        <NavBar />
        <hr/>
        <NavBarBrands/>
        <hr/>
        <div className="container-sign-in justify-center align-center">
            <form className="form-sign-in" onSubmit={(e)=>loginHandler(e,credentials.email,credentials.password)} >
                <div className="heading-sign-in t3 bold">LOGIN</div><hr/>
                <div className="sub-heading-sign-in light">Enter your details.</div><hr/>
                <div className="input-box-sign-in">
                    <input type="text" placeholder="Email"  onChange={(e)=>setCredentials((a)=>({...a, email: e.target.value}))} />
                    <input type="password" placeholder="Password" onChange={(e)=>setCredentials((a)=>({...a, password: e.target.value}))} />
                </div>
                <div className="btn-box-sign-in">
                    <input type = "submit" value = "LOG IN" className="btn btn-sign-in"/>
                </div>
                <div className="login-text"> 
                <NavLink to="/signin">Don't have an account?<span className="login-text" >Create here..</span>
                </NavLink>
                </div>
                <hr/>
                <div className="login-text-other-ways flex-column">
                    other ways to login
                    <div className="auth-icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="google-icon" alt="Google"/>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}