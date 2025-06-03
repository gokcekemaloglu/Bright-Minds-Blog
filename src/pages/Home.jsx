import { useEffect, useState, lazy } from "react";
import { useSelector } from "react-redux";
import {
  // Pagination,
  // Stack,
  Container,
  Typography,
  Box,
  // Paper,
  // InputBase,
  // IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import SearchIcon from "@mui/icons-material/Search";
// import useBlogCalls from "../hooks/useBlogCalls";
// import BlogCard from "../components/blog/BlogCard";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import HomeHeader from "../components/home/homeHeader";
// import PaginationComponent from "../components/PaginationComponent";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { Suspense } from "react";
const Blogs = lazy(() => import("../components/blog/Blogs"));
const PaginationComponent = lazy(() =>
  import("../components/PaginationComponent")
);

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search[title]") || "";
  const {blogs: { details, data }} = useSelector((state) => state.blog);
  // console.log("blogs details", details);
  // console.log("blogs data", data);

  const featuredBlog = data && data?.length > 0 ? [...data].sort((a, b) => b.countOfVisitors - a.countOfVisitors)[0] : null;
  // console.log("featured blog", featuredBlog);
  

  // if (loading) {
  //   return (
  //     <Box
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="center"
  //       minHeight="100vh"
  //     >
  //       <CircularProgress color="primary" />
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <HomeHeader />
        {/* Search Bar */}
        <SearchBar />
        {/* Featured Blog */}
        {featuredBlog && <FeaturedBlog {...featuredBlog} />}
        {/* Blog Grid */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              {/* {searchTerm ? "Search Results" : "Latest Posts"} */}
              {search ? "Search Results" : "Latest Posts"}
            </Typography>

            {/* {searchTerm && ( */}
            {search && (
              <Chip
                // label={`Results for: "${searchTerm}"`}
                label={`Results for: "${search}"`}
                onDelete={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete("search[title]");
                  setSearchParams(params);
                  // setSearchTerm("");
                }}
                color="primary"
              />
            )}
          </Box>

          {/* Blogs */}
          <Suspense fallback={<CircularProgress color="primary" />}>
            <Blogs />
          </Suspense>
        </Box>

        {/* Pagination */}
        <Suspense fallback={<CircularProgress color="primary" />}>
          <PaginationComponent details={details} />
        </Suspense>
      </Container>
    </Box>
  );
};

export default Home;
