
import * as React from 'react'
import { Header } from "./Features/Header/Header"
import { ActionBar } from "./Features/ActionBar/ActionBar"
import { Board } from "./Features/Board/Board"
import styled from 'styled-components'
import { ModalRoot } from "./ModalRoot";
import { useThemeStore } from "./Store/ThemeStore";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES, } from './Platform/Routes'
import { Login } from './Features/Login/Login';
import { ProtectedRoute } from './Platform/ProtectedRoute';
import { Register } from './Features/Register/Register';

const DashboardContainer = styled.div`
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
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.default}
          element={
            <ProtectedRoute>
              <Navigate to={ROUTES.dashboard} replace />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
        <Route
          path={ROUTES.dashboard}
          element={(
            <ProtectedRoute>
              <DashboardContainer>
                <Header />
                <ActionBar />
                <Board />
                <ModalRoot />
              </DashboardContainer>
            </ProtectedRoute>
          )}
        />

        {/* fallback */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to={ROUTES.dashboard} replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
