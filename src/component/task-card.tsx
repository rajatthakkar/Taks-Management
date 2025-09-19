import React, { useState } from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { openModal } from "../redux/modalSlice";
import { deleteTask } from "../redux/tasksSlice";

const TaskCard = ({ data, onEdit }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  console.log("datadata", data);
  const handleDeleteTask = (task: any) => {
    dispatch(deleteTask(task));
    toast.success("Task deleted successfully!");
  };
  return (
    <Card
      sx={{
        border: "2px solid #404854",
        borderRadius: "12px",
        p: 2,
        m: 1,
        boxShadow: "none",
        gap: "10px",
      }}
    >
      <Typography variant="h6">{data?.title || "N/A"}</Typography>
      <Typography variant="subtitle1">{data?.description || "N/A"}</Typography>
      <Typography variant="body2">{data?.priority || "N/A"}</Typography>
      <Box
        sx={{
          backgroundColor: "#c1c4c7",
          borderRadius: "1rem",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          px: 1,
          py: 1,
        }}
      >
        <Typography variant="subtitle1">{data?.assignee || "N/A"}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderRadius: "6px",
          p: 1,
        }}
      >
        <IconButton color="error">
          <DeleteIcon onClick={() => handleDeleteTask(data.id)} />
        </IconButton>

        <IconButton color="primary">
          <EditIcon onClick={onEdit} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TaskCard;
