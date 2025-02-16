import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchFail, fetchStart } from "../../features/blogSlice";
// import { axiosPublic } from "../../hooks/useAxios";
// import { useEffect } from "react";

const BlogCard = ({
  _id,
  image,
  comments,
  content,
  title,
  createdAt,
  countOfVisitors,
  isPublish,
  likes,
  postLike,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </Typography>
        <br />
        <Divider />
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          Published Date: {new Date(createdAt).toLocaleDateString(
          "en-GB",
          {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button size="small" >
            <FavoriteIcon onClick={() => postLike(_id)} sx={{color: "red"}}/>
            <span>{likes?.length}</span>
          </Button>
          <Button size="small">
            <CommentIcon sx={{color: "navy"}}/>
            <span>{comments.length}</span>
          </Button>
          <Button size="small">
            <VisibilityIcon sx={{color: "secondary.second"}}/>
            <span>{countOfVisitors}</span>
          </Button>
        </Box>
        {currentUser ? (
          <Box>
            <Button
              size="small"
              onClick={() => {                
                navigate("/details/" + _id);
              }}
            >
              Read More
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              size="small"
              onClick={() => {
                navigate("/login");
              }}
            >
              Read More
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default BlogCard;
