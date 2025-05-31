import { useEffect, useState, lazy } from "react";
import { useSelector } from "react-redux";
import {
  Pagination,
  Stack,
  Container,
  Typography,
  Box,
  Paper,
  InputBase,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import useBlogCalls from "../hooks/useBlogCalls";
import BlogCard from "../components/blog/BlogCard";
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
  const {blogs: { details }} = useSelector((state) => state.blog);
  console.log("blogs details", details);

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
        {/* {featuredBlog && !searchTerm && <FeaturedBlog {...featuredBlog} />} */}
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

          {/* {searchFilteredBlog?.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No blogs found matching your search.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {blogsToDisplay?.map((blog) => (
                <Grid key={blog._id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <BlogCard {...blog} />
                </Grid>
              ))}
            </Grid>
          )} */}
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
