import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import type { AppProps } from 'next/app'

import 'assets/sass/app.scss'
import { wrapper } from '@redux/store'
import { appWithTranslation } from 'i18next-config'

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return <Component {...pageProps} />
}

const mapDispatchToProps = () => ({})

const withConnect = connect(null, mapDispatchToProps)

export default wrapper.withRedux(withConnect(appWithTranslation(MyApp)))
