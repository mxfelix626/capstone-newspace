import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Navigate } from 'react-router';
import { GetPosts, GetLikes, SetLike, RemoveLike, RemovePost } from "./helpers/api";

const Home = ({user}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      if (!!user) {
        const postRes = await GetPosts();
        const likes = await GetLikes(user);

        const newArr = postRes.map(obj => {
          const likeExists = !!likes.likes.find((l) => l.post_id === obj.id);
          if (likeExists) {
            obj.like = true
          } else {
            obj.like = false;
          }
          return obj;
        });
        setPosts(newArr);
      }

    })();
  },[user])

  const refreshPosts = async () => {
    
    console.log(user)
    if (!!user) {
      const postRes = await GetPosts();
      const likes = await GetLikes(user);

      const newArr = postRes.map(obj => {
        const likeExists = !!likes.likes.find((l) => l.post_id === obj.id);
        if (likeExists) {
          obj.like = true
        } else {
          obj.like = false;
        }
        
        return obj;
      });
      setPosts([...newArr]);
    }
  }
  const handleLike = async (p) => {
    console.log({p})
    if (p.like === true) {
      await RemoveLike(p);
    }
    else {
      await SetLike(p);
    }  
    await refreshPosts();
  }
  
  const handleDelete = async (p) => {
    if (user === p.posted_by) {
      console.log("YOU HAVE PERMISSION TO DELETE THIS POST");
      await RemovePost(p);
      
    }
  
    await refreshPosts();
  }

  const imgStyle = {
    maxHeight: 300,
    maxWidth: 300
  }
  if (!user) return < Navigate to = { '/login'} />
  return (
    <section className="col-md-8">
        <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              What's new on NewSpace!
            </h3>
          </CardTitle>
        </CardBody>
      </Card>
      {posts.map((p) => {
        return <Card>
          <CardBody className="text-center">
            <img
              src={p.image_url}
              alt="new"
              style={imgStyle}
            />
            <CardTitle>
              <h3 className="font-weight-bold">
                <p>{p.body}</p>
              </h3>
            </CardTitle>
            <p onClick={() => handleLike(p)}>{p.like ? "❤️" : "🤍"}</p>
            <h5>Posted by: {p.posted_by}</h5> 
            <p>Posted at: {p.posted_at}</p>
            {user === p.posted_by ?  <button onClick={() => handleDelete(p)}>delete post</button> : ''}
          </CardBody>
        </Card>
      })}


      
    </section>
  );
}

export default Home;
