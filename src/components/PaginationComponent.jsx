import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ details }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const totalRecords = details?.totalRecords;
  const totalPages = details?.pages?.total !== undefined && details?.pages !== false ? details.pages.total : 1;
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : (details?.pages?.current || 1);

  const handlePageChange = (event, page) => {
    if (page > 0 && page <= totalPages) {
      setSearchParams({ page });
    }
  };

  const pageSize = details?.limit || 24;
  const startRecord = totalRecords === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        mt: 3,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {totalRecords === 0
          ? "No data to display"
          : `Showing ${startRecord} to ${endRecord} of ${totalRecords} records`}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Stack spacing={2}>
          {
            details?.pages && details.pages !== false && (
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="medium"
                showFirstButton
                showLastButton
                disabled={totalPages === 0}
              />
            )
          }
        </Stack>
      </Box>
    </Box>
  );
};

export default PaginationComponent;
