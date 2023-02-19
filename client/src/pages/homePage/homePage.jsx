import { Box } from "@mui/system";
import UserWidget from "pages/widgets/UserWidget";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);
  return (
    <Box>
      <UserWidget userId={user._id} picPath={user.picturePath} />
    </Box>
  );
};

export default HomePage;
