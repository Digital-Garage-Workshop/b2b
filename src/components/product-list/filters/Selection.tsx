"use client";
import { FormControl, Select, Box } from "@chakra-ui/react";

interface ModelChild {
  modelid: string | number;
  name: string;
  yearstart: string;
  yearend?: string;
}

interface EngineChild {
  modelid: string | number;
  carname: string;
}

interface ModelGroup {
  groupname: string;
  children: ModelChild[];
}

interface EngineGroup {
  childrens?: EngineChild[];
}

interface BrandItem {
  manuid: string | number;
  name: string;
}

type SelectionData = ModelGroup[] | EngineGroup[] | BrandItem[];

interface SelectionProps {
  data?: SelectionData;
  isDisabled?: boolean;
  placeholder: string;
  selection: string;
  setSelected: (value: string, name?: string) => void;
  type?: "model" | "engine" | string;
  isAlert?: boolean;
}

export const Selection = (props: SelectionProps) => {
  const {
    data,
    isDisabled,
    placeholder,
    selection,
    setSelected,
    type,
    isAlert,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    let selectedName = "";

    if (type === "model") {
      const modelData = data as ModelGroup[];

      for (const group of modelData) {
        if (group.children) {
          for (const child of group.children) {
            if (String(child.modelid) === String(selectedValue)) {
              selectedName = child.name;
              break;
            }
          }
        }
        if (selectedName) break;
      }
    } else if (type === "engine") {
      const engineData = data as EngineGroup[];

      for (const item of engineData) {
        if (item.childrens) {
          for (const child of item.childrens) {
            if (String(child.modelid) === String(selectedValue)) {
              selectedName = child.carname;
              break;
            }
          }
        }
        if (selectedName) break;
      }
    } else {
      const brandData = data as BrandItem[];

      for (const item of brandData) {
        if (String(item.manuid) === String(selectedValue)) {
          selectedName = item.name;
          break;
        }
      }
    }

    setSelected(selectedValue, selectedName);
  };

  const renderModelOptions = () => {
    const modelData = data as ModelGroup[];

    return modelData?.map((group, groupIndex) => (
      <optgroup key={groupIndex} label={group.groupname}>
        {group.children?.map((child, childIndex) => (
          <option
            key={`${groupIndex}-${childIndex}`}
            value={child.modelid}
            style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
          >
            {child.name} ({child.yearstart} - {child.yearend || "..."})
          </option>
        ))}
      </optgroup>
    ));
  };

  const renderEngineOptions = () => {
    const engineData = data as any[];

    return engineData?.map((item, index) => (
      <option
        key={index}
        value={item.carid}
        style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
      >
        {item.carname}
      </option>
    ));
  };

  const renderBrandOptions = () => {
    const brandData = data as BrandItem[];

    return brandData?.map((item, index) => (
      <option
        key={index}
        value={item.manuid}
        style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
      >
        {item.name}
      </option>
    ));
  };

  return (
    <Box w="full">
      <FormControl w="full" bg="#F9F9F9" borderRadius="8px">
        <Select
          placeholder={placeholder}
          value={selection}
          onChange={handleChange}
          bg="white"
          border="1px solid #E4E7EC"
          disabled={isDisabled}
          isRequired={isAlert}
        >
          {type === "model"
            ? renderModelOptions()
            : type === "engine"
            ? renderEngineOptions()
            : renderBrandOptions()}
        </Select>
      </FormControl>
    </Box>
  );
};
