  // Функция для красивого вывода времени (например, 134 мин -> 2 ч 14 мин)
   export const formatRuntime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} ч ${minutes} мин`;
  };
