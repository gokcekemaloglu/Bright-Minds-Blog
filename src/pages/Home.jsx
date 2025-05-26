import { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Chip, CircularProgress } from "@mui/material";
import useBlogCalls from "../hooks/useBlogCalls";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import HomeHeader from "../components/home/homeHeader";
import PaginationComponent from "../components/PaginationComponent";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
const Blogs = lazy(() => import("../components/blog/Blogs"));

const Home = () => {
  const [searchParams] = useSearchParams();
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
                // onDelete={() => setSearch("")}
                color="primary"
              />
            )}
          </Box>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Blogs />
          </Suspense>

        </Box>

        {/* Pagination */}
        {/* {searchFilteredBlog && (
          <PaginationComponent
            endpoint={"blogs/publishedBlogs"}
            slice={searchTerm ? "pagFilteredBlogs" : "pagPublishedBlogs"}
            // data={searchFilteredBlog}
            query={searchQuery}
          />
        )} */}
      </Container>
    </Box>
  );
};

export default Home;
