type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={`rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}