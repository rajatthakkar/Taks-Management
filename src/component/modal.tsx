import React, { useEffect } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { styled, Box } from "@mui/material";
import { addTask, updateTask } from "../redux/tasksSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { toast } from "react-toastify";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

interface TaskFormValues {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
}
const ErrorText = styled(Box)`
  color: red;
  font-size: 12px;
  margin-bottom: 8px;
`;
export const validateTaskForm = (values: TaskFormValues) => {
  const errors: Partial<TaskFormValues> = {};

  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.assignee) {
    errors.assignee = "Assignee is required";
  }

  return errors;
};
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isEditMode = Boolean(data);

  console.log("data***", data);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        style={{ padding: "1rem" }}
      >
        <h2 className="text-xl font-bold mb-4">
          {data ? "Edit Task" : "Add Task"}
        </h2>

        <Formik
          initialValues={{
            title: data?.title || "",
            description: data?.description || "",
            priority: data?.priority || "Medium",
            status: data?.status || "To Do",
            assignee: data?.assignee || "",
          }}
          validate={validateTaskForm}
          onSubmit={(values, { resetForm }) => {
            console.log("Submitted Task:", values);
            // TODO: call redux action here
            if (isEditMode) {
              dispatch(
                updateTask({
                  id: data.id,
                  ...values,
                })
              );
              toast.success("Task updated successfully!");
            } else {
              dispatch(
                addTask({
                  id: Date.now(),
                  ...values,
                })
              );
              toast.success("Task added successfully!");
            }
            resetForm();
            onClose();
          }}
          enableReinitialize
        >
          {() => {
            return (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  height: "fit-content",
                }}
              >
                <div>
                  <label htmlFor="title" className="font-semibold block mb-1">
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    // value={values.title}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage name="title" component={ErrorText} />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="font-semibold block mb-1"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    // value={values.description}
                    placeholder="Enter description"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage name="description" component={ErrorText} />
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="font-semibold block mb-1"
                  >
                    Priority
                  </label>
                  <Field
                    as="select"
                    id="priority"
                    name="priority"
                    // value={values.priority}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Field>
                </div>

                <div>
                  <label htmlFor="status" className="font-semibold block mb-1">
                    Status
                  </label>
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    // value={values.status}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </Field>
                </div>

                <div>
                  <label
                    htmlFor="assignee"
                    className="font-semibold block mb-1"
                  >
                    Assignee
                  </label>
                  <Field
                    id="assignee"
                    name="assignee"
                    placeholder="Enter assignee"
                    // value={values.assignee}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                  <ErrorMessage name="assignee" component={ErrorText} />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
