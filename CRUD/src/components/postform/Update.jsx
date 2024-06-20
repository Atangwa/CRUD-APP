import React, { useState } from 'react'
import './../css/post.css'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase-config'
function Update() {
    const navigate=useNavigate()
    const [addPend,setAddPend]=useState(false)
    const {id}=useParams()
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [img,setImg]=useState('')
    
    const handleInputChange=(e)=>{
        if(e.target.name==='post'){
            setTitle(e.target.value)
        }else if(e.target.name==='desc'){
            setDesc(e.target.value)
        }else if(e.target.name==='img'){
            const imageName=e.target.files[0]
            setImg(imageName)
        }else{
            console.log("Try me")
        }
        console.log(img,title,desc)
    }

    const updatePost=async()=>{
        const postDoc=doc(db,'posts',id)
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toLocaleDateString(); // Get date
        const currentTime = currentDateTime.toLocaleTimeString();
       try{
        await updateDoc(postDoc,{
            addedby:auth?.currentUser?.email,
            date:currentDate,
            desc:desc,
            time:currentTime,
            title:title
        })
        console.log("sucessfully updated")
        navigate('/home')
       }catch(e){
        console.log(e)
       }
       
    
    }
  return (
    <div
    
    style={{ 
        padding:'45px',
        fontSize:'30px'
     }}>
        <div style={{ 
            display:'flex',
            justifyContent:'center',
            boxShadow:'2px 2px 4px 3px 000',
            flexDirection:'column',
            borderRadius:'.6rem',
            padding:'20px',
            background:'rgb(213, 227, 222)'
         }}>
        <div>
            <h2
            style={{ 
                textAlign:'center'
             }}
            >Update Post Form</h2>
        </div>
        <div
        style={{ 
            display:'flex',
            justifyContent:'center',
            
            flexDirection:'column',
            gap:'17px'
         }}
        >
        <input type='text' onChange={handleInputChange}
        name='post'
         placeholder='Enter Post title'/>
        <input type='text' onChange={handleInputChange} 
        name='desc'
        placeholder='Enter Post description'/>
            <input 
            name='img'
            accept='image/*'
            type='file' onChange={handleInputChange} placeholder='choose an image'/>
            
        </div>
        <div className='button'>
        {!addPend?<button
        onClick={updatePost}
        className='btn'
        >
        <FontAwesomeIcon
        style={{ 
            
         }}
         icon={faAddressBook}/>
            <j
            style={{ 
                marginLeft:'15px'
             }}
            >Update</j></button>:<button
        className='btn'
        >
        <FontAwesomeIcon
        style={{ 
            
         }}
         icon={faAddressBook}/>
            <j
            style={{ 
                marginLeft:'15px'
             }}
            >Updating Post ..</j></button>}
        </div>
        
    </div>
    </div>
  )
}

export default Update