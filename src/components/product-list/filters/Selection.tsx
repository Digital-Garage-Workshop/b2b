"use client";
import { FormControl, Select, Box } from "@chakra-ui/react";

export const Selection = (props: {
  data: any[];
  isDisabled?: boolean;
  placeholder: string;
  selection: string;
  setSelected: (value: string, name?: string) => void;
  type?: string;
  isAlert?: boolean;
}) => {
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
      data.forEach((item: any) => {
        item.childrens?.forEach((child: any) => {
          // Convert IDs to strings for comparison
          if (String(child.modelid) === String(selectedValue)) {
            selectedName = child.modelname;
          }
        });
      });
    } else if (type === "engine") {
      data.forEach((item: any) => {
        item.childrens?.forEach((child: any) => {
          if (String(child.modelid) === String(selectedValue)) {
            selectedName = child.carname;
          }
        });
      });
    } else {
      data.forEach((item: any) => {
        if (String(item.manuid) === String(selectedValue)) {
          selectedName = item.name;
        }
      });
    }

    setSelected(selectedValue, selectedName);
  };

  return (
    <Box w={"full"}>
      <FormControl w="full" bg="#F9F9F9" borderRadius="8px">
        <Select
          placeholder={placeholder}
          value={selection}
          onChange={handleChange}
          bg="white"
          border="1px solid  #E4E7EC"
          disabled={isDisabled}
          isRequired={isAlert}
        >
          {data?.map((item: any, index: number) =>
            type === "model" ? (
              item.childrens?.map((child: any, idx: number) => (
                <option
                  key={idx}
                  value={child.modelid}
                  style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
                >
                  {child.modelname} ({child.yearstart} -{" "}
                  {child.yearend || "..."})
                </option>
              ))
            ) : type === "engine" ? (
              <option
                key={index}
                value={item.carid}
                style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
              >
                {item.carname}
              </option>
            ) : (
              <option
                key={index}
                value={item.manuid}
                style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
              >
                {item.name}
              </option>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
