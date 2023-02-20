import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBeetween/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage/UserImage";
import WidgetWrapper from "components/WidgetWrapper/WidgetWrapper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  return <div></div>;
};

export default MyPostWidget;
