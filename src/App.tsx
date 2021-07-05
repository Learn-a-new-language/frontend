import styled, { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import store from './store'
import reset from './shared/styles/reset'
import Questions from './Questions'

const GlobalStyle = createGlobalStyle`
  ${reset};
`

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333131;
  height: 100vh;
  color: var(--white);
`

function App() {
  return (
    <Provider store={store}>
      <Wrap>
        <GlobalStyle />
        <Questions />
      </Wrap>
    </Provider>
  )
}

export default App
