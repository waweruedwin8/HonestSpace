import { ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userType: 'landlord' | 'scout' | 'admin';
}

export const DashboardLayout = ({ children, title, userType }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title={title} userType={userType} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};