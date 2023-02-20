import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage/UserImage";
import FlexBetween from "components/FlexBeetween/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./apiUser";
import linkedIn from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
const UserWidget = ({ userId, picPath }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  useEffect(() => {
    getUser(userId, token)
      .then((r) => setUser(r))
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  if (!user) {
    return null;
  }
  if (isLoading) {
    return "Loading...";
  }
  const {
    firstName,
    lastName,
    occupation,
    location,
    viewedProfile,
    impression,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap='0.5rem' pb='1.1rem'>
        <FlexBetween onClick={() => navigate(`/profile/${userId}`)}>
          <UserImage image={picPath} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                "&:hover": { color: palette.primary.light, cursor: "pointer" },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{ "&:hover": { cursor: "pointer" } }} />
      </FlexBetween>
      <Divider />

      <Box p='1rem 0'>
        <Box display='flex' alignItems={"center"} gap='1rem' mb={"0.5rem"}>
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display='flex' alignItems={"center"} gap='1rem'>
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>Who's viewed your profile: </Typography>
          <Typography color={main} fontWeight='500'>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>Impressions of your posts: </Typography>
          <Typography color={main} fontWeight='500'>
            {impression}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      <Box p='1rem 0'>
        <Typography fontSize={"1rem"} color={main} fontWeight='500' mb='1rem'>
          Social Profiles
        </Typography>
        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween sx={{ cursor: "pointer" }}>
            <img src={linkedIn} alt='linkedin' />
            <Box>
              <Typography color={main} fontWeight={"500"}>
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{ color: main, "&:hover": { cursor: "pointer" } }}
          />
        </FlexBetween>

        <FlexBetween gap='1rem'>
          <FlexBetween sx={{ cursor: "pointer" }}>
            <img src={twitter} alt='linkedin' />
            <Box>
              <Typography color={main} fontWeight={"500"}>
                Twitter
              </Typography>
              <Typography color={medium}>Social network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{ color: main, "&:hover": { cursor: "pointer" } }}
          />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
