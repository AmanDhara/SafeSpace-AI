import { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useLanguage } from "@/hooks/use-language";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  therapist: {
    id: number;
    name: string;
    specialization: string;
  };
}

export default function BookingModal({ isOpen, onClose, therapist }: BookingModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!date || !time) {
      toast({
        title: t("missingInformation"),
        description: t("pleaseSelectDateTime"),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a new appointment
      const appointment = {
        therapistId: therapist.id,
        therapistName: therapist.name,
        specialization: therapist.specialization,
        userId: user?.id,
        date,
        time,
        status: "scheduled"
      };

      // Store in localStorage (in a real app, we would save to the database)
      const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      const updatedAppointments = [...existingAppointments, appointment];
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      // Show success message
      const successMsg = t("appointmentSuccessMessage")
        .replace("{therapist}", therapist.name)
        .replace("{date}", date)
        .replace("{time}", time);
        
      toast({
        title: t("appointmentBooked"),
        description: successMsg,
      });

      // Invalidate any related queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      
      // Close modal
      onClose();
    } catch (error) {
      toast({
        title: t("bookingFailed"),
        description: t("bookingFailedMessage"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="relative">
          <DialogTitle>{t("bookSessionWith")} {therapist.name}</DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            {t("selectDateAndTime")}
          </p>
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("date")}</label>
            <div className="relative">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("time")}</label>
            <div className="relative">
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10"
              />
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {t("confirmBooking")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}