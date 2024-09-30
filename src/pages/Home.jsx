import React from "react";
import { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Grid from '@mui/material/Grid2';
import { useSelector } from "react-redux";
import BlogCard from "../components/blog/BlogCard";
import { useState } from "react";

const Home = () => {

  const {getBlogsData, postLike} = useBlogCalls()  

  const [initialState, setInitialState] = useState({
    "error": false,
    "didUserLike": false,
    "countOfLikes": 0
  })
  
  useEffect(()=>{
    getBlogsData("blogs")
    
  },[])
  
  const {blogs} = useSelector(state=>state.blog)
  // console.log("blog:", blogs);

  


  return (
    <Grid container spacing={2} mt={3}>
      {blogs.map((blog)=>(
        <Grid key={blog._id} xs={12} md={6} lg={4} xl={3}>
          <BlogCard {...blog} postLike={postLike} initialState={initialState} setInitialState={setInitialState} />
        </Grid>
        
      ))}
      
    </Grid>
  );
};

export default Home;
