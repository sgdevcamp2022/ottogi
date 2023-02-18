const getFormatTime = (date: Date) => {
  const d = new Date(date);

  const h = d.getHours();
  const ampm = h < 12 ? "오전" : "오후";
  const m = d.getMinutes();

  return `${ampm} ${h % 12}:${m}`;
};

export default getFormatTime;
