import { create } from 'zustand'

const useNotificationStore = create(set => ({
  notification: null,
  actions: {
    notify: notification => {
      set(() => ({ notification }))
      setTimeout(() => set(() => ({ notification: null })), 5000)
    }
  }
}))

const useNotification = () => useNotificationStore(state => state.notification)
const useNotificationActions = () => useNotificationStore(state => state.actions)

export { useNotification, useNotificationActions }