import React from 'react'
import styled from 'styled-components'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <img
        src="https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/618cb271c44a225f74e239d6_tumblr_n8gux98bRT1r6zgh0o1_500%20(1).gif"
        height="300px"
        width="300px"
        alt="Loader"
      />
    </Wrapper>
  )
}

export default PageLoader
