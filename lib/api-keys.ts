export const API_KEYS = {
  first: "68bf4d2085msh57e7c644647c6cep1f7259jsnb8370da6c478",
  second: "", // Add more keys here
  third: "", // Add more keys here
  fourth: "", // Add more keys here
} as const

export type ApiKeyName = keyof typeof API_KEYS

// Track key usage and health
interface KeyStats {
  name: ApiKeyName
  lastUsed: number
  failures: number
  successes: number
  isHealthy: boolean
}

let currentKeyIndex = 0
const keyNames: ApiKeyName[] = Object.keys(API_KEYS) as ApiKeyName[]
const keyStats: Map<ApiKeyName, KeyStats> = new Map()

// Initialize key stats
keyNames.forEach((name) => {
  keyStats.set(name, {
    name,
    lastUsed: 0,
    failures: 0,
    successes: 0,
    isHealthy: true,
  })
})

export function getCurrentApiKey(): string {
  const keyName = keyNames[currentKeyIndex]
  const key = API_KEYS[keyName]

  if (!key) {
    // Move to next key if current is empty
    rotateApiKey()
    return getCurrentApiKey()
  }

  // Update last used timestamp
  const stats = keyStats.get(keyName)
  if (stats) {
    stats.lastUsed = Date.now()
  }

  return key
}

export function rotateApiKey(): void {
  const maxAttempts = keyNames.length
  let attempts = 0

  do {
    currentKeyIndex = (currentKeyIndex + 1) % keyNames.length
    const keyName = keyNames[currentKeyIndex]
    const key = API_KEYS[keyName]
    const stats = keyStats.get(keyName)

    // Skip empty keys or recently failed keys
    if (key && stats?.isHealthy) {
      break
    }

    attempts++
  } while (attempts < maxAttempts)
}

export function getApiKeyName(): ApiKeyName {
  return keyNames[currentKeyIndex]
}

export function recordSuccess(keyName?: ApiKeyName): void {
  const name = keyName || getApiKeyName()
  const stats = keyStats.get(name)
  if (stats) {
    stats.successes++
    stats.isHealthy = true
    stats.failures = Math.max(0, stats.failures - 1) // Reduce failure count on success
  }
}

export function recordFailure(keyName?: ApiKeyName): void {
  const name = keyName || getApiKeyName()
  const stats = keyStats.get(name)
  if (stats) {
    stats.failures++
    // Mark as unhealthy after 3 consecutive failures
    if (stats.failures >= 3) {
      stats.isHealthy = false
      // Reset health after 5 minutes
      setTimeout(
        () => {
          if (stats) {
            stats.isHealthy = true
            stats.failures = 0
          }
        },
        5 * 60 * 1000,
      )
    }
  }
}

export function getKeyStats(): KeyStats[] {
  return Array.from(keyStats.values())
}

export function getHealthyKeyCount(): number {
  return Array.from(keyStats.values()).filter((stats) => stats.isHealthy && API_KEYS[stats.name]).length
}
