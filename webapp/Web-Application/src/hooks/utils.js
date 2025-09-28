// export function formatDate(dateString) {
//     // format date nicely
//     // example: from this 👉 2025-05-20 to this 👉 May 20, 2025
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   }

// utils.js
// export function formatDate(dateString) {
//   const date = new Date(dateString);

//   return date.toLocaleString("en-PH", {
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// }

export function formatDate(dateString) {
  const date = new Date(dateString);

  // manually add 8 more hours to "fix" the backend mistake
  // date.setHours(date.getHours() + 8);

  return date.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });
}