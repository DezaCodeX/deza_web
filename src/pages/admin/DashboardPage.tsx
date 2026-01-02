import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_title?: string;
  message: string;
  created_at: string;
  contacted?: boolean;
}

const DashboardPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleToggleContacted = async (id: string, currentContacted: boolean) => {
    // Optimistic update
    setEnquiries(prev =>
      prev.map(enquiry =>
        enquiry.id === id ? { ...enquiry, contacted: !currentContacted } : enquiry
      )
    );

    const { error: updateError } = await supabase
      .from('enquiries')
      .update({ contacted: !currentContacted })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating contacted status:', updateError);
      // Revert optimistic update
      setEnquiries(prev =>
        prev.map(enquiry =>
          enquiry.id === id ? { ...enquiry, contacted: currentContacted } : enquiry
        )
      );
      setError('Failed to update contacted status.');
    }
  };

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Error fetching enquiries:', fetchError);
          setError('Failed to load enquiries.');
        } else {
          setEnquiries(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage enquiries and projects</p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Enquiries ({enquiries.length})</h2>
        {enquiries.length === 0 ? (
          <p className="text-muted-foreground">No enquiries yet.</p>
        ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Contacted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">{enquiry.name}</TableCell>
                  <TableCell>{enquiry.email}</TableCell>
                  <TableCell>{enquiry.phone}</TableCell>
                  <TableCell>{enquiry.project_title || 'N/A'}</TableCell>
                  <TableCell className="max-w-md truncate">{enquiry.message}</TableCell>
                  <TableCell>
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {enquiry.contacted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <UIButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleContacted(enquiry.id, !!enquiry.contacted)}
                      className="h-6 w-6 p-0"
                    >
                      <CheckCircle className="h-3 w-3" />
                    </UIButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
