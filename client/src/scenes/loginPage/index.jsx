import { Box, Typography, useTheme, useMediaQuery,Button } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const email = "raunak@gmail.com";
  const password = "raunak1234";

  const credentialsText = `Email: ${email}, Password: ${password}`;

  const copyCredentials = async () => {
    try {
      await navigator.clipboard.writeText(credentialsText);
      alert("Credentials copied to the clipboard!");
    } catch (error) {
      console.error("Unable to copy credentials: ", error);
      alert("Copy to clipboard failed. Please copy manually.");
    }
  };

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="30px" color="primary">
          MyPeople
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to MyPeople, Your Social Universe Begins Here!
        </Typography>
        <Form />
        
        <Typography variant="body1">{credentialsText}</Typography>
        {/* Add a button to copy credentials using navigator.clipboard API */}
        <Button  variant="contained" onClick={copyCredentials}>
          Copy Credentials
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
