export function formatDaysAgo(date: string | Date | undefined): string {
  if (!date) return "Data não disponível";

  try {
    let dateObj: Date;
    if (typeof date === "string") {
      if (
        date.includes("T") &&
        !date.includes("Z") &&
        !date.includes("+") &&
        !date.includes("-", 10)
      ) {
        dateObj = new Date(date + "Z");
      } else {
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }

    if (isNaN(dateObj.getTime())) return "Data inválida";

    const now = new Date();
    const todayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const publishDateUTC = new Date(
      Date.UTC(
        dateObj.getUTCFullYear(),
        dateObj.getUTCMonth(),
        dateObj.getUTCDate()
      )
    );
    const diffTime = todayUTC.getTime() - publishDateUTC.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      if (diffDays >= -1) return "hoje";
      if (diffDays >= -30) return `há ${Math.abs(diffDays)} dias`;
      const day = String(publishDateUTC.getUTCDate()).padStart(2, "0");
      const month = String(publishDateUTC.getUTCMonth() + 1).padStart(2, "0");
      const year = publishDateUTC.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }

    if (diffDays === 0) {
      const hoursDiff = Math.floor(
        (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60)
      );
      if (hoursDiff < 0) return "hoje";
      if (hoursDiff === 0) {
        const minutesDiff = Math.floor(
          (now.getTime() - dateObj.getTime()) / (1000 * 60)
        );
        if (minutesDiff <= 1) return "há poucos instantes";
        return `há ${minutesDiff} minutos`;
      }
      if (hoursDiff === 1) return "há 1 hora";
      return `há ${hoursDiff} horas`;
    }

    if (diffDays === 1) return "há 1 dia";
    return `há ${diffDays} dias`;
  } catch {
    return "Data inválida";
  }
}

export function formatDateOnly(date: string | Date | undefined): string {
  if (!date) return "Data não disponível";
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "Data inválida";
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return "Data inválida";
  }
}
