import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { Button, ThemeProvider } from '@react95/core'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <ThemeProvider>
        <StyledNotFound>
          <img
            alt="windoge-gif-footer"
            src="https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/618cfdef3579d6100d783a04_ezgif.com-gif-maker%20(5).gif"
            height="250px"
            width="250px"
            style={{ margin: '32px' }}
          />
          <Heading scale="xxl">404</Heading>
          <Text mb="16px">{t('Oops, page not found.')}</Text>
          <Link to="/">
            <Button>{t('Back Home')}</Button>
          </Link>
        </StyledNotFound>
      </ThemeProvider>
    </Page>
  )
}

export default NotFound
