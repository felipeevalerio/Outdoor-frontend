import { Controller } from "react-hook-form";
import { Select } from "./styles";

export interface ISelectOptions {
  value: string;
  title: string;
}

interface ICustomSelectProps {
  control: any;
  controllerName: string;
  items: ISelectOptions[];
}

export function CustomSelect({ control, controllerName, items} : ICustomSelectProps) {
  return (
    <Controller 
    control={control}
    name={controllerName}
    render={({field}) => {
      return (
        <Select onChange={field.onChange} value={field.value}>
          {items.map((item) => {
            return (
              <option key={item.value} value={item.value}>{item.title}</option>
            )
          })}
        </Select>
      )
    }}
  />
  )
}