import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import { IHome } from "../interfaces/IHome";
import { IResponse } from "../interfaces/IResponse";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [data, setData] = useState(props.data);

  const fetchData = async (page: number) => {
    await axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
      )
      .then((res) => {
        if (data[page] === undefined) {
          setData((prevData: any) => ({ ...prevData, [page]: res.data.hits }));
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    let count = props.page;
    setInterval(() => {
      console.log(count);

      fetchData(count++);
    }, 10000);
  }, []);

  return (
    <>
      {data[props.page] === undefined ? (
        <Box>Loading</Box>
      ) : (
        <Box sx={{ height: "100vh", width: "100vw", p: 2 }}>
          <Box sx={{ height: "80vh", width: "98vw" }}>
            <DataGrid
              rows={data[props.page].map((x: IResponse, i: number) => {
                return {
                  id: i,
                  ...x,
                };
              })}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              disableSelectionOnClick
              onRowClick={(e) => {
                navigate("/post", { state: e.row });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10vh",
              width: "100vw",
            }}
            role="pagination"
          >
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
