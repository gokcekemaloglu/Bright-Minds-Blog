import { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Chip, CircularProgress } from "@mui/material";
import useBlogCalls from "../hooks/useBlogCalls";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import HomeHeader from "../components/home/homeHeader";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
const Blogs = lazy(() => import("../components/blog/Blogs"));
const PaginationComponent = lazy(() => import("../components/PaginationComponent"));

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { blogs: { details } } = useSelector((state) => state.blogs);

  const search = searchParams.get("search[title]") || "";

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
              {search ? "Search Results" : "Latest Posts"}
            </Typography>

            {search && (
              <Chip
                label={`Results for: "${search}"`}
                onDelete={() => {
                  const params = new URLSearchParams(searchParams);
                  params.delete("search[title]");
                  setSearchParams(params);
                }}
                color="primary"
              />
            )}
          </Box>

          {/* Blogs */}
          <Suspense fallback={<h1>Loading...</h1>}> {/* add loading skeleton */}
            <Blogs />
          </Suspense>

        </Box>

        {/* Pagination */}
        <Suspense fallback={<h1>pagination Loading...</h1>}> {/* add loading skeleton */}
          <PaginationComponent details={details}  />
        </Suspense>
      </Container>
    </Box>
  );
};

export default Home;
