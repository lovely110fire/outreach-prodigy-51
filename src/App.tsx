import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppSidebar } from "@/components/AppSidebar";
import HomePage from "@/pages/HomePage";
import CampaignsPage from "@/pages/CampaignsPage";
import AgentsPage from "@/pages/AgentsPage";
import ListsPage from "@/pages/ListsPage";
import ContactsPage from "@/pages/ContactsPage";
import PipelinePage from "@/pages/PipelinePage";
import TasksPage from "@/pages/TasksPage";
import UniboxPage from "@/pages/UniboxPage";
import EmailAccountsPage from "@/pages/EmailAccountsPage";
import LinkedInAccountsPage from "@/pages/LinkedInAccountsPage";
import AppsPage from "@/pages/AppsPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<ProtectedRoute><DashboardLayout><HomePage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/campaigns" element={<ProtectedRoute><DashboardLayout><CampaignsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/agents" element={<ProtectedRoute><DashboardLayout><AgentsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/lists" element={<ProtectedRoute><DashboardLayout><ListsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute><DashboardLayout><ContactsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/pipeline" element={<ProtectedRoute><DashboardLayout><PipelinePage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><DashboardLayout><TasksPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/unibox" element={<ProtectedRoute><DashboardLayout><UniboxPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/email-accounts" element={<ProtectedRoute><DashboardLayout><EmailAccountsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/linkedin-accounts" element={<ProtectedRoute><DashboardLayout><LinkedInAccountsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/apps" element={<ProtectedRoute><DashboardLayout><AppsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
