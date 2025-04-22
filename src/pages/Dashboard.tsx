
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLetters } from "@/data/mockData";
import { Letter, LetterPriority, LetterStatus } from "@/types";
import { ArrowRight, Clock, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({ title, value, description, icon, className }: StatCardProps) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

interface LetterSummaryProps {
  letter: Letter;
}

const LetterSummary = ({ letter }: LetterSummaryProps) => {
  const getStatusColor = (status: LetterStatus): string => {
    switch (status) {
      case "new": return "bg-status-new";
      case "in-progress": return "bg-status-inProgress";
      case "completed": return "bg-status-completed";
      default: return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: LetterPriority): string => {
    switch (priority) {
      case "low": return "bg-priority-low";
      case "medium": return "bg-priority-medium";
      case "high": return "bg-priority-high";
      default: return "bg-gray-400";
    }
  };

  return (
    <Link to={`/letters/${letter.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(letter.priority)}`} />
              <span className="text-sm font-semibold">{letter.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(letter.status)}`} />
              <span className="text-xs capitalize">{letter.status.replace(/-/g, ' ')}</span>
            </div>
          </div>
          <h4 className="font-semibold line-clamp-1 mb-1">{letter.title}</h4>
          <p className="text-xs text-muted-foreground mb-2">From: {letter.from}</p>
          <div className="w-full bg-muted h-2 rounded-full mt-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${letter.percentComplete}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  
  // Filter letters based on user role
  const filteredLetters = mockLetters.filter(letter => {
    switch (user?.role) {
      case "data-entry":
        // Show all letters for data entry
        return true;
      case "general-manager":
        // Show all letters for general manager
        return true;
      case "department-manager":
        // Show letters for this department
        return letter.assignedDepartment === user.department;
      case "subject-clerk":
        // Show letters assigned to this clerk or their department
        return letter.assignedTo === user.id || 
              (letter.assignedDepartment === user.department);
      default:
        return false;
    }
  });

  // Get stats based on filtered letters
  const totalLetters = filteredLetters.length;
  const newLetters = filteredLetters.filter(l => l.status === "new").length;
  const inProgressLetters = filteredLetters.filter(l => 
    ["assigned-to-department", "assigned-to-clerk", "in-progress"].includes(l.status)
  ).length;
  const completedLetters = filteredLetters.filter(l => l.status === "completed").length;
  
  // Get high priority letters
  const highPriorityLetters = filteredLetters.filter(l => l.priority === "high");
  
  // Get recent letters
  const recentLetters = [...filteredLetters]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
          <p className="text-muted-foreground">
            Here's an overview of the letters in your purview
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Letters"
            value={totalLetters}
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="New Letters"
            value={newLetters}
            icon={<ArrowRight className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="In Progress"
            value={inProgressLetters}
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Completed"
            value={completedLetters}
            icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* High Priority Letters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-priority-high mr-2" />
                High Priority Letters
              </CardTitle>
              <CardDescription>Letters requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {highPriorityLetters.length > 0 ? (
                  highPriorityLetters.slice(0, 3).map(letter => (
                    <LetterSummary key={letter.id} letter={letter} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No high priority letters at the moment.</p>
                )}
                {highPriorityLetters.length > 3 && (
                  <Link 
                    to="/letters?priority=high"
                    className="text-sm text-primary hover:underline flex items-center mt-2"
                  >
                    View all high priority letters <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Letters */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Letters</CardTitle>
              <CardDescription>Latest letters added to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLetters.length > 0 ? (
                  recentLetters.map(letter => (
                    <LetterSummary key={letter.id} letter={letter} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No letters added recently.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
