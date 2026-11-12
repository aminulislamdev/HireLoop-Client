// dashboard/recruiter/jobs/new/_components/post-job-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn button
import { Input } from "@/components/ui/input";   // Assuming you have shadcn input
import { Textarea } from "@/components/ui/textarea"; // Assuming you have shadcn textarea
import { Globe, MapPin, Calendar, Building2, ChevronDown } from "lucide-react";

export default function PostJobForm() {
  const [jobType, setJobType] = useState("Full-time");
  const [isRemote, setIsRemote] = useState(true);

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header */}
      <header className="mb-10">
        <div className="text-sm text-muted-foreground mb-2">
          Manage Jobs &gt; Create New Listing
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2 tracking-tight">Post a New Job</h1>
            <p className="text-sm text-muted-foreground">
              Fill in the position specifications to attract qualified talent across our network.
            </p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Publish Job &rarr;
          </Button>
        </div>
      </header>

      <form className="space-y-10">
        {/* Section 1: Basic Information */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            1. Basic Information
          </h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title *</label>
            <Input
              defaultValue="Frontend Developer"
              placeholder="e.g. Senior Product Designer"
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue="HirePulse Network" readOnly className="pl-10 bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Category *</label>
              <div className="relative">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                  <option>Engineering & Tech</option>
                  <option>Design</option>
                  <option>Marketing</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Type *</label>
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setJobType(type)}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 border ${jobType === type
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-300"
                    : "bg-background border-input text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Location, Compensation & Timeline */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            2. Location, Compensation & Timeline
          </h2>

          <div className="border rounded-lg p-4 flex items-center justify-between bg-card">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Remote Work Allowed (isRemote)</h3>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            {/* Custom Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isRemote}
                onChange={() => setIsRemote(!isRemote)}
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                <span>Job Location (location)</span>
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">Required</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input defaultValue="New York, USA" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Application Deadline (deadline)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" defaultValue="2025-05-30" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Salary / Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                <Input defaultValue="25" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Salary / Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                <Input defaultValue="40" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Frequency</label>
              <div className="relative">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>per hour</option>
                  <option>per month</option>
                  <option>per year</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Responsibilities & Requirements */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block"></span>
            3. Responsibilities & Requirements
          </h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Key Responsibilities *</label>
            <Textarea
              rows={4}
              defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              className="resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Qualifications & Requirements *</label>
            <Textarea
              rows={5}
              defaultValue={`• 3+ years of experience with React, TypeScript, and modern state architectures
• Solid understanding of DOM performance and component-driven designs
• Experience partnering closely with product teams and UI/UX designers`}
              className="resize-y"
            />
          </div>
        </section>
      </form>
    </div>
  );
}