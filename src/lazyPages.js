import { lazy } from 'react'

export const ProjectsListPage = lazy(() => import('./pages/ProjectsListPage.jsx'))
export const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'))
export const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
export const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'))
export const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
export const AdminProfile = lazy(() => import('./pages/admin/AdminProfile.jsx'))
export const AdminProjects = lazy(() => import('./pages/admin/AdminProjects.jsx'))
export const AdminExperience = lazy(() => import('./pages/admin/AdminExperience.jsx'))
export const AdminSkills = lazy(() => import('./pages/admin/AdminSkills.jsx'))
export const AdminMessages = lazy(() => import('./pages/admin/AdminMessages.jsx'))
