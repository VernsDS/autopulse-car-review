import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
  orm: {
    adapter: { name: "sqlite" },
    family: { name: "sqlite" },
    target: { name: "sqlite" },
  },
});
