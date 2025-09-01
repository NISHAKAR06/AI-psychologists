import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, Clock, Calendar, Video, MessageCircle, 
  Activity, TrendingUp, Users, Phone, Stethoscope 
} from 'lucide-react';

const UserDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Mock data - replace with real API calls
  const stats = [
    {
      title: 'Available Doctors',
      value: '12',
      icon: Users,
      change: '+2 from yesterday',
      color: 'text-primary'
    },
    {
      title: 'Upcoming Appointments',
      value: '3',
      icon: Calendar,
      change: 'Next in 2 hours',
      color: 'text-success'
    },
    {
      title: 'Consultation Hours',
      value: '24.5h',
      icon: Clock,
      change: '+5h this month',
      color: 'text-warning'
    },
    {
      title: 'Health Score',
      value: '92%',
      icon: Activity,
      change: '+8% improvement',
      color: 'text-success'
    }
  ];

  const availableDoctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      status: 'online',
      avatar: 'SJ'
    },
    {
      id: '2', 
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      rating: 4.8,
      status: 'online',
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      rating: 4.7,
      status: 'busy',
      avatar: 'ER'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Pediatrics',
      rating: 4.9,
      status: 'online',
      avatar: 'JW'
    }
  ];

  const recentActivity = [
    {
      type: 'consultation',
      doctor: 'Dr. Sarah Johnson',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'message',
      doctor: 'Dr. Michael Chen',
      time: '1 day ago',
      status: 'read'
    },
    {
      type: 'appointment',
      doctor: 'Dr. Emily Rodriguez',
      time: '3 days ago',
      status: 'scheduled'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              {t('welcomeBack')}, {user?.fullName}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's your health dashboard overview
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button className="gradient-primary">
              <Video className="h-4 w-4 mr-2" />
              Quick Consultation
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-effect hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full bg-accent/20 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Available Doctors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="glass-effect">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                <span>{t('availableDoctors')}</span>
              </CardTitle>
              <Link to="/dashboard/doctors">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {doctor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={doctor.status === 'online' ? 'default' : 'secondary'}
                          className={doctor.status === 'online' ? 'bg-success' : ''}
                        >
                          {doctor.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ⭐ {doctor.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="gradient-primary">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>{t('recentActivity')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      {activity.type === 'consultation' && <Video className="h-4 w-4 text-primary" />}
                      {activity.type === 'message' && <MessageCircle className="h-4 w-4 text-primary" />}
                      {activity.type === 'appointment' && <Calendar className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} with {activity.doctor}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="glass-effect gradient-primary text-white">
          <CardContent className="p-8">
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 floating-animation" />
              <h3 className="text-2xl font-bold mb-2">Need Immediate Care?</h3>
              <p className="mb-6 opacity-90">
                Our doctors are available 24/7 for urgent consultations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Call
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Video className="h-4 w-4 mr-2" />
                  Instant Video Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserDashboard;