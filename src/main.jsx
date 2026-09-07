import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import ProjectsListPage from './pages/ProjectsListPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminProfile from './pages/admin/AdminProfile.jsx'
import AdminProjects from './pages/admin/AdminProjects.jsx'
import AdminExperience from './pages/admin/AdminExperience.jsx'
import AdminSkills from './pages/admin/AdminSkills.jsx'
import AdminMessages from './pages/admin/AdminMessages.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
