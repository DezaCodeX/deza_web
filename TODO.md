# TODO: Implement Enquiry Submission and Admin Display

## Steps to Complete

- [ ] **Database Setup (Manual User Action)**: Create the 'enquiries' table in Supabase dashboard using this SQL:
  ```
  CREATE TABLE enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    projectTitle TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```
  Optionally, enable RLS policies (e.g., allow public INSERT, authenticated SELECT).

- [x] **Install Dependencies**: Run `npm install @emailjs/browser` to add EmailJS library.

- [ ] **Environment Variables**: Add to .env (or .env.local):
  ```
  VITE_EMAILJS_SERVICE_ID=your_service_id
  VITE_EMAILJS_TEMPLATE_ID=your_template_id
  VITE_EMAILJS_PUBLIC_KEY=your_public_key
  VITE_RECIPIENT_EMAIL=admin@example.com
  ```
  User must set up EmailJS account, create service/template, and replace placeholders.

- [x] **Update EnquiryModal.tsx**: Integrate Supabase insert and EmailJS send in handleSubmit. Enhance with validation.

- [x] **Update DashboardPage.tsx**: Fetch enquiries from Supabase and display in a table using shadcn/ui components.

- [ ] **Testing**: 
  - Submit form via modal: Verify insert in Supabase and email sent.
  - View in admin dashboard: Confirm data fetches and displays.
  - Run `npm run dev` and check for errors.

## Notes
- Supabase client is already configured.
- Admin assumed protected; no auth changes needed.
- After all steps, update TODO.md to mark as [x] completed.

# TODO: Update Curated Works to Fetch from Supabase 'work' Table

## Steps to Complete

- [ ] **Database Setup (Manual User Action)**: Create the 'work' table in Supabase dashboard using this SQL:
  ```
  CREATE TABLE work (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Enable RLS for security
  ALTER TABLE work ENABLE ROW LEVEL SECURITY;

  -- Policy for public read access (adjust as needed for your auth setup)
  CREATE POLICY "Public read access" ON work FOR SELECT USING (true);
  ```
  Optionally, insert initial data using the provided INSERT statements below.

- [ ] **Insert Initial Data (Manual User Action)**: Run these INSERTs in Supabase SQL editor to populate with existing projects:
  ```
  INSERT INTO work (title, category, description, image_url, link) VALUES
  ('E-Commerce Platform', 'Web Development', 'A modern e-commerce solution with seamless checkout and inventory management.', 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60', '#'),
  ('SaaS Dashboard', 'UI/UX Design', 'Analytics dashboard with real-time data visualization and intuitive navigation.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60', '#'),
  ('Mobile Banking App', 'App Development', 'Secure and user-friendly mobile banking experience for modern users.', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60', '#'),
  ('Healthcare Portal', 'Web Development', 'Patient management system with appointment scheduling and telemedicine.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60', '#');
  ```

- [x] **Update WorkSection.tsx**: Add useState and useEffect to fetch clientProjects from Supabase 'work' table, replacing the hardcoded array. Handle loading/error states.

- [ ] **Testing**:
  - Ensure Supabase URL and anon key are set in .env (if not already).
  - Run `bun run dev` (or `npm run dev`).
  - Navigate to the works section and verify projects load from DB.
  - Check console for errors; test with browser_action if needed.

## Notes
- Supabase client is already configured in src/lib/supabaseClient.ts.
- Fetch only for clientProjects (curated works); studentProjects remain hardcoded.
- If RLS blocks reads, adjust policies or use authenticated session.
- After all steps, update TODO.md to mark as [x] completed.
