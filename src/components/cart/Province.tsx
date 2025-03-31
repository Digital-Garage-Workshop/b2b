"use client";
import {
  GetDistricts,
  GetKhoroo,
  GetProvince,
  GetTerminal,
} from "@/_services/user";
import { UseApi } from "@/hooks";
import { Grid, Highlight, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export const Province = ({ formik }: { formik: any }) => {
  const [{ data: provinces, isLoading: provinceLoader }, getProvinces] = UseApi(
    {
      service: GetProvince,
    }
  );

  const [{ data: terminals, isLoading: terminalLoader }, getTerminal] = UseApi({
    service: GetTerminal,
  });

  const [{ data: khoroos, isLoading: khorooLoading }, getKhoroo] = UseApi({
    service: GetKhoroo,
  });

  useEffect(() => {
    getProvinces();
    getTerminal();
  }, []);

  useEffect(() => {
    if (formik.values.district) {
      getKhoroo({ locationid: formik.values.district });
    }
  }, [formik.values.district]);

  return (
    <VStack w="full" gap={4}>
      <Grid w="full" templateColumns="repeat(2, 1fr)" rowGap={4} columnGap={4}>
        <VStack gap="6px" align="flex-start">
          <Text variant="subtitle3">
            <Highlight query="*" styles={{ color: "#D92D20" }}>
              Автобус вокзал сонгох *
            </Highlight>
          </Text>
          <Select
            name="terminal"
            value={formik.values.terminal || ""}
            onChange={formik.handleChange}
            isDisabled={terminalLoader}
            placeholder="Сонгоно уу"
            h="44px"
            onBlur={formik.handleblur}
          >
            {terminals?.map(
              (item: { name: string; locationid: number }, index: number) => (
                <option
                  key={`district-${item.locationid}`}
                  value={item.locationid}
                  style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
                >
                  {item.name}
                </option>
              )
            )}
          </Select>
          {formik.touched.terminal && formik.errors.terminal && (
            <Text fontSize={12} color="#D72C0D">
              {formik.errors.terminal}
            </Text>
          )}
        </VStack>

        <VStack gap="6px" align="flex-start">
          <Text variant="subtitle3">
            <Highlight query="*" styles={{ color: "#D92D20" }}>
              Аймаг сонгох *
            </Highlight>
          </Text>
          <Select
            name="province"
            value={formik.values.province || ""}
            onChange={formik.handleChange}
            isDisabled={provinceLoader}
            placeholder="Сонгоно уу"
            h="44px"
          >
            {provinces?.map(
              (item: { name: string; locationid: number }, index: number) => (
                <option
                  key={`district-${item.locationid}`}
                  value={item.locationid}
                  style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
                >
                  {item.name}
                </option>
              )
            )}
          </Select>
          {formik.touched.province && formik.errors.province && (
            <Text fontSize={12} color="#D72C0D">
              {formik.errors.province}
            </Text>
          )}
        </VStack>

        <VStack gap="6px" align="flex-start">
          <Text variant="subtitle3">
            <Highlight query="*" styles={{ color: "#D92D20" }}>
              Автобус хөдлөх цаг *
            </Highlight>
          </Text>
          <Select
            name="khoroo"
            value={formik.values.khoroo || ""}
            onChange={formik.handleChange}
            isDisabled={khorooLoading || !formik.values.district}
            placeholder="Сонгоно уу"
            h="44px"
          >
            {khoroos?.map(
              (item: { name: string; locationid: number }, index: number) => (
                <option
                  key={`khoroo-${item.locationid}`}
                  value={item.locationid}
                  style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
                >
                  {item.name}
                </option>
              )
            )}
          </Select>
        </VStack>
        <VStack gap="6px" align="flex-start">
          <Text variant="subtitle3">
            <Highlight query="*" styles={{ color: "#D92D20" }}>
              Утасны дугаар *
            </Highlight>
          </Text>
          <Input
            name="phoneNumber"
            flex={1}
            placeholder="+976"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <Text fontSize={12} color="#D72C0D">
              {formik.errors.phoneNumber}
            </Text>
          )}
        </VStack>
      </Grid>

      <VStack gap="6px" align="flex-start" w="full">
        <Text variant="subtitle3">Дэлгэрэнгүй хаяг (заавал биш)</Text>
        <Input
          name="moreInfo"
          flex={1}
          placeholder="Энд мессежээ бичнэ үү..."
          value={formik.values.moreInfo || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="custom"
          background="var(--Primary-White, #FFF)"
          _focus={{
            outline: "none",
          }}
        />
      </VStack>
    </VStack>
  );
};
