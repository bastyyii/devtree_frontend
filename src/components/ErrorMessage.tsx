type ErrorMessageProps = {
    children: React.ReactNode
}

export default function Error({children} : ErrorMessageProps) {
    return (
      <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold">{children}</p>
    );
  }