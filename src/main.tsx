import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import MyTabs from "./pages/MyTabs.tsx";
import {MantineProvider, MantineTheme} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import FaResult from "./pages/FaResult.tsx";
import MaResult from "./pages/MaResult.tsx";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MyTabs />,
  },
  {
    path: '/fa-result',
    element: <FaResult />,
  },
  {
    path: '/ma-result',
    element: <MaResult/>,
  }
]

const router = createBrowserRouter(routes);

const theme: MantineTheme= {
  primaryShade: 5,
  colors: {
    taipeiMain: [
      '#EDF8FA',
      '#DBF1F5',
      '#B4E2EA',
      '#93D4DF',
      '#71C5D5',
      '#5AB4C5',
      '#468D9B',
      '#356C77',
      '#22474E',
      '#112629',
      '#081315',
    ],
    taipeiGray: [
      '#6B6363',
      '#6B6363',
      '#6B6363',
      '#6B6363',
      '#6B6363',
      '#6B6363',
      '#6B6363',
      '#6B6363',
      '#6B6363',
      '#6B6363',
    ]
  },
  primaryColor: 'taipeiMain',
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router}/>
    </MantineProvider>
  </StrictMode>,
)
