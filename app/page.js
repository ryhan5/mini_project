import { redirect } from 'next/navigation';
import { defaultLocale } from '@/config/languages';

export default function RootPage() {
  // Redirect to the default locale's home page
  // This will be caught by the middleware which will handle the redirection
  // to the preferred language or default language with /home
  redirect(`/${defaultLocale}/home`);
  
  // This will never be reached, but Next.js requires a return statement
  return null;
}

export const dynamic = 'force-dynamic'; // Ensure this page is always dynamic