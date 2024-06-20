// import { signInWithEmailAndPassword } from 'firebase/auth'
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { auth } from '../../firebase/firebase-config'

// function Login() {
//   const [email,setEmail]=useState('')
//   const navigate=useNavigate()
//   const [password,setPassword]=useState('')
//   const Login=async(e)=>{
//     e.preventDefault()
//     try{
//       await signInWithEmailAndPassword(auth,email,password)
//     navigate('/home')
//     }catch(e){
//       console.log(e)
//     }
//   }
//   return (
//     <div
//     style={{ 
//       background:'skyblue'
//      }}
//     >
//     <div
//     style={{ 
//       padding:'80px',
//       display:'flex',
//       justifyContent:'center',
//       alignItems:'center',
//      }}
//     >
//       <div
//       style={{ 
//         boxShadow:'3px 4px 5px 6px #000',
//         borderRadius:'.5rem',
//         gap:'35px',
//         display:'flex',
//         flexDirection:'column',
//         height:'fit-content',
//         padding:'31px',
//         background:'white'
    
//        }}
//       >
//         <div>
//           <h2
//           style={{ 
//             textAlign:'center'
//            }}
//           >CRUD App - Login Page</h2>
//           <div
//          style={{ 
//           display:'flex',
//           justifyContent:'center'
//           }}
//           >
//             <img
//              style={{ 
//             height:'20vh',
//            }}
//              src='CRUD.png'/>
//           </div>
//         </div>
//         <div
//         style={{ 
//           display:'flex',
//           gap:'12px',
//           flexDirection:'column'
//          }}
//         >
//           <input
//           style={{ 
//             padding:'10px',
//             height:'30px',
//             width:'550px',
//             margin:'12px',
//            }}
// onChange={(e)=>setEmail(e.target.value)}
          
//           placeholder='Enter Email' type='text'/>
//           <input
//           style={{ 
//             padding:'10px',
//             height:'30px',
//             width:'550px',
//             margin:'12px'
//            }}
//            onChange={(e)=>setPassword(e.target.value)}
//            placeholder='Enter Password' type='password'/>
         
//          <div
//          style={{ 
//           display:'flex',
//             justifyContent:'center',

//           }}
//          >
//           <button
//           onClick={Login}
//           style={{ 
//             color:'white',
//             width:'100px',
//             textAlign:'center',
//            background:'#b101ff',
//            padding:'10px'
//            }}
//           >Login</button>
// </div>
//         </div>
//         <p
//         style={{ 
//           textAlign:'center'
//          }}
//         >Don't Yet Have an Account? 
//         <Link to="/">Signup</Link></p>
//         <div
        
//         >
//           <div>
//           <h2
//           style={{ 
//             textAlign:'center'
//            }}
//           >
//           Login With Social Media
//           </h2>  

//           </div>
//           <div
//           className=''
//           style={{ 
//             display:'flex',
//             gap:'12px',
//             justifyContent:'center'
//            }}
//           >
//           <div
        
//         >
//           <img className='imgs' src='git.png'
// style={{ 
//               height:'7vh'
//              }}
//           />
//         </div>
//         <div>
//           <img src='face.png'
//           className='imgs'
// style={{ 
//               height:'7vh'
//              }}

//           />
//         </div>
//         <div>
//           <img src='google.png'
//           className='imgs'
//             style={{ 
//               height:'7vh'
//              }}
//           />
//         </div>
//           </div>
        
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import './Login.css'; // Import the new CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to CRUD App</h2>
      
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
        <h3 className="social-login-title">Or login with:</h3>
        <div className="social-login-buttons">
          <img src="git.png" alt="GitHub" className="social-icon" />
          <img src="face.png" alt="Facebook" className="social-icon" />
          <img src="google.png" alt="Google" className="social-icon" />
        </div>
      </div>
    </div>
  );
}

export default Login;
