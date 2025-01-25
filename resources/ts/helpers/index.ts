export function formatTimestamp(input?: string | number): string {
    if (!input) return "";
    if (typeof input === "number") input = input * 1000;

    const date = new Date(input);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    const hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;

    return `${year}-${month}-${day} ${String(formattedHours).padStart(
        2,
        "0"
    )}:${minutes}:${seconds} ${period} UTC`;
}
