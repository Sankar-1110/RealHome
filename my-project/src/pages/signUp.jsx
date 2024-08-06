import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom';
import Auth from "../components/oAuth.jsx";

export const SignUp=()=>{
    const[formData,setformdata]=useState({});
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const[iferror,setIferror]=useState(false);
    const[success,setSuccess]=useState(false);
    const navigate= useNavigate();
    const handleinput=(e)=>{
        e.preventDefault();
           setformdata({
            ...formData,
            [e.target.id]:e.target.value,
           });
    }
    console.log(formData);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);

        const response= await fetch('/api/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        })
        const result= await response.json();
    
        if(response.ok){
        console.log(result);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
        navigate('/signin')
        
        }
        if(!response.ok){
            setIferror(true);
           setError(result.message);
           setLoading(false);
           setTimeout(() => {
            setIferror(false);
           }, 3000);
        }
    }
    return(
        <div className=" mt-32 p-3 max-w-lg  mx-auto">
            {iferror?
            <div className=" p-3 bg-red-700 text-white font-medium">
                {error}
            </div>:null}
            {success?
            <div className=" p-3 bg-green-400 text-green-800 font-medium">
                Successfully signed up
            </div>: null}
          <h1 className="text-3xl text-center font-semibold ">SignUp</h1>
          <form action="" onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 my-5">
            <input type="text"    placeholder="Username"id="username"  className="border p-3 rounded-lg " onChange={handleinput}/>
            <input type="email"   placeholder="Email"   id="email" className="border p-3 rounded-lg "     onChange={handleinput}/>
            <input type="password"placeholder="Password"id="password" className="border p-3 rounded-lg "  onChange={handleinput}/>
            <button type="submit" className="border p-3 rounded-lg bg-slate-600 text-white hover:opacity-95 ">{loading?'Loading...':'SignUp'}</button>
            <Auth/>
          </form> 
          <div className="flex gap-3"> 
          <p>Have an account?</p>
          <Link to="/signin" className="text-blue-700">Sign in</Link>
          </div>
                
        </div>
    )
}