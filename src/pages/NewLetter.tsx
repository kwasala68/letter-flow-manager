
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
import { FileText, Calendar as CalendarIcon, Hash, Mail, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { AddressType } from "@/types";

export default function NewLetter() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [letterDate, setLetterDate] = useState<Date | undefined>();
  const [receivedDate, setReceivedDate] = useState<Date | undefined>();
  const [referenceNumber, setReferenceNumber] = useState("");
  const [from, setFrom] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addressType, setAddressType] = useState<AddressType>("direct");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate generating a letter ID
      const letterId = `LTR-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // In a real app, this would be an API call to create the letter
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Letter created successfully",
        description: `Letter "${title}" has been created with ID: ${letterId}`,
      });
      
      navigate("/assignments");
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Letter Date <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !letterDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {letterDate ? format(letterDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={letterDate}
                    onSelect={setLetterDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Received Date <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !receivedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {receivedDate ? format(receivedDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={receivedDate}
                    onSelect={setReceivedDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="referenceNumber">Reference Number <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="referenceNumber"
                  placeholder="Enter reference number"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="from">From Whom <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="from"
                  placeholder="Enter sender"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Letter Title <span className="text-destructive">*</span></Label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  placeholder="Enter letter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressType">Direct Address/As a copy <span className="text-destructive">*</span></Label>
              <Select value={addressType} onValueChange={(value) => setAddressType(value as AddressType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select address type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct Address</SelectItem>
                  <SelectItem value="copy">As a Copy</SelectItem>
                </SelectContent>
              </Select>
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
            <div className="relative">
              <File className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="attachment"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.jpg,.jpeg,.png"
                className="pl-9"
              />
            </div>
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
