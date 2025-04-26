const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const highlightMatch = (text, searchText) => {
  if (!searchText) return text;

  const escapedSearch = escapeRegExp(searchText);
  const regex = new RegExp(`(${escapedSearch})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
};
