import React, { useState, useEffect } from "react";
import ColumnComponent from "../component/column-component";
import NaveBar from "../component/nav-bar";
import { useLocation } from "react-router-dom";
import {
  useMediaQuery,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../component/modal";
import { closeModal } from "../redux/modalSlice";
import type { RootState, AppDispatch } from "../store";
import { fetchTasks } from "../redux/tasksThunks";
import type { Task } from "../redux/tasksSlice";

const HomePage: React.FC = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch<AppDispatch>();

  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const { items, loading, error } = useSelector(
    (state: RootState) => state.task
  );

  const [selectData, setSelectData] = useState<null | Task>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="w-screen h-screen bg-primary border border-borderLight text-textDark rounded-md p-4">
      <NaveBar setSelectData={setSelectData} />
      {loading && (
        <Box className="flex justify-center items-center h-[70vh] w-full">
          <CircularProgress />
        </Box>
      )}
      {!loading && error && (
        <Box className="flex justify-center items-center h-[70vh] w-full">
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      )}
      {!loading && !error && (
        <div className="flex items-center justify-center gap-2.5">
          {isMobile ? (
            <>
              {location.pathname === "/todo" && (
                <ColumnComponent
                  Title="To Do"
                  items={items}
                  selectData={selectData}
                  setSelectData={setSelectData}
                />
              )}
              {location.pathname === "/in-progress" && (
                <ColumnComponent
                  Title="In Progress"
                  items={items}
                  selectData={selectData}
                  setSelectData={setSelectData}
                />
              )}
              {location.pathname === "/done" && (
                <ColumnComponent
                  Title="Done"
                  items={items}
                  selectData={selectData}
                  setSelectData={setSelectData}
                />
              )}
            </>
          ) : (
            <>
              <ColumnComponent
                Title="To Do"
                items={items}
                selectData={selectData}
                setSelectData={setSelectData}
              />
              <ColumnComponent
                Title="In Progress"
                items={items}
                selectData={selectData}
                setSelectData={setSelectData}
              />
              <ColumnComponent
                Title="Done"
                items={items}
                selectData={selectData}
                setSelectData={setSelectData}
              />
            </>
          )}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => dispatch(closeModal())}
              data={selectData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
