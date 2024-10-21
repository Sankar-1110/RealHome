import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom';
import Auth from "../components/oAuth.jsx";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    return(
        <div className="max-w-md my-40  mx-auto p-5 rounded-xl bg-white shadow-2xl shadow-blue-400 ">
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
            <input type="text"    placeholder="Username"id="username"  className="border p-3 rounded-lg  focus:outline-none focus:border-blue-500 focus:ring-2  " onChange={handleinput}/>
            <input type="email"   placeholder="Email"   id="email" className="border p-3 rounded-lg 
            focus:outline-none focus:border-blue-500 focus:ring-2 "     onChange={handleinput}/>
            <div className="border rounded-lg focus-within:border-blue-500 focus-within:ring-2  flex justify-between pr-2">
            <input   type={showPassword ?  'password':'text'}
            placeholder="Password" id="password" className="p-3  focus:outline-none w-full " onChange={handleinput}/>
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className="focus:outline-none p-2"
          >
            {showPassword ? <FaEyeSlash className="text-xl"/> : <FaEye className="text-xl"/>}
          </button></div>
            <button type="submit" className="border p-3 rounded-lg bg-blue-500 text-white hover:opacity-95 ">{loading?'Loading...':'SignUp'}</button>
            <p className="text-center font-semibold">-------------- or ---------------</p>
            <Auth/>
          </form> 
          <div className="flex gap-3"> 
          <p>Have an account?</p>
          <Link to="/signin" className="text-blue-700">Sign in</Link>
          </div>
                
        </div>
    )
}