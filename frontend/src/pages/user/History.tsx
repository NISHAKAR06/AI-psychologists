import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, Calendar, 
  Clock, FileText, Download, Filter, Activity, CheckCircle
} from 'lucide-react';

const History = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const consultationHistory = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      avatar: 'SJ',
      date: '2024-03-15',
      time: '3:00 PM',
      duration: '45 min',
      status: 'completed',
      notes: 'Regular checkup, blood pressure normal',
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      avatar: 'MC',
      date: '2024-03-10',
      time: '10:30 AM',
      duration: '30 min',
      status: 'completed',
      notes: 'Discussed symptoms, recommended rest',
    },
    {
      id: '3',
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      avatar: 'ER',
      date: '2024-03-05',
      time: '2:15 PM',
      duration: '25 min',
      status: 'completed',
      notes: 'Skin condition review, improvement noted',
    },
    {
      id: '4',
      doctor: 'Dr. James Wilson',
      specialty: 'Pediatrics',
      avatar: 'JW',
      date: '2024-02-28',
      time: '11:00 AM',
      duration: '40 min',
      status: 'completed',
      notes: 'Child development consultation',
    },
    {
      id: '5',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      avatar: 'SJ',
      date: '2024-02-20',
      time: '4:00 PM',
      duration: '35 min',
      status: 'cancelled',
      notes: 'Patient requested reschedule',
    }
  ];

  const filteredHistory = consultationHistory.filter(consultation =>
    consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.specialty.toLowerCase().includes(searchTerm.toLowerCase())
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
            {t('history')}
          </h1>
          <p className="text-muted-foreground">
            View your past consultations and medical history
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search consultations..."
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
          { label: 'Total Sessions', value: consultationHistory.length, icon: Activity },
          { label: 'Completed', value: consultationHistory.filter(c => c.status === 'completed').length, icon: CheckCircle },
          { label: 'This Month', value: '3', icon: Calendar },
          { label: 'Total Hours', value: '5.5h', icon: Clock }
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

      {/* History List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        {filteredHistory.map((consultation, index) => (
          <motion.div
            key={consultation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="glass-effect hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <img
                        src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${consultation.doctor}`}
                        alt={consultation.doctor}
                        className="rounded-full"
                      />
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">
                          {consultation.doctor}
                        </h3>
                        <Badge
                          variant={
                            consultation.status === "completed"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            consultation.status === "completed"
                              ? "bg-success"
                              : ""
                          }
                        >
                          {consultation.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {consultation.specialty}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{consultation.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{consultation.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4" />
                          <span>{consultation.duration}</span>
                        </div>
                      </div>

                      <p className="text-sm">{consultation.notes}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 lg:items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full lg:w-auto"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No consultations found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </motion.div>
      )}
    </div>
  );
};

export default History;
