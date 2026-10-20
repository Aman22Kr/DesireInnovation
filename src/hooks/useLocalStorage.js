import { useEffect, useState } from 'react'
import { readStore, writeStore } from '../utils/storage'

export function useLocalStorage(key, fallback, validate) {
  const [value, setValue] = useState(() => readStore(key, fallback, validate))
  useEffect(() => {
    writeStore(key, value)
  }, [key, value])
  return [value, setValue]
}
