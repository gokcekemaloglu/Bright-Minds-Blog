import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';

const BlogCard = ({
  _id,
  image,
  content,
  title,
  createdAt,
  countOfVisitors,
  isPublish,
  likes,
}) => {
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
          Published Date: {createdAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Box>
          <Button size="small">
            <FavoriteIcon sx={{}} /> {}
          </Button>
          <Button size="small">
            <CommentIcon/>
          </Button>
          <Button size="small">
            <VisibilityIcon/>
          </Button> 
          
        </Box>
        <Box>
          <Button size="small">Read More</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
