import { useLocation } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();

  return (
    <div>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export default Details;
