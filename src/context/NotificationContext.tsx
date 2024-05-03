'use client'

import { StatusNotification } from '@/Interface'
import { Notification } from '@/components/Notfication'
import React, { createContext, useState } from 'react'

interface IState {
  open: boolean
  status: StatusNotification
  msj: string | null
}

interface INotification {
  showNotification: (props: IState) => void
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const defaultIState: IState = {
  open: false,
  status: null,
  msj: null
}

export const NotificationContext = createContext<INotification>({} as INotification)

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notification, setNotification] = useState<IState>(defaultIState)

  const showNotification = (props: IState) => {
    if (props) {
      setNotification(props)
      setTimeout(() => {
        setNotification({ open: false, msj: null, status: null })
      }, 3000)
    }
  }

  return (
    <NotificationContext.Provider value={{ ...notification, showNotification }}>
      {children}
      {notification.open && (
        <>
          <Notification status={notification.status} msj={notification.msj}></Notification>
        </>
      )}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
