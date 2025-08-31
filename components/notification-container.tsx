"use client"

import { useState, useCallback } from "react"
import { Notification, type NotificationType } from "./notification"

interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  message: string
  autoClose?: boolean
  duration?: number
}

interface NotificationContainerProps {
  maxNotifications?: number
}

export function NotificationContainer({ maxNotifications = 5 }: NotificationContainerProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const addNotification = useCallback(
    (notification: Omit<NotificationItem, "id">) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newNotification = { ...notification, id }

      setNotifications((prev) => {
        const updated = [newNotification, ...prev]
        return updated.slice(0, maxNotifications)
      })
    },
    [maxNotifications],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  return (
    <div className="fixed top-20 md:top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div key={notification.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            isVisible={true}
            onClose={() => removeNotification(notification.id)}
            autoClose={notification.autoClose}
            duration={notification.duration}
          />
        </div>
      ))}
    </div>
  )
}

// Export hook for easy notification management
export function useNotifications() {
  const [container, setContainer] = useState<{
    addNotification: (notification: Omit<NotificationItem, "id">) => void
  } | null>(null)

  const showNotification = useCallback(
    (type: NotificationType, title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => {
      if (container) {
        container.addNotification({
          type,
          title,
          message,
          autoClose: options?.autoClose ?? true,
          duration: options?.duration ?? 5000,
        })
      }
    },
    [container],
  )

  return { showNotification, setContainer }
}
