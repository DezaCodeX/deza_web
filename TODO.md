# TODO: Enhance Admin Enquiries Page

## Steps:
- [ ] Add 'contacted' boolean column (default false) to Supabase 'enquiries' table (user action via Supabase dashboard).
- [x] Update src/pages/admin/DashboardPage.tsx: Add 'contacted' field to interface, fetch it in query, add 'Contacted' column with status icon, add toggle button to update contacted status.
- [x] Add routing in src/App.tsx for /admin/dashboard with ProtectedRoute.
- [x] Verify changes: Run dev server, navigate to admin dashboard, check display and test toggle functionality.
