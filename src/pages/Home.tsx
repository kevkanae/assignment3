import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import { IHome } from "../interfaces/IHome";
import { IResponse } from "../interfaces/IResponse";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "story_title", headerName: "Title", width: 560, sortable: false },
  { field: "author", headerName: "Author", width: 210, sortable: false },
  {
    field: "created_at",
    headerName: "Created At",
    width: 210,
    sortable: false,
  },
  { field: "story_url", headerName: "Link", width: 210, sortable: false },
];

const Home = (props: IHome) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  return (
    <>
      {props.data[props.page] === undefined ? (
        <Box>Loading</Box>
      ) : (
        <Box sx={{ height: "100vh", width: "100vw" }}>
          <Box sx={{ height: "80vh", width: "100vw" }}>
            <DataGrid
              rows={props.data[props.page].map((x: IResponse, i: number) => {
                return {
                  id: i,
                  ...x,
                };
              })}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              pagination
              disableSelectionOnClick
              onRowClick={(e) => {
                navigate("/post", { state: e.row });
              }}
            />
          </Box>
          <Box>
            <Pagination
              className="pagination"
              count={50}
              page={props.page}
              color="primary"
              onChange={(_, value: number) => {
                // props.clickedNextPage(value);
                props.setNewPage(value);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Home;
