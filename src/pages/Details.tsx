import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <p>{JSON.stringify(state) ?? "-"}</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
};

export default Details;
