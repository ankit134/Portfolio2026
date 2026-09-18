import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollProgress from './components/ScrollProgress.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import RoutePageFallback from './components/RoutePageFallback.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import {
  AdminDashboard,
  AdminExperience,
  AdminLayout,
  AdminLogin,
  AdminMessages,
  AdminProfile,
  AdminProjects,
  AdminSkills,
  ProjectPage,
  ProjectsListPage,
} from './lazyPages.js'

const queryClient = new QueryClient()

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={routerBasename}>
        <ScrollProgress />
        <ScrollToTop />
        <Suspense fallback={<RoutePageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsListPage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
