import { redirect } from 'next/navigation'

export default function WeatherRedirect() {
  redirect('/calculators/weather')
  return null;
}