import { createFileRoute } from "@tanstack/react-router";
import { ClinicPage } from "@/components/clinic-page";

export const Route = createFileRoute("/")({ component: ClinicPage });
