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
import { Loader2, CheckCircle, XCircle, Trash } from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";
import {
  Badge,
} from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'newest' | 'unresolved' | 'resolved'>('newest');

  const handleToggleContacted = async (id: string, currentContacted: boolean) => {
    // Optimistic update
    setEnquiries(prev =>
      prev.map(enquiry =>
        enquiry.id === id ? { ...enquiry, contacted: !currentContacted } : enquiry
      )
    );

    // Update selectedEnquiry if modal is open for this enquiry
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(prev => prev ? { ...prev, contacted: !currentContacted } : null);
    }

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
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(prev => prev ? { ...prev, contacted: currentContacted } : null);
      }
      setError('Failed to update contacted status.');
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic update
    setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));

    const { error: deleteError } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting enquiry:', deleteError);
      setError('Failed to delete enquiry.');
      // Revert by refetching
      fetchEnquiries();
    } else {
      // Close modal on successful delete
      setIsOpen(false);
      setSelectedEnquiry(null);
    }
  };

  const fetchEnquiries = async () => {
    try {
      console.log('Fetching enquiries...');
      let query = supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter === 'unresolved') {
        query = query.eq('contacted', false);
      } else if (filter === 'resolved') {
        query = query.eq('contacted', true);
      }

      const { data, error: fetchError } = await query;

      console.log('Supabase response:', { data, fetchError });

      if (fetchError) {
        console.error('Error fetching enquiries:', fetchError);
        setError('Failed to load enquiries.');
      } else {
        console.log('Fetched enquiries data:', data);
        setEnquiries(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Enquiries ({enquiries.length})</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by:</span>
            <Select value={filter} onValueChange={(value) => setFilter(value as 'newest' | 'unresolved' | 'resolved')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {enquiries.length === 0 ? (
          <p className="text-muted-foreground">No enquiries yet.</p>
        ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>View Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">{enquiry.name}</TableCell>
                  <TableCell>{enquiry.email}</TableCell>
                  <TableCell>{enquiry.phone}</TableCell>
                  <TableCell>
                    <Badge variant={enquiry.contacted ? "default" : "secondary"}>
                      {enquiry.contacted ? 'Resolved' : 'Unresolved'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <UIButton
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedEnquiry(enquiry);
                        setIsOpen(true);
                      }}
                    >
                      View Details
                    </UIButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        )}

        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setSelectedEnquiry(null);
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Enquiry Details</DialogTitle>
              <DialogDescription>
                {selectedEnquiry && (
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                    <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                    <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                    {selectedEnquiry.project_title && (
                      <p><strong>Project Title:</strong> {selectedEnquiry.project_title}</p>
                    )}
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedEnquiry && (
                <>
                  <div>
                    <strong>Message:</strong>
                    <div className="mt-1 p-3 bg-muted rounded-md whitespace-pre-wrap">
                      {selectedEnquiry.message}
                    </div>
                  </div>
                  <div>
                    <strong>Submitted At:</strong>
                    <p className="mt-1">{new Date(selectedEnquiry.created_at).toLocaleDateString()}</p>
                  </div>
                </>
              )}
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Resolved</span>
                {selectedEnquiry && (
                  <div className="flex items-center gap-2">
                    {selectedEnquiry.contacted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <UIButton
                      variant="ghost"
                      size="sm"
                      onClick={() => selectedEnquiry && handleToggleContacted(selectedEnquiry.id, !!selectedEnquiry.contacted)}
                      className="h-6 w-6 p-0"
                    >
                      <CheckCircle className="h-3 w-3" />
                    </UIButton>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <UIButton
                  variant="destructive"
                  size="sm"
                  onClick={() => selectedEnquiry && handleDelete(selectedEnquiry.id)}
                >
                  Delete
                </UIButton>
                <UIButton
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </UIButton>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DashboardPage;
