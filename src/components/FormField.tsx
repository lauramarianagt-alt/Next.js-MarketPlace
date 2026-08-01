import Input from "./Input";

type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  defaultValue?: string | number;
};

export default function FormField({
  label,
  type,
  name,
  id,
  placeholder,
  defaultValue,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-medium"
      >
        {label}
      </label>

      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}