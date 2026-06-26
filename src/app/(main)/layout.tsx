import { MainLayout } from "@/components/layout/MainLayout";

export default function MainLayoutRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
