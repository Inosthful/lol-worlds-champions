"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from "lucide-react";
import { PlayerSearch } from "./player-search";
import { TeamSearch } from "./team-search";

export function SearchTabs() {
  return (
    <Tabs defaultValue="players" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-lg h-12">
        <TabsTrigger
          value="players"
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-200 data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-800 data-[state=inactive]:hover:bg-slate-50 transition-all duration-200 font-medium"
        >
          <User className="h-4 w-4" />
          Joueurs
        </TabsTrigger>
        <TabsTrigger
          value="teams"
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-200 data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-800 data-[state=inactive]:hover:bg-slate-50 transition-all duration-200 font-medium"
        >
          <Users className="h-4 w-4" />
          Équipes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="players" className="mt-6">
        <PlayerSearch />
      </TabsContent>

      <TabsContent value="teams" className="mt-6">
        <TeamSearch />
      </TabsContent>
    </Tabs>
  );
}
