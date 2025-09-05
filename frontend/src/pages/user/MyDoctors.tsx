import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Search, Video, Star, Filter,
  Clock, Calendar, Stethoscope, Heart, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyDoctors = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const assignedDoctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      status: 'online',
      nextAppointment: 'Today, 3:00 PM',
      totalConsultations: 12,
      lastConsultation: '2 days ago'
    },
    {
      id: '2', 
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      rating: 4.8,
      status: 'online',
      nextAppointment: 'Tomorrow, 10:00 AM',
      totalConsultations: 8,
      lastConsultation: '1 week ago'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      rating: 4.7,
      status: 'busy',
      nextAppointment: 'Friday, 2:00 PM',
      totalConsultations: 5,
      lastConsultation: '3 days ago'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Pediatrics',
      rating: 4.9,
      status: 'offline',
      nextAppointment: 'Next Monday, 11:00 AM',
      totalConsultations: 15,
      lastConsultation: '1 day ago'
    }
  ];

  const filteredDoctors = assignedDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {t('myDoctors')}
          </h1>
          <p className="text-muted-foreground">
            Manage your assigned doctors and consultations
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
          <Button variant="outline" size="default">
            <Filter className="h-4 w-4 mr-2" />
            Filter
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
          { label: 'Total Doctors', value: assignedDoctors.length, icon: Users },
          { label: 'Online Now', value: assignedDoctors.filter(d => d.status === 'online').length, icon: Heart },
          { label: 'This Month', value: '24', icon: Calendar },
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
                          variant={doctor.status === 'online' ? 'default' : doctor.status === 'busy' ? 'secondary' : 'outline'}
                          className={
                            doctor.status === 'online' ? 'bg-success text-white' :
                            doctor.status === 'busy' ? 'bg-warning' : ''
                          }
                        >
                          {doctor.status}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">{doctor.specialty}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-warning fill-current" />
                          <span>{doctor.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Stethoscope className="h-4 w-4" />
                          <span>{doctor.totalConsultations} consultations</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Last: {doctor.lastConsultation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 lg:items-end">
                    <div className="text-sm">
                      <p className="font-medium">Next Appointment</p>
                      <p className="text-muted-foreground">{doctor.nextAppointment}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link to="/dashboard/video-conference">
                        <Button size="sm" className="gradient-primary">
                          <Video className="h-4 w-4 mr-1" />
                          Video
                        </Button>
                      </Link>
                    </div>
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

export default MyDoctors;
