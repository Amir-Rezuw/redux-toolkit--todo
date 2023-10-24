/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "bg-color": "#f3f4f6",
      "text-700": "#374151",
      "text-400": "#94a3b8",
      "text-100": "#f3f4f6",
      "text-300": "#cbd5e1",
      white: "#fff",
      "primary-700": "#4338ca",
      "primary-600": "#4f46e5",
      "primary-100": "#e0e7ff",
      danger: "#DC3545",
      warning: "#FFC124",
    },
    flex: {
      3: "3",
    },
    extend: {},
  },
  plugins: [],
};
