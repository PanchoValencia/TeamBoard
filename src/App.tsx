
import * as React from 'react'
import { Header } from "./Features/Header/Header"
import { ActionBar } from "./Features/ActionBar/ActionBar"
import { Board } from "./Features/Board/Board"
import styled from 'styled-components'
import { ModalRoot } from "./ModalRoot";
import { useThemeStore } from "./Store/ThemeStore";

const AppContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

function App() {
  const {setTheme} = useThemeStore()

  React.useEffect(() => {
    setTheme()
  }, [setTheme])

  return (
    <AppContainer>
      <Header />
      <ActionBar />
      <Board />
      <ModalRoot />
    </AppContainer>
  )
}

export default App
