const STORAGE_KEY = "tasks";

export const saveTasksToLocalStorage = (tasks: any[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

export const loadTasksFromLocalStorage = (): any[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
};
