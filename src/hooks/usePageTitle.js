import { useEffect } from 'react'
import { CONFIG } from '../config'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${CONFIG.brandName}` : `${CONFIG.brandName} · ${CONFIG.tagline}`
  }, [title])
}
