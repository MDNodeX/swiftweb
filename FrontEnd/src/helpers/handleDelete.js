export const deleteData = async (endpoint) => {
  const confirmDelete = confirm("Are you sure you want to delete?");
  if (!confirmDelete) return false;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || response.statusText);
    }

    return true; // success
  } catch (error) {
    console.error("Delete Error:", error);
    return false;
  }
};
