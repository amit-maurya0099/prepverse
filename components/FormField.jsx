import { Controller } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input"; 

const FormField = ({ control, name, label, placeholder, description, type }) => {
  return (
    <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label text-base">{label}</FormLabel>
        <FormControl>
          <Input className="input" placeholder={placeholder} {...field} type={type} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
};

export default FormField
