import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, Shield, ShieldOff, Eye, Trash2, 
  Users, UserCheck, UserX, Mail, Phone, Calendar
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ManageUsers = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const [users, setUsers] = useState([
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0100',
      status: 'active',
      avatar: 'JD',
      joinDate: '2024-01-15',
      lastActive: '2024-03-15',
      consultations: 12,
      assignedDoctor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0101',
      status: 'active',
      avatar: 'JS',
      joinDate: '2024-02-03',
      lastActive: '2024-03-14',
      consultations: 8,
      assignedDoctor: 'Dr. Michael Chen'
    },
    {
      id: '3',
      fullName: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1-555-0102',
      status: 'blocked',
      avatar: 'BJ',
      joinDate: '2024-01-28',
      lastActive: '2024-03-10',
      consultations: 3,
      assignedDoctor: 'Dr. Emily Rodriguez'
    },
    {
      id: '4',
      fullName: 'Alice Williams',
      email: 'alice.williams@example.com',
      phone: '+1-555-0103',
      status: 'inactive',
      avatar: 'AW',
      joinDate: '2023-12-10',
      lastActive: '2024-02-28',
      consultations: 15,
      assignedDoctor: 'Dr. James Wilson'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus }
        : user
    ));
    
    toast({
      title: "Status Updated",
      description: `User has been ${newStatus} successfully.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User Removed",
      description: "User has been removed from the system.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-white';
      case 'inactive': return 'bg-secondary';
      case 'blocked': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
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
            Manage Users
          </h1>
          <p className="text-muted-foreground">
            View, block, unblock and manage user accounts
          </p>
        </div>
        
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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
          { label: 'Total Users', value: users.length, icon: Users },
          { label: 'Active', value: users.filter(u => u.status === 'active').length, icon: UserCheck },
          { label: 'Inactive', value: users.filter(u => u.status === 'inactive').length, icon: UserX },
          { label: 'Blocked', value: users.filter(u => u.status === 'blocked').length, icon: ShieldOff }
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

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="glass-effect hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{user.fullName}</h3>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Joined: {user.joinDate}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Assigned Doctor:</span> {user.assignedDoctor}
                        </div>
                        <div>
                          <span className="font-medium">Consultations:</span> {user.consultations}
                        </div>
                        <div>
                          <span className="font-medium">Last Active:</span> {user.lastActive}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    {user.status !== 'blocked' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusToggle(user.id, 'blocked')}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <ShieldOff className="h-4 w-4 mr-1" />
                        Block
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusToggle(user.id, 'active')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Unblock
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
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

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No users found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </motion.div>
      )}
    </div>
  );
};

export default ManageUsers;