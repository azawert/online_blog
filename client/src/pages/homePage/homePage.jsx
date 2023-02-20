import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import UserWidget from "pages/widgets/UserWidget";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);
  return (
    <Box>
      <Box
        width={"60%"}
        padding='2rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          flexDirection='row'
        >
          <UserWidget userId={user._id} picPath={user.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        ></Box>
        {isNonMobileScreens && <Box flexBasis={"26%"}></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
