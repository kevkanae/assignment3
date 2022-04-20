import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { IHome } from "../interfaces/IHome";
import { useNavigate } from "react-router-dom";
import { HitsObject } from "../interfaces/IResponse";

const Home = (props: IHome) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState<number>(1);

  const fetchData = async (page: number) => {
    console.log(data);
    if (page in data) {
      console.log(`Page ${page} Exists Already`);
    } else {
      await axios
        .get(
          `https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
        )
        .then((res) => {
          console.log("Fetched Data of Page: " + page);
          setData((prevData: any) => ({ ...prevData, [page]: res.data.hits }));
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    // Initial Fetch
    fetchData(page);
    setPage(page + 1);

    let count = page + 1;
    setInterval(() => {
      console.log("Polled Page: " + count);
      fetchData(count);
      count += 1;
    }, 10000);
  }, []);

  const handleClick = (data: HitsObject) => {
    props.withData(data);
    navigate("/post");
  };

  return (
    <>
      {Object.keys(data).length * 20 === 0 ? (
        <Typography role="loading-text">Loading...</Typography>
      ) : (
        <TableContainer
          role="table-cont"
          component={Paper}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            p: 1,
          }}
        >
          <InfiniteScroll
            dataLength={Object.keys(data).length * 20}
            next={() => {
              fetchData(page);
              setPage(page + 1);
            }}
            hasMore={true}
            loader={<h3>Loading More Posts...</h3>}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {["Author", "Title", "URL", "Created At"].map((x, i) => (
                    <TableCell sx={{ fontWeight: 600 }} key={i}>
                      {x}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(data).map((key: any, i: number) =>
                  data[key].map((x: HitsObject, j: number) => (
                    <React.Fragment key={i + j}>
                      <TableRow
                        key={i + j}
                        onClick={() => handleClick(x)}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            backgroundColor: "#e5e5e5",
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {x.author ?? "N/A"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {x.title ?? "N/A"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {x.story_url ?? "N/A"}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {x.created_at ?? "N/A"}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      )}
    </>
  );
};

export default Home;
