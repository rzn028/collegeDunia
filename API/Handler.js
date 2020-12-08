import { create } from 'apisauce'
import Config from "react-native-config";

// API configuration
export const api = create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  headers: { Accept: 'application/vnd.github.v3+json' },
})