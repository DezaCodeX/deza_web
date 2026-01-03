# Task: Add Status column (Resolved/Unresolved badges) and filter dropdown (Newest/Unresolved/Resolved) to admin dashboard

## Steps to Complete

- [ ] Import Badge from "@/components/ui/badge" and Select components (Select, SelectContent, SelectItem, SelectTrigger, SelectValue) from "@/components/ui/select" in DashboardPage.tsx.
- [ ] Add state: const [filter, setFilter] = useState<'newest' | 'unresolved' | 'resolved'>('newest');.
- [ ] Update fetchEnquiries function: Always include .order('created_at', { ascending: false }); If filter === 'unresolved', add .eq('contacted', false); If filter === 'resolved', add .eq('contacted', true); For 'newest', no eq (all enquiries).
- [ ] Update useEffect dependency to [filter] to refetch on filter change.
- [ ] After <h2>Recent Enquiries ({enquiries.length})</h2>, add a filter section: <div className="flex items-center gap-2"> <label>Filter by:</label> <Select value={filter} onValueChange={(value) => setFilter(value as typeof filter)}> <SelectTrigger className="w-[180px]"> <SelectValue placeholder="Newest" /> </SelectTrigger> <SelectContent> <SelectItem value="newest">Newest</SelectItem> <SelectItem value="unresolved">Unresolved</SelectItem> <SelectItem value="resolved">Resolved</SelectItem> </SelectContent> </Select> </div>.
- [ ] Update TableHeader: Insert <TableHead>Status</TableHead> after Phone TableHead, before View Details.
- [ ] In TableBody rows: Insert Status TableCell after Phone TableCell: <TableCell><Badge variant={enquiry.contacted ? "default" : "secondary"}>{enquiry.contacted ? 'Resolved' : 'Unresolved'}</Badge></TableCell>.
- [ ] In handleToggleContacted, after successful update, optionally refetchEnquiries() to ensure filter view updates, but optimistic state change should reflect in badges immediately.
- [ ] Test: Log in, load dashboard (default Newest shows all), switch filters (Unresolved/Resolved show filtered results ordered newest), status badges display correctly (default green for Resolved, secondary for Unresolved), toggle in modal updates badge and filter results dynamically, no errors in console.

## Follow-up
- Ensure Supabase RLS allows filtered SELECT (existing policy should cover).
- If needed, add loading spinner during filter refetch.
- Remove debugging console logs in fetchEnquiries once confirmed working.
- If badge colors need adjustment (e.g., red for Unresolved), iterate based on feedback.
