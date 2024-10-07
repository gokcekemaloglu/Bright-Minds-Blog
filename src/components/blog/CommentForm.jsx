import React from 'react'
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import CommentCard from './CommentCard';

const CommentForm = ({open, comments, SetOpen}) => {

  const handleChange = () => {

  }

  return (
    <Container>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <TextField
          label="Comment"
          name="comment"
          id="comment"
          variant="outlined"
          placeholder="Add a comment..."
          onChange={handleChange}
          // value={}
        />
        <Button variant="contained" type="submit" sx={{mt: 6}}>
          Add Comment
          {/* {info._id ? "Update Firm" : "Submit Firm"} */}
        </Button>
      </FormControl>
      <Box>
        {open && <CommentCard comments={comments} open={open} SetOpen={SetOpen} />}
      </Box>
    </Container>
  )
}

export default CommentForm