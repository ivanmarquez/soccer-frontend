import { ReactNode } from 'react';
import ProtectedLayout from '../components/ProtectedLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
