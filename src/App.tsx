import styled, { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import store from './store'
import reset from './shared/styles/reset'
import Questions from './Questions'

const GlobalStyle = createGlobalStyle`
  ${reset};
`

const Wrap = styled.div`
  background-color: var(--arsenic);
  height: 100vh;
  color: var(--white);
`

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Wrap>
          <GlobalStyle />
          <Questions />
        </Wrap>
      </ChakraProvider>
    </Provider>
  )
}

export default App
