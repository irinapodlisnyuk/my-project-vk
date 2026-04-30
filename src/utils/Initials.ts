export const getInitials = (name: string | undefined, surname: string | undefined): string => {
  const firstLetter = name ? name.trim().charAt(0) : "";
  const lastLetter = surname ? surname.trim().charAt(0) : "";
  
  const initials = firstLetter + lastLetter;

  return initials ? initials.toUpperCase() : "?";
};