import { create } from 'apisauce'
import Config from "react-native-config";

// API configuration
export const api = create({
  baseURL: Config.BASE_URL,
  headers: { Accept: 'application/vnd.github.v3+json' },
})