import React from 'react'
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import CommentCard from './CommentCard';

const CommentForm = ({open}) => {
  return (
    <Container>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <TextField
          label="Comment"
          name="comment"
          id="comment"
          variant="outlined"
          placeholder="Add a comment..."
        />
        <Button variant="contained" type="submit" sx={{mt: 6}}>
        Add Comment
          {/* {info._id ? "Update Firm" : "Submit Firm"} */}
        </Button>
      </FormControl>
      <Box>
        {open && <CommentCard/>}
      </Box>
    </Container>
  )
}

export default CommentForm