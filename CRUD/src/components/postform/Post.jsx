import React, { useState } from 'react';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { auth, db, storage } from '../../firebase/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Post() {
    const [addPend, setAddPend] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        if (e.target.name === 'post') {
            setTitle(e.target.value);
        } else if (e.target.name === 'desc') {
            setDesc(e.target.value);
        } else if (e.target.name === 'img') {
            const imageName = e.target.files[0];
            setImg(imageName);
        }
    };

    const addPost = async () => {
        setAddPend(true);
        const postCollectionRef = collection(db, 'posts');
        const filesFolderRef = ref(storage, `projectFiles/postImgs/${img.name + v4()}`);

        try {
            await uploadBytes(filesFolderRef, img);
            const downloadUrl = await getDownloadURL(filesFolderRef);
            const currentDateTime = new Date();
            const currentDate = currentDateTime.toLocaleDateString();
            const currentTime = currentDateTime.toLocaleTimeString();

            await addDoc(postCollectionRef, {
                addedby: auth?.currentUser.email,
                date: currentDate,
                desc: desc,
                img: downloadUrl,
                time: currentTime,
                title: title
            });

            setAddPend(false);
            navigate('/home');
        } catch (err) {
            console.error('Error adding post:', err);
            setAddPend(false);
        }
    };

    return (
        <div style={{ padding: '45px', fontSize: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRadius: '.6rem', padding: '20px', background: 'rgb(213, 227, 222)', boxShadow: '2px 2px 4px 3px #000' }}>
                <div>
                    <h2 style={{ textAlign: 'center' }}>Add Post Form</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '17px' }}>
                    <input type='text' onChange={handleInputChange} name='post' placeholder='Enter Post title' />
                    <input type='text' onChange={handleInputChange} name='desc' placeholder='Enter Post description' />
                    <input name='img' accept='image/*' type='file' onChange={handleInputChange} placeholder='Choose an image' />
                </div>
                <div className='button'>
                    {!addPend ?
                        <button onClick={addPost} className='btn'>
                            <FontAwesomeIcon icon={faAddressBook} style={{ marginRight: '5px' }} />
                            Post
                        </button> :
                        <button className='btn'>
                            <FontAwesomeIcon icon={faAddressBook} style={{ marginRight: '5px' }} />
                            Adding Post...
                        </button>}
                </div>
            </div>
        </div>
    );
}

export default Post;
