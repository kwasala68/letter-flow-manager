
import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FilePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { mockLetters } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Letter, LetterPriority, LetterStatus } from "@/types";

export default function LettersList() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LetterStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<LetterPriority | "all">("all");

  // Filter letters based on user role and filters
  const filteredLetters = useMemo(() => {
    // First filter by role
    let letters = [...mockLetters];
    
    if (user) {
      switch (user.role) {
        case "data-entry":
          // No filtering, see all letters
          break;
        case "general-manager":
          // No filtering, see all letters
          break;
        case "department-manager":
          // Only see letters for their department
          letters = letters.filter(letter => letter.assignedDepartment === user.department);
          break;
        case "subject-clerk":
          // Only see letters assigned to them or their department
          letters = letters.filter(
            letter => letter.assignedTo === user.id || letter.assignedDepartment === user.department
          );
          break;
      }
    }
    
    // Then apply filters
    return letters.filter(letter => {
      const matchesSearch = 
        letter.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        letter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        letter.from.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === "all" || letter.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || letter.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [user, searchQuery, statusFilter, priorityFilter]);

  // Get status badge color
  const getStatusBadge = (status: LetterStatus) => {
    switch (status) {
      case "new":
        return <Badge className="bg-status-new">New</Badge>;
      case "assigned-to-department":
        return <Badge className="bg-blue-400">Dept. Assigned</Badge>;
      case "assigned-to-clerk":
        return <Badge className="bg-purple-400">Clerk Assigned</Badge>;
      case "in-progress":
        return <Badge className="bg-status-inProgress">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-status-completed">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: LetterPriority) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-priority-high">High</Badge>;
      case "medium":
        return <Badge className="bg-priority-medium">Medium</Badge>;
      case "low":
        return <Badge className="bg-priority-low">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Letters</h1>
          
          {user?.role === "data-entry" && (
            <Link to="/letters/new">
              <Button>
                <FilePlus className="mr-2 h-4 w-4" />
                New Letter
              </Button>
            </Link>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, title, or sender..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as LetterStatus | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="assigned-to-department">Assigned to Department</SelectItem>
              <SelectItem value="assigned-to-clerk">Assigned to Clerk</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as LetterPriority | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Letters Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLetters.length > 0 ? (
                filteredLetters.map((letter) => (
                  <TableRow key={letter.id}>
                    <TableCell className="font-medium">
                      <Link to={`/letters/${letter.id}`} className="text-primary hover:underline">
                        {letter.id}
                      </Link>
                    </TableCell>
                    <TableCell>{letter.title}</TableCell>
                    <TableCell>{letter.from}</TableCell>
                    <TableCell>{getStatusBadge(letter.status)}</TableCell>
                    <TableCell>{getPriorityBadge(letter.priority)}</TableCell>
                    <TableCell>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${letter.percentComplete}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{letter.percentComplete}%</span>
                    </TableCell>
                    <TableCell>{letter.dueDate || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No letters found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
