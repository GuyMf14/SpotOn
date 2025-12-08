import { Button } from './Button';
import './App.css'
import { useState, useEffect } from 'react'
import { HATS } from './config';
import { getPosts } from './api';
import { Post } from './Post';

function App() {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [posts, setPosts] = useState([]);
  const [[isLoading]]=useState([true]);


  console.log(posts);
  console.log("Render");


  useEffect(() =>  {
    getPosts().then(data => setPosts(data));
  }, []);
  

  const [loading, setLoading] = useState(true);

  useEffect(() =>  {
    setLoading(true);
    getPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    
    <>
      {!hidden && <h1>Welcome {count}</h1>}

      <button onClick={() => setCount(count + 1)}>Click</button>

      <button onClick={() => setHidden(h => !h)}>{hidden ? 'show' : 'hidden'}</button>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App