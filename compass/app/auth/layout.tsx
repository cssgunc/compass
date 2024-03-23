
import Paper from '@/components/auth/Paper';


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Paper>
      <form className="mb-0 m-auto mt-6 space-y-4 border border-gray-200 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white max-w-xl">
        {children}
      </form>
      <p className="text-center mt-6 text-gray-500 text-xs">
        &copy; 2024 Compass Center
      </p>
    </Paper>
  )
}