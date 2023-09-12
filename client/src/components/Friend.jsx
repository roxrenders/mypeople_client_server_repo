import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend  = ({ friendId, name, subtitle, userPicturePath})=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://mypeople-backend.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return(
    <FlexBetween>
        <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Button
        onClick={() => patchFriend()}
        
        sx={{
          backgroundColor: isFriend ? primaryDark : primaryLight,
          color: isFriend ? primaryLight : primaryDark,
          padding: "0.20rem 0.6rem", 
          borderRadius: "20px", 
          fontSize: "0.8rem",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            backgroundColor: isFriend ? "#E57373" : primaryDark, // Change color on hover
            color: isFriend ? "#fff" : "#fff", // Change text color on hover
          },
        }}
      >
          {isFriend ? "Unfollow" : "Follow"}
      </Button>
    </FlexBetween>
  )
}

export default Friend;