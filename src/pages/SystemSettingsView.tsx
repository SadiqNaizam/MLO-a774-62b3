import React, { useState } from 'react';
import WindowFrame from '@/components/window/WindowFrame';
import Sidebar from '@/components/shared/Sidebar';
import SettingsCategoryListItem from '@/components/settings/SettingsCategoryListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Wifi, Bluetooth, Users, Display, SoundLoud, MousePointer, Keyboard, Wallpaper, Bell } from 'lucide-react';

const settingsCategories = [
  { id: 'general', label: 'General', icon: <Wallpaper size={18}/>, description: "Appearance, Accent color" },
  { id: 'display', label: 'Display', icon: <Display size={18}/>, description: "Resolution, Brightness" },
  { id: 'sound', label: 'Sound', icon: <SoundLoud size={18}/>, description: "Output, Input volume" },
  { id: 'network', label: 'Network', icon: <Wifi size={18}/>, description: "Wi-Fi, Ethernet" },
  { id: 'bluetooth', label: 'Bluetooth', icon: <Bluetooth size={18}/>, description: "Manage devices" },
  { id: 'users', label: 'Users & Groups', icon: <Users size={18}/>, description: "Accounts, Login items" },
  { id: 'mouse', label: 'Mouse & Trackpad', icon: <MousePointer size={18}/>, description: "Tracking, Gestures" },
  { id: 'keyboard', label: 'Keyboard', icon: <Keyboard size={18}/>, description: "Shortcuts, Input sources" },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18}/>, description: "App alerts, Do Not Disturb" },
];

const SystemSettingsView = () => {
  console.log('SystemSettingsView loaded');
  const [activeCategory, setActiveCategory] = useState('general');
  
  // Mock state for settings
  const [darkMode, setDarkMode] = useState(false);
  const [brightness, setBrightness] = useState([75]);
  const [resolution, setResolution] = useState('1920x1080');
  const [volume, setVolume] = useState([50]);


  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'general':
        return (
          <div className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Appearance</h3>
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="accent-color" className="block mb-1 text-sm font-medium">Accent Color</Label>
              <Select defaultValue="blue">
                <SelectTrigger id="accent-color" className="w-[180px]">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="desktop-image" className="block mb-1 text-sm font-medium">Desktop Image URL</Label>
                <Input id="desktop-image" defaultValue="https://source.unsplash.com/random/1920x1080/?nature" />
            </div>
          </div>
        );
      case 'display':
        return (
          <div className="space-y-6 p-6">
            <div>
              <Label htmlFor="brightness" className="block mb-1 text-sm font-medium">Brightness: {brightness[0]}%</Label>
              <Slider id="brightness" defaultValue={[75]} max={100} step={1} onValueChange={setBrightness} />
            </div>
            <div>
              <Label htmlFor="resolution" className="block mb-1 text-sm font-medium">Resolution</Label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger id="resolution" className="w-[200px]">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1280x720">1280 x 720</SelectItem>
                  <SelectItem value="1920x1080">1920 x 1080 (Recommended)</SelectItem>
                  <SelectItem value="2560x1440">2560 x 1440</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <h3 className="text-lg font-medium mb-2 mt-4">Night Shift</h3>
              <div className="flex items-center space-x-2">
                <Switch id="night-shift" />
                <Label htmlFor="night-shift">Enable Night Shift</Label>
              </div>
            </div>
          </div>
        );
      case 'sound':
         return (
          <div className="space-y-6 p-6">
            <div>
              <Label htmlFor="output-volume" className="block mb-1 text-sm font-medium">Output Volume: {volume[0]}%</Label>
              <Slider id="output-volume" defaultValue={[50]} max={100} step={1} onValueChange={setVolume} />
            </div>
            <div>
                <Label className="block mb-1 text-sm font-medium">Output Device</Label>
                <Select defaultValue="internal-speakers">
                    <SelectTrigger className="w-[250px]"> <SelectValue placeholder="Select device"/> </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="internal-speakers">Internal Speakers</SelectItem>
                        <SelectItem value="headphones">Headphones</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="block mb-1 text-sm font-medium mt-4">Sound Effects</Label>
                 <RadioGroup defaultValue="default-beep" className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default-beep" id="r1" />
                        <Label htmlFor="r1">Default Beep</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom-alert" id="r2" />
                        <Label htmlFor="r2">Custom Alert Sound</Label>
                    </div>
                </RadioGroup>
            </div>
          </div>
        );
      default:
        return <div className="p-6 text-gray-500">Select a category to see its settings. ({activeCategory})</div>;
    }
  };

  return (
    <div className="p-10 bg-slate-300 h-screen flex items-center justify-center"> {/* Mock page background */}
      <WindowFrame title="System Settings" initialSize={{ width: '750px', height: '550px' }}>
        <div className="flex h-full">
          <Sidebar title="Settings" widthClass="w-64" className="bg-gray-100/80">
            {settingsCategories.map(cat => (
              <SettingsCategoryListItem
                key={cat.id}
                id={cat.id}
                label={cat.label}
                icon={cat.icon}
                description={cat.description}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </Sidebar>
          <ScrollArea className="flex-grow bg-white">
            {renderCategoryContent()}
          </ScrollArea>
        </div>
      </WindowFrame>
    </div>
  );
};

export default SystemSettingsView;