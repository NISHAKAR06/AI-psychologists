import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, Filter, Download, Calendar, Clock, 
  Video, MessageCircle, Phone, Activity, FileText, Users, CheckCircle
} from 'lucide-react';

const HistoryLogs = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const interactionLogs = [
    {
      id: '1',
      user: 'John Doe',
      userAvatar: 'JD',
      doctor: 'Dr. Sarah Johnson',
      doctorAvatar: 'SJ',
      type: 'video',
      date: '2024-03-15',
      time: '3:00 PM',
      duration: '45 min',
      status: 'completed',
      notes: 'Regular cardiac checkup completed successfully'
    },
    {
      id: '2',
      user: 'Jane Smith',
      userAvatar: 'JS',
      doctor: 'Dr. Michael Chen',
      doctorAvatar: 'MC',
      type: 'chat',
      date: '2024-03-15',
      time: '2:30 PM',
      duration: '20 min',
      status: 'completed',
      notes: 'Follow-up discussion about medication'
    },
    {
      id: '3',
      user: 'Bob Johnson',
      userAvatar: 'BJ',
      doctor: 'Dr. Emily Rodriguez',
      doctorAvatar: 'ER',
      type: 'call',
      date: '2024-03-15',
      time: '1:15 PM',
      duration: '30 min',
      status: 'completed',
      notes: 'Skin condition consultation and treatment plan'
    },
    {
      id: '4',
      user: 'Alice Williams',
      userAvatar: 'AW',
      doctor: 'Dr. James Wilson',
      doctorAvatar: 'JW',
      type: 'video',
      date: '2024-03-15',
      time: '11:00 AM',
      duration: '40 min',
      status: 'completed',
      notes: 'Pediatric development assessment'
    },
    {
      id: '5',
      user: 'John Doe',
      userAvatar: 'JD',
      doctor: 'Dr. Sarah Johnson',
      doctorAvatar: 'SJ',
      type: 'video',
      date: '2024-03-14',
      time: '4:00 PM',
      duration: '0 min',
      status: 'cancelled',
      notes: 'Patient cancelled due to schedule conflict'
    }
  ];

  const filteredLogs = interactionLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'call': return Phone;
      case 'chat': return MessageCircle;
      default: return Activity;
    }
  };

  const exportLogs = () => {
    // Mock export functionality
    console.log('Exporting logs...');
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
            History Logs
          </h1>
          <p className="text-muted-foreground">
            Track all user-doctor interactions and activities
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={exportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
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
          { label: 'Total Sessions', value: interactionLogs.length, icon: Activity },
          { label: 'Today', value: interactionLogs.filter(l => l.date === '2024-03-15').length, icon: Calendar },
          { label: 'Video Calls', value: interactionLogs.filter(l => l.type === 'video').length, icon: Video },
          { label: 'Completed', value: interactionLogs.filter(l => l.status === 'completed').length, icon: CheckCircle }
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

      {/* Logs List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        {filteredLogs.map((log, index) => {
          const TypeIcon = getTypeIcon(log.type);
          
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="glass-effect hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex -space-x-2">
                        <Avatar className="h-12 w-12 border-2 border-background">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {log.userAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="h-12 w-12 border-2 border-background">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {log.doctorAvatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">
                            {log.user} ↔ {log.doctor}
                          </h3>
                          <Badge 
                            variant={log.status === 'completed' ? 'default' : 'destructive'}
                            className={log.status === 'completed' ? 'bg-success' : ''}
                          >
                            {log.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{log.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{log.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TypeIcon className="h-4 w-4" />
                            <span className="capitalize">{log.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Activity className="h-4 w-4" />
                            <span>{log.duration}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm">{log.notes}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {filteredLogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No logs found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </motion.div>
      )}
    </div>
  );
};

export default HistoryLogs;