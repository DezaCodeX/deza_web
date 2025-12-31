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
