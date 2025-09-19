import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "../redux/tasksSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { openModal } from "../redux/modalSlice";
interface NavBarProps {
  setSelectData: React.Dispatch<React.SetStateAction<Task | null>>;
}
const NaveBar: React.FC<NavBarProps> = ({ setSelectData }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string>("/todo");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [
    { label: "To Do", path: "/todo" },
    { label: "In Progress", path: "/in-progress" },
    { label: "Done", path: "/done" },
    {
      label: "Add Task",
      onClick: () => {
        dispatch(openModal());
        setSelectData(null);
      },
    },
  ];
  const handleSelect = (item: {
    label: string;
    path?: string;
    onClick?: () => void;
  }) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
      setSelected(item.label);
    }
    handleMenuClose();
  };
  // const handleSelect = (item: { label: string; path: string }) => {
  //   setSelected(item.label);
  //   navigate(item.path);
  //   handleMenuClose();
  // };

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/todo", { replace: true });
      setSelected("To Do");
    }
  }, [location.pathname, navigate]);
  return (
    <nav
      className="w-full bg-primary text-white flex items-center justify-between p-4 shadow-md"
      style={{ padding: "1rem", marginBottom: "1rem" }}
    >
      <Typography variant="h6" component="div" color="black">
        Task Management
      </Typography>
      <div className="hidden sm:block">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(openModal());
            setSelectData(null);
          }}
        >
          Add Task
        </Button>
      </div>
      <div className="sm:hidden">
        <IconButton edge="end" color="default" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {menuItems &&
            menuItems.length > 0 &&
            menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleSelect(item)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#3c4d67",
                    color: "white",
                  },
                  backgroundColor:
                    selected === item.label ? "#3c4d67" : "transparent",
                  color: selected === item.label ? "white" : "inherit",
                }}
              >
                {item.label}
              </MenuItem>
            ))}
        </Menu>
      </div>
    </nav>
  );
};

export default NaveBar;
