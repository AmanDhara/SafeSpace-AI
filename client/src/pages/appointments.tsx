import { useState, useEffect } from "react";
import { Calendar, Clock, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";

// Type for our appointment
interface Appointment {
  therapistId: number;
  therapistName: string;
  specialization: string;
  userId: number | undefined;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

export default function AppointmentsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

  useEffect(() => {
    // Fetch appointments from localStorage
    const savedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    
    // Filter appointments for the current user
    const userAppointments = savedAppointments.filter(
      (appointment: Appointment) => appointment.userId === user?.id
    );
    
    setAppointments(userAppointments);
  }, [user]);

  const cancelAppointment = (index: number) => {
    const updatedAppointments = [...appointments];
    
    // Remove the appointment
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
    
    // Update localStorage
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const filteredAppointments = allAppointments.filter(
      (appointment: Appointment, i: number) => 
        !(appointment.userId === user?.id && 
          appointment.therapistName === appointments[index].therapistName && 
          appointment.date === appointments[index].date &&
          appointment.time === appointments[index].time)
    );
    
    localStorage.setItem("appointments", JSON.stringify(filteredAppointments));
    setAppointmentToDelete(null);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time to be more readable
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Group appointments by status
  const upcomingAppointments = appointments.filter(
    appointment => appointment.status === "scheduled"
  );
  
  const pastAppointments = appointments.filter(
    appointment => appointment.status === "completed"
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Appointments</h1>
        <p className="text-gray-600">
          Manage your scheduled therapy sessions and view your appointment history.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{appointment.therapistName}</CardTitle>
                    <CardDescription>{appointment.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{formatTime(appointment.time)}</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-50">Scheduled</Badge>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <AlertDialog open={appointmentToDelete === index} onOpenChange={() => setAppointmentToDelete(null)}>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-200"
                          onClick={() => setAppointmentToDelete(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel your appointment with {appointment.therapistName} on {formatDate(appointment.date)} at {formatTime(appointment.time)}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => cancelAppointment(index)}
                          >
                            Yes, Cancel Appointment
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
              <p className="text-gray-600 mb-4">
                You don't have any scheduled therapy sessions yet.
              </p>
              <Button onClick={() => window.location.href = '/therapists'}>
                Book a Session
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastAppointments.map((appointment, index) => (
                <Card key={index} className="border-l-4 border-l-gray-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{appointment.therapistName}</CardTitle>
                    <CardDescription>{appointment.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{formatTime(appointment.time)}</span>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">Completed</Badge>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Book Again
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No past appointments</h3>
              <p className="text-gray-600 mb-4">
                You haven't completed any therapy sessions yet.
              </p>
              <Button onClick={() => window.location.href = '/therapists'}>
                Book Your First Session
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}