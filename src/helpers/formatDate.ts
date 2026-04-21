export const formatDateTime = (
  dateString: string,
  format: "short" | "medium" | "long" = "medium"
) => {
  const date = new Date(dateString);

  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = monthsShort[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours().toLocaleString().padStart(2, "0");
  const minutes = date.getMinutes().toLocaleString().padStart(2, "0");
  const seconds = date.getSeconds().toLocaleString().padStart(2, "0");

  switch (format) {
    case "short":
      return `${day} ${month} ${year}`;

    case "medium":
      return `${day} ${month} ${year} ${hours}:${minutes}`;

    case "long":
      return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

    default:
      return `${day} ${month} ${year}`;
  }
};

export const formatTimeShort = (dateString: string) => {
  const date = formatDateTime(dateString, "short");
  return date;
};

export const formatTimeMid = (dateString: string) => {
  const date = formatDateTime(dateString, "medium");
  return date;
};

export const formatTimeDetail = (dateString: string) => {
  const date = formatDateTime(dateString, "long");
  return date;
};
export const today = () => {
  const today = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const todayDate = `${today}-${month}-${year}`;
  return todayDate;
};
export const startYear = () => {
  const year = new Date().getFullYear();
  const firstDate = new Date(year, 0, 1);
  const date = firstDate.toISOString();
  return date;
};

export const endYear = () => {
  const year = new Date().getFullYear();
  const lastDate = new Date(year + 1, 0, 0);
  const date = lastDate.toISOString();
  return date;
};

export const ISOParser = (e: string) => {
  const date = new Date(e).toISOString();

  return date;
};
export const DateInputParser = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
