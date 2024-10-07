import React from "react";
// import { useEffect } from "react";
// import useBlogCalls from "../../hooks/useBlogCalls";
// import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CommentCard = ({comments, open, SetOpen}) => {
  // const { comments } = useSelector((state) => state.blog);

  // const { getComments } = useBlogCalls();

  // useEffect(() => {
  //   getComments();
  // }, []);

  // console.log("comments:", comments);

  // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <List sx={{ width: "100%",  bgcolor: "background.paper", mt: 4}}>
      {comments.map((comment) => {
        const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-GB", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
        <ListItem key={comment._id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={comment?.userId?.username}
              src="/static/images/avatar/1.jpg"
            />
            <Typography>{comment?.userId?.username}</Typography>
            <Typography>{formattedDate}</Typography>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
              >
                {comment?.comment}
              </Typography>
            }
          />
          <br />
          <Divider/>
          <Box
            sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}
          >
            <Button size="small">
              <EditIcon  />
            </Button>
            {/* {open && <FirmModal open={open} handleClose={handleClose} initialState={initialState} />} */}
            {/* <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setInitialState({
                _id,
                brandId,
                productId,
                quantity,
                price,
                firmId,
              });
            }}
            sx={btnStyle}
          /> */}
            <Button size="small">
              <DeleteOutlineIcon />
            </Button>
          </Box>
        </ListItem>
        
      )})}
      
    </List>
  );
};

export default CommentCard;
