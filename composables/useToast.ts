import type { HTMLAttributes } from 'vue'

export interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  class?: HTMLAttributes['class']
}

const toasts = ref<ToastProps[]>([])

let toastCounter = 0

export const useToast = () => {
  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = `toast-${++toastCounter}`
    const newToast: ToastProps = {
      id,
      ...toast
    }
    
    toasts.value.push(newToast)
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
    
    return id
  }
  
  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const toast = {
    success: (message: string, title?: string) => {
      return addToast({
        title,
        description: message,
        variant: 'default'
      })
    },
    error: (message: string, title?: string) => {
      return addToast({
        title: title || 'Error',
        description: message,
        variant: 'destructive'
      })
    },
    info: (message: string, title?: string) => {
      return addToast({
        title,
        description: message,
        variant: 'default'
      })
    }
  }
  
  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    toast
  }
}
