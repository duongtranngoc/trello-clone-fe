export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column._Id,
    comlumId: column._id,
    FE_PlaceholderCard: true,
  };
};
