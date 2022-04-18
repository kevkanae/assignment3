import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IDetails } from "../interfaces/IDetails";

const Details = (props: IDetails) => {
  const navigate = useNavigate();
  return (
    <div>
      <pre>{JSON.stringify(props.data, null, 2) ?? "-"}</pre>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
};

export default Details;
