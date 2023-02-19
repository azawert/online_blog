import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import imageS from "../../assets/p1.jpeg";
const UserImage = ({ image, size = "60px", toProfile }) => {
  const name = useSelector((state) => state.user.firstName);
  return (
    <Box width={size} height={size} onClick={toProfile}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt={name}
        src={imageS}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;
