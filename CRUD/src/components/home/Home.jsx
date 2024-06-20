import React, { useEffect, useState } from 'react';
import { faHeart, faSadCry, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons/faSadTear';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase-config';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const postRef = collection(db, 'posts');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const handleDeletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
    alert('Post Deleted');
    navigate('/home');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getDocs(postRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(filteredData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchPosts();
  }, [postRef]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          background: 'lightblue',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
        }}
      >
        <h2 style={{ color: '#333' }}>POST CRUD & WEATHER APP</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <p style={{ cursor: 'pointer' }} onClick={() => navigate('/postform')}>Add Post</p>
          <p style={{ cursor: 'pointer' }} onClick={() => navigate('/weatherapp')}>Weather App</p>
          <p style={{ cursor: 'pointer' }} onClick={() => navigate('/user-profile')}>User Profile</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FontAwesomeIcon icon={faUser} />
            <p style={{ color: 'black', fontWeight: 'bold' }}>
              {auth.currentUser?.displayName || auth.currentUser?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#333',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Search Post"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '350px',
            transition: 'border 0.3s',
          }}
        />
        <button
          style={{
            padding: '10px 20px',
            background: '#333',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </section>

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          background: '',
          borderRadius: '10px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              background: 'lightblue',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            <img
              src={post.img}
              alt="Post"
              style={{
                height: '200px',
                borderRadius: '10px',
                
              }}
            />
            <h3
              style={{
                fontFamily: 'monospace',
                fontSize: '24px',
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                fontFamily: 'Arial',
                fontSize: '16px',
              }}
            >
              {post.desc}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  fontSize: '24px',
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faSadCry} />
                <FontAwesomeIcon icon={faSadTear} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <small>Posted At: {post.time}</small>
                <small>{post.date}</small>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
              }}
            >
              <Link to={`/post/update/${post.id}`}>
                <button
                  style={{
                    padding: '10px',
                    background: '#333',
                    color: 'white',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{
                  padding: '10px',
                  background: 'white',
                  color: '#333',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
            <p
              style={{
                fontFamily: 'Arial',
                fontSize: '16px',
              }}
            >
              @posted by {post.addedby}
            </p>
          </div>
        ))}
      </section>

      <footer
        style={{
          background: 'grey',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        &copy; 2024 CRUD and WEATHER App
      </footer>
    </div>
  );
}

export default Home;
