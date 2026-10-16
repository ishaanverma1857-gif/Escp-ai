/** Example members and tasks for the prototype dashboard. Fictional people, so no real data is shown in demos. */

export const CAMPUSES = ["paris", "turin", "madrid", "berlin", "london"] as const;
export type Campus = (typeof CAMPUSES)[number];

export const DIVISIONS = ["events", "research", "communication", "business", "engineering", "entrepreneurship", "finance"] as const;
export type Division = (typeof DIVISIONS)[number];

export const DIVISION_LABEL: Record<Division, string> = {
  events: "Events & Logistics",
  research: "Research & Development",
  communication: "Communication",
  business: "Business",
  engineering: "Engineering",
  entrepreneurship: "Entrepreneurship",
  finance: "Finance",
};

export const CAMPUS_LABEL: Record<Campus, string> = {
  paris: "Paris",
  turin: "Turin",
  madrid: "Madrid",
  berlin: "Berlin",
  london: "London",
};

export const MEMBER_STATUSES = ["active", "alumni", "pending"] as const;
export const TASK_STATUSES = ["todo", "in_progress", "blocked", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
};

type SampleMember = {
  name: string;
  email: string;
  campus: Campus;
  division: Division;
  position: string;
  status: (typeof MEMBER_STATUSES)[number];
  joined: string;
  projects: string;
  permission: "superadmin" | "branchadmin" | "divisionlead" | "member";
};

const m = (
  name: string,
  campus: Campus,
  division: Division,
  position: string,
  permission: SampleMember["permission"],
  joined: string,
  projects: string,
  status: SampleMember["status"] = "active",
): SampleMember => ({
  name,
  email: `${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z ]/g, "").replace(" ", ".")}@edu.escp.eu`,
  campus,
  division,
  position,
  status,
  joined,
  projects,
  permission,
});

export const sampleMembers: SampleMember[] = [
  m("Camille Laurent", "paris", "business", "President", "superadmin", "2025-09-15", "Partnerships, KPMG conference"),
  m("Hugo Martin", "paris", "events", "Head of Events", "divisionlead", "2025-10-01", "KPMG conference, AI workshop"),
  m("Inès Moreau", "paris", "communication", "Communication lead", "divisionlead", "2025-10-01", "Instagram, event promotion"),
  m("Lucas Bernard", "paris", "engineering", "Team member", "member", "2026-02-10", "Website, member platform"),
  m("Chloé Petit", "paris", "finance", "Treasurer", "member", "2025-11-03", "Budget, sponsorship"),
  m("Giulia Rossi", "turin", "events", "Branch lead", "branchadmin", "2026-01-12", "Turin AI Day"),
  m("Marco Bianchi", "turin", "research", "Team member", "member", "2026-03-02", "AI tools review"),
  m("Lucía García", "madrid", "business", "Branch lead", "branchadmin", "2026-01-20", "Madrid partners"),
  m("Pablo Fernández", "madrid", "entrepreneurship", "Team member", "member", "2026-04-14", "Startup round tables"),
  m("Lena Schmidt", "berlin", "research", "Branch lead", "branchadmin", "2026-02-01", "Deep-tech round tables"),
  m("Jonas Weber", "berlin", "engineering", "Team member", "member", "2026-05-05", "Workflow prototypes", "pending"),
  m("Sophie Dubois", "paris", "research", "R&D lead", "divisionlead", "2024-09-20", "AI optimisation workshop", "alumni"),
  m("Oliver Hughes", "london", "business", "Launch coordinator", "member", "2026-09-01", "London branch launch", "pending"),
];

type SampleTask = {
  title: string;
  description: string;
  campus: Campus;
  division: Division;
  project: string;
  assignee: string;
  start: string;
  deadline: string;
  importance: "high" | "low";
  urgency: "high" | "low";
  status: TaskStatus;
};

/** Dates are relative to today, so the Gantt chart always looks current. */
export function sampleTasks(today = new Date()): SampleTask[] {
  const d = (offset: number) => {
    const x = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + offset));
    return x.toISOString().slice(0, 10);
  };
  const t = (
    title: string,
    campus: Campus,
    division: Division,
    project: string,
    assignee: string,
    start: number,
    end: number,
    importance: "high" | "low",
    urgency: "high" | "low",
    status: TaskStatus,
    description = "",
  ): SampleTask => ({ title, description, campus, division, project, assignee, start: d(start), deadline: d(end), importance, urgency, status });

  return [
    t("Confirm KPMG speakers and room", "paris", "events", "KPMG conference", "Hugo Martin", -10, 2, "high", "high", "in_progress", "Final list of the 7 to 8 KPMG professionals and the Étienne Marcel booking."),
    t("Publish KPMG event on Instagram", "paris", "communication", "KPMG conference", "Inès Moreau", -6, 1, "high", "high", "in_progress"),
    t("Order cocktail catering", "paris", "finance", "KPMG conference", "Chloé Petit", -4, 2, "high", "high", "blocked", "Waiting for the final attendance number."),
    t("Prepare AI optimisation workshop slides", "paris", "research", "AI workshop", "Lucas Bernard", -2, 10, "high", "low", "todo"),
    t("Book room for the AI workshop", "paris", "events", "AI workshop", "Hugo Martin", 0, 5, "high", "high", "todo"),
    t("Shortlist deep-tech alumni", "berlin", "research", "Deep-tech round tables", "Lena Schmidt", -3, 14, "high", "low", "in_progress"),
    t("Brief Accio Work on workshop format", "paris", "business", "Accio Work workshop", "Camille Laurent", 1, 12, "high", "low", "todo"),
    t("Draft Turin AI Day programme", "turin", "events", "Turin AI Day", "Giulia Rossi", 2, 25, "high", "low", "todo"),
    t("Review AI note-taking tools", "turin", "research", "AI tools review", "Marco Bianchi", -8, -1, "low", "low", "done"),
    t("Contact Madrid startups for round table", "madrid", "entrepreneurship", "Startup round tables", "Pablo Fernández", 0, 18, "low", "low", "todo"),
    t("Update partner deck", "madrid", "business", "Madrid partners", "Lucía García", -5, 3, "low", "high", "in_progress"),
    t("Refresh team biographies on the website", "paris", "engineering", "Website", "Lucas Bernard", -1, 4, "low", "high", "todo"),
    t("Prototype task board for members", "berlin", "engineering", "Member platform", "Jonas Weber", 3, 30, "high", "low", "todo"),
    t("Sponsorship budget for semester", "paris", "finance", "Budget", "Chloé Petit", 5, 20, "high", "low", "todo"),
    t("Scout London venues", "london", "business", "London branch launch", "Oliver Hughes", 10, 45, "low", "low", "todo"),
    t("Reply to student enquiries", "paris", "communication", "Instagram", "Inès Moreau", 0, 2, "low", "high", "todo"),
  ];
}
