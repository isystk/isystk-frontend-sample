import * as React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'

import { showOverlay, hideOverlay } from '@/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Portal from './portal'

interface IProps {
  parts: Promise<void>
  hideOverlay: Promise<void>
  children: Promise<void>
}

const Modal = (props: IProps) => {
  const { parts } = props

  const onClose = (e) => {
    e.preventDefault()
    props.hideOverlay()
  }

  return (
    <Portal>
      {parts.isShowOverlay && <div id="overlay-background"></div>}
      <div className={`isystk-overlay ${parts.isShowOverlay ? 'open' : ''}`}>
        <a href="#" onClick={onClose}>
          <span className="close">
            <FontAwesomeIcon icon={['far', 'times-circle']} />
          </span>
        </a>
        {props.children}
      </div>
    </Portal>
  )
}

const mapStateToProps = (state) => {
  return {
    parts: state.parts,
  }
}

const mapDispatchToProps = { showOverlay, hideOverlay }

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
