import { redirect } from 'next/navigation';
import { defaultLocale } from '@/config/languages';

export default function RootPage() {
  // This will be caught by the middleware which will handle the redirection
  // to the preferred language or default language with /home
  redirect(`/${defaultLocale}/home`);
  
  return null;
}