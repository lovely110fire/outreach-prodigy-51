import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/pipeline" element={<PipelinePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/unibox" element={<UniboxPage />} />
              <Route path="/email-accounts" element={<EmailAccountsPage />} />
              <Route path="/linkedin-accounts" element={<LinkedInAccountsPage />} />
              <Route path="/apps" element={<AppsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
