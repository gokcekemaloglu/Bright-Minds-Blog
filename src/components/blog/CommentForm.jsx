import React, { useEffect } from "react";
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import CommentCard from "./CommentCard";
import { useState } from "react";
import useBlogCalls from "../../hooks/useBlogCalls";
import useCommentCall from "../../hooks/useCommentCall"
import { useSelector } from "react-redux";

const CommentForm = ({
  open,
  setOpen,
  initialState,
  setInitialState,
  _id,
}) => {
  const { postComment } = useBlogCalls();
  const [info, setInfo] = useState(initialState);
  // const [lastComments,setLastComments] = useState([])
  
  // console.log(info);
  // console.log(comments);
  
  // console.log(open);
  

  const handleChange = (e) => {
    // console.log(e.target);
    // console.log(e.target.value);
    setInfo({ ...info, blogId: _id, [e.target.name]: e.target.value });
    // console.log(info);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment("comments", info);
    setInfo({
      blogId: "",
      comment: "",
    });
  };

  return (
    <Container>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        fullWidth
        sx={{ mt: 3 }}
      >
        <TextField
          label="Comment"
          name="comment"
          id="comment"
          variant="outlined"
          placeholder="Add a comment..."
          value={info.comment}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" sx={{ mt: 6 }}>
          Add Comment
        </Button>
      </FormControl>
      <Box>
        {open && (
          <CommentCard
            blogId={_id}
            open={open}
            setOpen={setOpen}
            initialState={initialState}
            setInitialState={setInitialState}
          />
        )}
      </Box>
    </Container>
  );
};

export default CommentForm;
