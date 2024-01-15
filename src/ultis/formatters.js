export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

export const generatePlaceholderCard = (column) => {
  return {
    card_id: `${column.column_id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column.column_id,
    FE_PlaceholderCard: true,
  };
};
