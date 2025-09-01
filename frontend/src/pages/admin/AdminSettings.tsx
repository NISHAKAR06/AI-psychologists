import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useToast } from '@/components/ui/use-toast';
import { 
  Settings, Bell, Shield, Database, Mail, 
  Server, Users, Clock, Save, RefreshCw
} from 'lucide-react';

const AdminSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'HealSpace',
    siteDescription: 'Healthcare Management Platform',
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    sessionTimeout: '30',
    maxFileSize: '10',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    systemAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordStrength: true,
    loginAttempts: '5',
    lockoutDuration: '15',
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated",
      description: "System settings have been saved successfully.",
    });
  };

  const handleSystemReset = () => {
    toast({
      title: "System Reset",
      description: "This action requires additional confirmation.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold gradient-primary bg-clip-text text-transparent">
          Admin Settings
        </h1>
        <p className="text-muted-foreground">
          Configure system settings, security, and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Configuration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={systemSettings.siteName}
                    onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={systemSettings.siteDescription}
                  onChange={(e) => setSystemSettings({...systemSettings, siteDescription: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <Switch
                    id="maintenance"
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, maintenanceMode: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="registration">Allow New Registrations</Label>
                  <Switch
                    id="registration"
                    checked={systemSettings.allowRegistrations}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, allowRegistrations: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="emailVerification">Require Email Verification</Label>
                  <Switch
                    id="emailVerification"
                    checked={systemSettings.requireEmailVerification}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, requireEmailVerification: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, [key]: checked})
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={security.loginAttempts}
                    onChange={(e) => setSecurity({...security, loginAttempts: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={security.lockoutDuration}
                    onChange={(e) => setSecurity({...security, lockoutDuration: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <Switch
                    id="twoFactor"
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecurity({...security, twoFactorAuth: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="passwordStrength">Strong Password Requirements</Label>
                  <Switch
                    id="passwordStrength"
                    checked={security.passwordStrength}
                    onCheckedChange={(checked) => 
                      setSecurity({...security, passwordStrength: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats & Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* System Stats */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>System Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Total Users', value: '1,234', icon: Users },
                { label: 'Active Doctors', value: '56', icon: Shield },
                { label: 'Daily Sessions', value: '89', icon: Clock },
                { label: 'Server Uptime', value: '99.9%', icon: Server }
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Theme</Label>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between">
                <Label>Language</Label>
                <LanguageToggle />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>System Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleSaveSettings} className="w-full gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
              
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Test Email
              </Button>
              
              <Button variant="outline" className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Backup Database
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleSystemReset}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset System
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;