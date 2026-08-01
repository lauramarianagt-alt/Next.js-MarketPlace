type InputProps = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  defaultValue?: string | number;
};

export default function Input({
  type,
  name,
  id,
  placeholder,
  defaultValue,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="rounded border p-2"
    />
  );
}