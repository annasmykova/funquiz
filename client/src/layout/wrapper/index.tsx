import * as React from 'react'
import './index.scss'

type Props = {
  children: React.ReactNode
  withBg?: boolean
}

const Wrapper = ({ children, withBg }: Props) => (
  <div className={`wrapper ${withBg ? 'with-bg' : ''}`}>{children}</div>
)

export default Wrapper
