export const unitChoices = Array.from({ length: 5 }, (_, index) => {
  const value = index + 1;
  return { id: value, name: `${value} Unit${value > 1 ? "s" : ""}` };
});
