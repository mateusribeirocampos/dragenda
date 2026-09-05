import app from "./app.js";

const PORT = process.env.PORT || process.env.EXPO_PUBLIC_PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
