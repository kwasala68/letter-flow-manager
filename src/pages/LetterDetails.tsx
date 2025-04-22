
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockLetters, mockUsers } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function LetterDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const letter = mockLetters.find((l) => l.id === id);
  
  if (!letter) {
    return (
      <AppLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Letter not found</h1>
        </div>
      </AppLayout>
    );
  }

  const departmentClerks = mockUsers.filter(
    (u) => u.role === "subject-clerk" && u.department === letter.assignedDepartment
  );

  const canAssignToClerk = 
    user?.role === "department-manager" && 
    user?.department === letter.assignedDepartment;

  const handleAssignToClerk = (clerkId: string) => {
    // In a real app, this would be an API call
    console.log(`Assigning letter ${letter.id} to clerk ${clerkId}`);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Letter Details</h1>
          {letter.attachmentUrl && (
            <Button onClick={() => window.open(letter.attachmentUrl!, "_blank")}>
              <FileText className="mr-2" />
              View Attachment
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Letter Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Letter ID</p>
              <p className="font-medium">{letter.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reference Number</p>
              <p className="font-medium">{letter.referenceNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Letter Date</p>
              <p className="font-medium">{letter.letterDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Received Date</p>
              <p className="font-medium">{letter.receivedDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-medium">{letter.from}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address Type</p>
              <Badge>{letter.addressType}</Badge>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Title</p>
              <p className="font-medium">{letter.title}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{letter.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline">{letter.status}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Priority</p>
              <Badge variant="outline">{letter.priority}</Badge>
            </div>
          </CardContent>
        </Card>

        {canAssignToClerk && departmentClerks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Assign to Clerk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Select onValueChange={handleAssignToClerk}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a clerk" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentClerks.map((clerk) => (
                      <SelectItem key={clerk.id} value={clerk.id}>
                        {clerk.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
