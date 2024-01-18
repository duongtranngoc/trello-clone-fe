export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column.columnId}-placeholder-card`,
    boardId: column.boardId,
    columnId: column.columnId,
    FE_PlaceholderCard: true,
  };
};
