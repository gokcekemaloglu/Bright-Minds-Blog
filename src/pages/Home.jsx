import React from "react";
import { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Grid from '@mui/material/Grid2';
import { useSelector } from "react-redux";
import BlogCard from "../components/blog/BlogCard";

const Home = () => {

  const {getBlogsData} = useBlogCalls()  
  
  useEffect(()=>{
    getBlogsData("blogs")
  },[])
  
  const {blogs} = useSelector(state=>state.blog)
  console.log("blog:", blogs);
  return (
    <Grid container spacing={2} mt={3}>
      {blogs.map((blog)=>(
        <Grid key={blog._id} item xs={12} md={6} lg={4} xl={3}>
          <BlogCard {...blog} />
        </Grid>
        
      ))}
      
    </Grid>
  );
};

export default Home;
