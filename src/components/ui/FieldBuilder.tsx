import { Control, Controller, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<any, any>;
  errors: FieldErrors<any>;
  label: string;
  type: string;
  name: string;
};

export const FieldBuilder = ({ control, errors, name, type, label }: Props) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
        <input 
           name={name}
           type={type}
           placeholder={label}
           onChange={onChange}
           onBlur={onBlur}
           value={value}
           className="form-control mb-3"
        />
        )}
      />
      {errors[name] &&      <p className="text-danger"> This is required.</p>}
    </>
  );
};
