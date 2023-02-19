import { useMediaQuery, Box, useTheme, Typography } from "@mui/material";
import Form from "./Form/Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:965px)");
  return (
    <Box>
      <Box
        width={!isNonMobileScreens ? "50%" : "93%"}
        borderRadius='1.5rem'
        p='2rem'
        m='2rem auto'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight={"500"}
          variant='h5'
          sx={{ mb: "1.5rem" }}
          textAlign='center'
        >
          <Form />
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
