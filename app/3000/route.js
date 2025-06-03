import { redirect } from 'next/navigation';

export async function GET() {
  return redirect('/en/home', 307);
}
