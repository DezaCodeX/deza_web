# Task: Enhance admin panel with sidebar for Requests and Projects

## Steps to Complete

- [ ] Read src/App.tsx to understand current routing structure (e.g., /admin/* under AdminLayout with Outlet).
- [ ] Update src/components/admin/AdminLayout.tsx: Change sidebar nav from "Dashboard" to "Requests" (link to /admin/requests or /admin/dashboard), add "Projects" below (link to /admin/projects). Use NavLink for active states if possible, or simple <a> with hover.
- [ ] Create src/pages/admin/ProjectsPage.tsx: Similar to DashboardPage, fetch from Supabase 'projects' table (select *, order by created_at desc), display in Table with columns: Title, Description, Status (Badge: Active/Inactive or similar), Created At. Include loading, error, empty states. No modal/actions yet (stub for future).
- [ ] If needed, update src/App.tsx: Add route <Route path="/admin/projects" element={<ProjectsPage />} /> under admin routes (assuming nested under AdminLayout Outlet).
- [ ] Test: Log in, navigate to /admin/dashboard (Requests), verify enquiries; navigate to /admin/projects, verify table loads (empty if no data), no 404, sidebar links work, active highlighting.

## Follow-up
- If 'projects' table doesn't exist in Supabase, create it via SQL Editor (example: CREATE TABLE projects (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, title text, description text, status boolean DEFAULT false, created_at timestamp DEFAULT now());). Insert sample data if needed.
- Enhance ProjectsPage with modal, toggle status, delete similar to DashboardPage based on feedback.
- Style sidebar to match image (deza01.png): Add icons (e.g., from lucide-react: MessageCircle for Requests, Folder for Projects), adjust colors/padding if specified.
- Remove debugging console logs once confirmed.
