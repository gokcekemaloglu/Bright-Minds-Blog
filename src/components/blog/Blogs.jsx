import React, { useEffect } from 'react'
import Grid from "@mui/material/Grid2";
import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import useBlogCalls from '../../hooks/useBlogCalls';
import { useSearchParams } from 'react-router-dom';
import { Typography, Paper } from "@mui/material";

export default function Blogs() {

    const { blogs, loading } = useSelector((state) => state.blogs);
    const { getBlogsData } = useBlogCalls();

    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 24;
    const search = searchParams.get("search[title]") || "";

    useEffect(() => {
        const params = { limit, page, "filter[isPublish]": true };
        if (search) params["search[title]"] = search;

        getBlogsData('blogs', { params });
    }, [limit, page, search]);

    if (loading) { 
        return (<h1>Loading...</h1>);
    }

    return (
        <>
            {
                blogs.data?.length === 0 ? (
                    <Paper sx={{ p: 4, textAlign: "center" }}>
                        <Typography variant="h6" color="text.secondary">
                            No blogs found matching your search.
                        </Typography>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        {blogs.data?.map((blog) => (
                            <Grid key={blog._id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <BlogCard {...blog} />
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </>

    )
}
