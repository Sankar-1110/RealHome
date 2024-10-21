import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { signInFailed,signInSuccess ,signInstart} from "../redux/user/userSlice";
import { useSelector,useDispatch } from "react-redux";
import Auth from "../components/oAuth.jsx";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export const Signin=()=>{
    const [signinData,setInData]=useState({});
   const{loading,error}=useSelector((state)=>state.user);
    const[iferror,setIferror]=useState(false);
    const dispatch=useDispatch();

    const navigate=useNavigate();
    const signinhandle=(e)=>{
        setInData({
            ...signinData,
            [e.target.id]:e.target.value
        })
    }
    const submitInhandle=async(e)=>{
        e.preventDefault();
       dispatch(signInstart());
        const response=await fetch('/api/auth/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
           body:JSON.stringify(signinData)
        })
        const result= await response.json();

        if(response.ok){
            console.log(result);
            dispatch(signInSuccess(result))
            navigate('/')
            
            }
            if(!response.ok){
                setIferror(true);
              dispatch(signInFailed(result.message))
               console.log(error);
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
           <h1 className="text-center font-semibold text-3xl">Login</h1>
           <form action="" className="flex flex-col my-5 gap-4" onSubmit={submitInhandle}>
            <input type="email"   
            placeholder="Email"   id="email" className="p-3 border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 " onChange={signinhandle}/>
            <div className="border rounded-lg focus-within:border-blue-500 focus-within:ring-2 flex justify-between pr-2">
            <input   type={showPassword ?  'password':'text'}
            placeholder="Password" id="password" className="p-3  focus:outline-none w-full " onChange={signinhandle}/>
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className="focus:outline-none p-2"
          >
            {showPassword ? <FaEyeSlash className="text-xl"/> : <FaEye className="text-xl"/>}
          </button></div>
            <button className="p-3 border rounded-lg  bg-blue-500 text-white hover:opacity-95 ">Login</button>
            <p className="text-center font-semibold">-------------- or ---------------</p>
          <Auth/>
           </form>
           <div className="flex gap-3">
            <p>Don't have an account? </p>
            <Link to="/signup" className="text-blue-600">Sign up</Link>
           </div>
           <div className="p-3 text-red-600">
            {iferror?<p>{error}</p>:null}
           </div>
        </div>
    )
}