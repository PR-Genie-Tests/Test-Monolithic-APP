// Bug: Off-by-one errors
export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

// Bug: Incorrect calculation
export const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
