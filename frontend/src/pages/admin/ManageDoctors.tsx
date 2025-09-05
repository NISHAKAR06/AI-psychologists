import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Search, Plus, Edit, Trash2, UserCheck, UserX, 
  Star, Stethoscope, Users, Calendar, Phone, Mail
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ManageDoctors = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const [doctors, setDoctors] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@healspace.com',
      phone: '+1-555-0123',
      specialty: 'Cardiology',
      rating: 4.9,
      status: 'active',
      patients: 45,
      consultations: 234,
      joinDate: '2023-01-15',
      experience: '10 years'
    },
    {
      id: '2', 
      name: 'Dr. Michael Chen',
      email: 'michael.chen@healspace.com',
      phone: '+1-555-0124',
      specialty: 'General Medicine',
      rating: 4.8,
      status: 'active',
      patients: 52,
      consultations: 189,
      joinDate: '2023-02-20',
      experience: '8 years'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@healspace.com',
      phone: '+1-555-0125',
      specialty: 'Dermatology',
      rating: 4.7,
      status: 'inactive',
      patients: 38,
      consultations: 156,
      joinDate: '2023-03-10',
      experience: '6 years'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      email: 'james.wilson@healspace.com',
      phone: '+1-555-0126',
      specialty: 'Pediatrics',
      rating: 4.9,
      status: 'active',
      patients: 67,
      consultations: 298,
      joinDate: '2022-11-05',
      experience: '12 years'
    }
  ]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (doctorId: string) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, status: doctor.status === 'active' ? 'inactive' : 'active' }
        : doctor
    ));
    
    toast({
      title: "Status Updated",
      description: "Doctor status has been changed successfully.",
    });
  };

  const handleDeleteDoctor = (doctorId: string) => {
    setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    
    toast({
      title: "Doctor Removed",
      description: "Doctor has been removed from the system.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Manage Doctors
          </h1>
          <p className="text-muted-foreground">
            Add, edit, and manage doctor accounts and permissions
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Doctors', value: doctors.length, icon: Stethoscope },
          { label: 'Active', value: doctors.filter(d => d.status === 'active').length, icon: UserCheck },
          { label: 'Specialties', value: new Set(doctors.map(d => d.specialty)).size, icon: Star },
          { label: 'Avg Rating', value: '4.8', icon: Star }
        ].map((stat, index) => (
          <Card key={stat.label} className="glass-effect">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Doctors List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="glass-effect hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <img src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${doctor.id}`} alt={doctor.name} className="rounded-full" />
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <Badge 
                          variant={doctor.status === 'active' ? 'default' : 'secondary'}
                          className={doctor.status === 'active' ? 'bg-success text-white' : ''}
                        >
                          {doctor.status}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">{doctor.specialty} • {doctor.experience}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{doctor.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{doctor.patients} patients</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-warning fill-current" />
                          <span>{doctor.rating} rating</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Joined: {doctor.joinDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Stethoscope className="h-4 w-4" />
                          <span>{doctor.consultations} consultations</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusToggle(doctor.id)}
                      className={doctor.status === 'active' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                    >
                      {doctor.status === 'active' ? (
                        <>
                          <UserX className="h-4 w-4 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredDoctors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Stethoscope className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </motion.div>
      )}
    </div>
  );
};

export default ManageDoctors;
