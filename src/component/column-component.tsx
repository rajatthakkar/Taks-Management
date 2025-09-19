import React, { useState } from "react";
import TaskCard from "./task-card";
import { Box, Typography, TextField } from "@mui/material";
import { closeModal, openModal } from "../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import type { Task } from "../redux/tasksSlice";
import Modal from "./modal";
interface propsType {
  Title: string;
  items: any;
  selectData: Task | null;
  setSelectData: React.Dispatch<React.SetStateAction<Task | null>>;
}
const ColumnComponent: React.FC<propsType> = ({
  Title,
  items,
  selectData,
  setSelectData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>("");
  // const filteredItems =
  //   items &&
  //   items.length > 0 &&
  //   items.filter((task: any) => task.status === Title);
  const filteredItems =
    items &&
    items.filter(
      (task: any) =>
        task.status === Title &&
        (task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.priority.toLowerCase().includes(search.toLowerCase()) ||
          task.assignee.toLowerCase().includes(search.toLowerCase()))
    );
  console.log("items", items);
  return (
    <div
      className="w-full sm:w-[30%] h-[87vh] bg-primary border-[5px] border-borderLight text-textDark rounded-[1rem] p-4"
      style={{ padding: "1rem", borderRadius: "1rem" }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          {Title}
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
          }}
        />
      </Box>
      <Box className="flex-1 overflow-y-auto max-h-[75vh] p-2">
        {filteredItems &&
          filteredItems.length > 0 &&
          filteredItems.map((data: any, index: any) => {
            return (
              <TaskCard
                data={data}
                key={index}
                selectData={selectData}
                setSelectData={setSelectData}
                onEdit={() => {
                  setSelectData(data);
                  dispatch(openModal());
                }}
              />
            );
          })}
      </Box>
    </div>
  );
};

export default ColumnComponent;
