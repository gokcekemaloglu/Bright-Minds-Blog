import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart } from "../features/blogSlice";
import { axiosPublic } from "../hooks/useAxios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Detail = () => {
  const [blogDetail, setBlogDetail] = useState("");

  const { _id } = useParams();

  const {
    comments,
    content,
    countOfVisitors,
    createdAt,
    image,
    isPublish,
    likes,
    title,
    userId,
  } = blogDetail;

  const dispatch = useDispatch();

  const getSingleBlog = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`blogs/${_id}`);
      setBlogDetail(data.data);

      console.log(data.data);
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, []);

  console.log(userId);

  return (
    <Container  maxWidth={"lg"}>
      {/* <Typography
        variant="h5"
        component="h2"
        sx={{
          textAlign: "center",
          mt: 4
        }}
      >
        {title}
      </Typography> */}
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
        component="img"
      />
      <br />
      <br />

      {/* User info */}
      <CardContent sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
        <div>
          <AccountBoxIcon />
        </div>
        <div>
          <Typography gutterBottom variant="body2" component="div">
            {/* {userId.username} {userId.firstName} {userId.lasttName} */}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            Published Date: {createdAt}
          </Typography>
        </div>

        <br />
        <Divider />
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          {content}
        </Typography>
        <br />
        <Divider />
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          Published Date: {createdAt}
        </Typography>
      </CardContent>
      <Box>
        <Button size="small">
          <FavoriteIcon onClick={() => postLike(_id)} />
          <span>{likes?.length}</span>
        </Button>
        <Button size="small">
          <CommentIcon />
          {/* <span>{comments.length}</span> */}
        </Button>
        <Button size="small">
          <VisibilityIcon />
          <span>{countOfVisitors}</span>
        </Button>
      </Box>
    </Container>
  );
};

export default Detail;
