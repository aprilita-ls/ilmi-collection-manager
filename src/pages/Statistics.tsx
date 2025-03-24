
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { PieChartIcon, Users, Clock, Calendar } from 'lucide-react';

const Statistics = () => {
  // Data untuk chart kunjungan berdasarkan kategori
  const visitData = [
    { name: 'Video', value: 540, color: '#3b82f6' },
    { name: 'Audio', value: 320, color: '#10b981' },
    { name: 'Hadist', value: 430, color: '#8b5cf6' },
    { name: 'Lainnya', value: 200, color: '#f97316' },
  ];

  // Data untuk chart kunjungan berdasarkan waktu
  const timeData = [
    { name: 'Pagi', value: 350, color: '#f59e0b' },
    { name: 'Siang', value: 420, color: '#ef4444' },
    { name: 'Sore', value: 380, color: '#06b6d4' },
    { name: 'Malam', value: 340, color: '#6366f1' },
  ];

  // Data untuk chart kunjungan berdasarkan hari
  const dayData = [
    { name: 'Senin', value: 180, color: '#8b5cf6' },
    { name: 'Selasa', value: 200, color: '#ec4899' },
    { name: 'Rabu', value: 220, color: '#f97316' },
    { name: 'Kamis', value: 190, color: '#14b8a6' },
    { name: 'Jumat', value: 280, color: '#3b82f6' },
    { name: 'Sabtu', value: 250, color: '#6366f1' },
    { name: 'Minggu', value: 300, color: '#10b981' },
  ];

  // Data untuk chart kunjungan berdasarkan usia pengguna
  const userAgeData = [
    { name: '18-24', value: 320, color: '#2563eb' },
    { name: '25-34', value: 480, color: '#16a34a' },
    { name: '35-44', value: 300, color: '#9333ea' },
    { name: '45+', value: 190, color: '#c2410c' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Statistik Kunjungan</h1>
            <p className="text-gray-500">Visualisasi data kunjungan pengguna Daarul Ilmi</p>
          </div>
          <div className="p-3 bg-indigo-100 rounded-full">
            <PieChartIcon className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Kategori Konten */}
          <Card className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Kunjungan Berdasarkan Kategori</h2>
              <p className="text-sm text-gray-500">Distribusi pengguna berdasarkan kategori konten</p>
            </div>
            <div className="h-[300px]">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visitData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {visitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Card>

          {/* Chart Waktu Kunjungan */}
          <Card className="p-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Kunjungan Berdasarkan Waktu</h2>
                <p className="text-sm text-gray-500">Distribusi pengguna berdasarkan waktu kunjungan</p>
              </div>
              <Clock className="text-indigo-400 w-5 h-5" />
            </div>
            <div className="h-[300px]">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {timeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Card>

          {/* Chart Hari Kunjungan */}
          <Card className="p-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Kunjungan Berdasarkan Hari</h2>
                <p className="text-sm text-gray-500">Distribusi pengguna berdasarkan hari kunjungan</p>
              </div>
              <Calendar className="text-indigo-400 w-5 h-5" />
            </div>
            <div className="h-[300px]">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dayData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dayData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Card>

          {/* Chart Usia Pengguna */}
          <Card className="p-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Kunjungan Berdasarkan Usia</h2>
                <p className="text-sm text-gray-500">Distribusi pengguna berdasarkan kelompok usia</p>
              </div>
              <Users className="text-indigo-400 w-5 h-5" />
            </div>
            <div className="h-[300px]">
              <ChartContainer config={{}} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userAgeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userAgeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;
