/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1320px",
        "3xl": "1440px",
        "4xl": "1600px",
      },
    },
    extend: {
      colors: {
        Primary_Color: "#007BFF",
        Secondary_Color: "#28A745 ",
        Accent_Color: "#FFC107 ",
        BG_Color: "#F8F9FA ",
        Dark_Gray: "#1e1e1e",
        Black_Clr: "#101010",
        Hover_Color: "#0056b3 ",
        Border_Color: "#EDEDED",
        White_Color: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
