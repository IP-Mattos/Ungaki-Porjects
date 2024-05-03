import * as React from 'react'

interface EmailTemplateProps {
  buttonUrl: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ buttonUrl }) => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#000',
        color: '#fff',
        display: 'grid',
        justifyItems: 'center'
      }}
    >
      <span style={{ textAlign: 'center' }}>Click here to change the password</span>
      <a href={buttonUrl} style={{ margin: '10px, auto' }}>
        <button>Change Password</button>
      </a>
    </div>
  )
}
