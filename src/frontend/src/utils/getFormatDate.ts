const getFormatDate = (originDate: string) => {
  const date = new Date(originDate);

  const yyyy = date.getFullYear();

  const m = date.getMonth() + 1;
  const mm = m < 10 ? `0${m}` : m;

  const d = date.getDate();
  const dd = d < 10 ? `0${d}` : d;

  const h = date.getHours() % 12;
  const min = date.getMinutes();
  const mins = min < 10 ? `0${min}` : min;

  return `${yyyy}.${mm}.${dd}. ${
    date.getHours() < 12 ? "오전" : "오후"
  } ${h}:${mins}`;
};

export default getFormatDate;
