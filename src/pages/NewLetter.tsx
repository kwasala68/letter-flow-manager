
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { LetterPriority } from "@/types";

export default function NewLetter() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [priority, setPriority] = useState<LetterPriority>("medium");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to create the letter
      // Simulate a network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Letter created successfully",
        description: `Letter "${title}" has been created and assigned letter ID: LTR-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      });
      
      // Navigate to the letters list
      navigate("/letters");
    } catch (error) {
      console.error(error);
      
      toast({
        variant: "destructive",
        title: "Error creating letter",
        description: "There was a problem creating the letter. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout requiredRole="data-entry">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Create New Letter</h1>
          <p className="text-muted-foreground">
            Enter the details of the new letter to register it in the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Letter Title <span className="text-destructive">*</span></Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter letter title"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from">Letter From <span className="text-destructive">*</span></Label>
              <Input 
                id="from" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)} 
                placeholder="Enter sender information"
                required 
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority <span className="text-destructive">*</span></Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as LetterPriority)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter letter description"
              className="min-h-32"
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment (PDF, Image)</Label>
            <Input 
              id="attachment" 
              type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate("/letters")}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Letter"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
