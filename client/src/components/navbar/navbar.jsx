import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  FormControl,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBeetween/FlexBetween";

const NavBar = () => {
  const state = useSelector((state) => state);
  useEffect(() => {
    console.log(state.mode);
  }, [state.mode]);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width:900px)");
  const isAuth = Boolean(useSelector((state) => state.token));
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.primary.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;
  console.log(state);
  const fullName = `${user?.firstName} ${user?.lastName}`;
  return !isAuth ? (
    <Typography
      fontWeight='bold'
      fontSize={"clamp(1rem,2rem,2.25rem)"}
      color='primary'
      onClick={() => navigate("/")}
      sx={{
        textAlign: "center",
        "&:hover": {
          color: primaryLight,
          cursor: "pointer",
        },
      }}
    >
      MySocialNetwork
    </Typography>
  ) : (
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>
      <FlexBetween gap={"1.5rem"}>
        <Typography
          fontWeight='bold'
          fontSize={"clamp(1rem,2rem,2.25rem)"}
          color='primary'
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          MySocialNetwork
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            bgcolor={neutralLight}
            borderRadius='9px'
            gap='3rem'
            padding='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search here' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={setMode}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: dark }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant='standard' value={fullName ? fullName : ""}>
            <Select
              value={fullName ? fullName : "Ricardo Milos"}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName ? fullName : "Ricardo Milos"}>
                <Typography>{fullName ? fullName : "Ricardo Milos"}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position={"fixed"}
          right='0'
          bottom={"0"}
          height='100%'
          zIndex={"10"}
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
        >
          <Box display='flex' justifyContent={"flex-end"} p='1rem'>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          <FlexBetween
            display={"flex"}
            justifyContent='center'
            alignItems={"center"}
            gap='3rem'
            flexDirection={"column"}
          >
            <IconButton onClick={() => setMode()}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant='standard' value={fullName ? fullName : ""}>
              <Select
                value={fullName ? fullName : "Ricardo Milos"}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName ? fullName : "Ricardo Milos"}>
                  <Typography>
                    {fullName ? fullName : "Ricardo Milos"}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
