let apiRoot = "";
if (process.env.BUILD_MODE === "development") {
  apiRoot = "http://localhost:2728";
}

if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://trello-clone-api-sxh5.onrender.com";
}

export const API_BASE = apiRoot;
