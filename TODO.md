# TODO: Remove Project Title from Enquiry Modal

## Steps to Complete:

1. **Update TODO.md**: Initialize or update this file with the task steps. [Completed]

2. **Edit src/components/EnquiryModal.tsx**:
   - Remove `projectTitle: ""` from initial formData state.
   - Remove trimmedProjectTitle validation and update the if condition in handleSubmit.
   - Remove the entire Project Title input div from JSX.
   - Remove `projectTitle: ""` from form reset in setTimeout.
   [Completed]

3. **Verify Changes**:
   - Run the app and test the modal form to ensure Project Title is gone and submission works for remaining fields.
   [In Progress - Dev server running on localhost:8082; launching browser for interaction testing]

4. **Backend Fix for Submission Error**:
   - The frontend removal is complete, but Supabase 'enquiries' table requires 'projectTitle' as NOT NULL.
   - Run SQL in Supabase dashboard: ALTER TABLE enquiries ALTER COLUMN projectTitle DROP NOT NULL;
   [Pending - User to apply]
5. **Complete Task**: Mark all steps done and present final result.
   [Pending]
