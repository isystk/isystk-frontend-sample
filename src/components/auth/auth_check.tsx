import React, { FC, useRef, useState, useEffect } from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import { Auth } from '../../store/StoreTypes'
import Router, { withRouter } from 'next/router'
import { URL } from '@/common/constants/url'

import { authCheck } from '@/actions'

interface OriginalProps {}

interface IProps {
  auth: Auth
  authCheck
  history
}

interface IState {
  loaded: boolean
}

const AuthCheck = (WrappedComponent: React.ComponentType<OriginalProps>) => {
  class AuthCheckHOC extends React.Component<IProps, IState> {
    // パスからパラメータを取得する
    static async getInitialProps({ pathname, query, asPath }) {
      return { pathname, query, asPath }
    }

    constructor(props) {
      super(props)
      this.state = {
        loaded: false,
      }
    }

    componentDidMount() {
      this.checkAuth()
    }

    async checkAuth() {
      await this.props.authCheck()

      // ログインしてなければログイン画面へとばす
      if (!this.props.auth.isLogin) {
        Router.push(URL.LOGIN + '?redirectUrl=' + window.location)
      } else {
        this.setState({ loaded: true })
      }
    }

    render() {
      if (!this.state.loaded) {
        return <React.Fragment>Loading...</React.Fragment>
      } else {
        return <WrappedComponent {...this.props} {...this.state} />
      }
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      auth: state.auth,
    }
  }

  const mapDispatchToProps = { authCheck }

  return connect(mapStateToProps, mapDispatchToProps)(AuthCheckHOC)
}

export default AuthCheck
