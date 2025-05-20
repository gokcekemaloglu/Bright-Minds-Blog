import { useEffect, useState } from "react";
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
import PaginationComponent from "../components/PaginationComponent";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { publishedBlogs, loading } = useSelector((state) => state.blog);
  const { pagPublishedBlogs } = useSelector((state) => state.pagination);
  const { getPublishedBlogs } = useBlogCalls();

  // State for pagination
  const [page, setPage] = useState(1);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You could add additional search functionality here
  };

  // Filter blogs based on search term
  const filteredBlogs = publishedBlogs?.filter((blog) => {
    if (!searchTerm) return true;

    return (
      blog?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog?.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog?.categoryId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  console.log("filteredBlogs", filteredBlogs);
  console.log("pagPublishedBlogs", pagPublishedBlogs);
  

  // Get featured blog (first blog or most viewed)
  const featuredBlog =
    publishedBlogs && publishedBlogs?.length > 0
      ? [...publishedBlogs].sort(
          (a, b) => b.countOfVisitors - a.countOfVisitors
        )[0]
      : null;

  // Get remaining blogs (excluding featured)
  const remainingBlogs = featuredBlog
    ? filteredBlogs?.filter((blog) => blog._id !== featuredBlog._id)
    : filteredBlogs;

  useEffect(() => {
    // getBlogsData("blogs", { params: { limit: 10, page } });
    // getPublishedBlogs("publishedBlogs", { params: { limit: 10, page } });
    getPublishedBlogs("publishedBlogs");
  }, []);

  // console.log(filteredBlogs);
  // console.log(featuredBlog);

  if (loading) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
          <CircularProgress color="primary" />
        </Box>
      )
    }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <HomeHeader />
        {/* Search Bar */}
        <SearchBar handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} searchTerm = {searchTerm}/>
        {/* Featured Blog */}
        {featuredBlog && !searchTerm && <FeaturedBlog {...featuredBlog} />}
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
              {searchTerm ? "Search Results" : "Latest Posts"}
            </Typography>

            {searchTerm && (
              <Chip
                label={`Results for: "${searchTerm}"`}
                onDelete={() => setSearchTerm("")}
                color="primary"
              />
            )}
          </Box>

          {filteredBlogs?.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No blogs found matching your search.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {pagPublishedBlogs?.map((blog) => (
                <Grid key={blog._id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <BlogCard {...blog} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Pagination */}
        {remainingBlogs && 
          <PaginationComponent
            endpoint={"blogs/publishedBlogs"}
            slice={"pagPublishedBlogs"}
            data={remainingBlogs}
            query={searchTerm && `search=${searchTerm}`}
          />
        }
        
        {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
          <Stack spacing={2}>
            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1rem",
                },
              }}
            />
          </Stack>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Home;
