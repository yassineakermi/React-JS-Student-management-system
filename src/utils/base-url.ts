const __DEV__ = process.env.NODE_ENV !== "production";

export const BASE_URL = __DEV__
  ? "http://localhost:8000"
  : "YOUR_PRODUCTION_API_URL";

export const API_URL = `${BASE_URL}/api/v1/students`;
