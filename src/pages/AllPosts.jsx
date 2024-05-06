import { useEffect, useState } from "react";
import service from "../appwrite/configr";
import { Container, PostCard } from "../components";

// import React from 'react'
service;
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  service.getActivePosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
