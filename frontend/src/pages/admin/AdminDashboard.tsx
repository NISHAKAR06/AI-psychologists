import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, UserCheck, Stethoscope, TrendingUp, 
  Activity, Clock, AlertTriangle, CheckCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Mock data - replace with real API calls
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: Users,
      change: '+12% from last month',
      color: 'text-primary'
    },
    {
      title: 'Active Doctors',
      value: '48',
      icon: Stethoscope,
      change: '+2 new this week',
      color: 'text-success'
    },
    {
      title: 'Online Now',
      value: '156',
      icon: UserCheck,
      change: '+8% from yesterday',
      color: 'text-warning'
    },
    {
      title: 'Total Consultations',
      value: '12,543',
      icon: Activity,
      change: '+24% this month',
      color: 'text-success'
    }
  ];

  const consultationData = [
    { month: 'Jan', consultations: 1200 },
    { month: 'Feb', consultations: 1400 },
    { month: 'Mar', consultations: 1100 },
    { month: 'Apr', consultations: 1600 },
    { month: 'May', consultations: 1800 },
    { month: 'Jun', consultations: 2000 }
  ];

  const userTypeData = [
    { name: 'Patients', value: 2543, color: '#3B82F6' },
    { name: 'Doctors', value: 48, color: '#10B981' },
    { name: 'Admins', value: 12, color: '#F59E0B' }
  ];

  const recentActivity = [
    {
      type: 'user_registered',
      user: 'John Doe',
      time: '5 minutes ago',
      status: 'new'
    },
    {
      type: 'doctor_online',
      user: 'Dr. Sarah Johnson',
      time: '12 minutes ago',
      status: 'active'
    },
    {
      type: 'consultation_completed',
      user: 'Dr. Michael Chen',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      type: 'system_alert',
      user: 'System',
      time: '2 hours ago',
      status: 'warning'
    }
  ];

  const onlineDoctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      patients: 12,
      status: 'available'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      patients: 8,
      status: 'busy'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      patients: 15,
      status: 'available'
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
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your HealSpace platform
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button className="gradient-primary">
              <Users className="h-4 w-4 mr-2" />
              Add Doctor
            </Button>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              View Reports
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultations Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Monthly Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={consultationData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="consultations" fill="hsl(var(--primary))" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Online Doctors & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Online Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <span>Online Doctors</span>
                </CardTitle>
                <Link to="/admin/doctors">
                  <Button variant="outline" size="sm">
                    Manage All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onlineDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <p className="text-xs text-muted-foreground">{doctor.patients} active patients</p>
                      </div>
                    </div>
                    <Badge 
                      variant={doctor.status === 'available' ? 'default' : 'secondary'}
                      className={doctor.status === 'available' ? 'bg-success' : 'bg-warning'}
                    >
                      {doctor.status}
                    </Badge>
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
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
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
                        {activity.type === 'user_registered' && <Users className="h-4 w-4 text-primary" />}
                        {activity.type === 'doctor_online' && <UserCheck className="h-4 w-4 text-success" />}
                        {activity.type === 'consultation_completed' && <CheckCircle className="h-4 w-4 text-success" />}
                        {activity.type === 'system_alert' && <AlertTriangle className="h-4 w-4 text-warning" />}
                      </div>
                      <div>
                        <p className="font-medium">
                          {activity.type.replace('_', ' ').charAt(0).toUpperCase() + 
                           activity.type.replace('_', ' ').slice(1)} - {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        activity.status === 'new' ? 'border-primary' :
                        activity.status === 'active' ? 'border-success' :
                        activity.status === 'completed' ? 'border-success' :
                        'border-warning'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="glass-effect gradient-success text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">System Status: Healthy</h3>
                </div>
                <p className="opacity-90 mb-4">
                  All systems are operational. Platform is running smoothly with 99.9% uptime.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-sm opacity-80">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">45ms</p>
                    <p className="text-sm opacity-80">Response Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm opacity-80">Active Issues</p>
                  </div>
                </div>
              </div>
              <TrendingUp className="h-16 w-16 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;