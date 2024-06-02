import { getLocalStorageData } from "@/lib/local-storage"

export const AuthType = {
  AUTH_LOCALSTORAGE_KEY: "accessToken",
}

export async function _fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getLocalStorageData(AuthType.AUTH_LOCALSTORAGE_KEY)}`,
    },
  })
}

export async function _globalFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
}
