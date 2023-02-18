const getFormatTime = (date: Date) => {
  const d = new Date(date);

  const h = d.getHours();
  const ampm = h < 12 ? "오전" : "오후";
  const m = d.getMinutes();
  const mm = m < 10 ? `0${m}` : m;

  return `${ampm} ${h % 12}:${mm}`;
};

export default getFormatTime;
