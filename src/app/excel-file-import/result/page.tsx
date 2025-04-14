"use client";
import { AddToCart } from "@/_services/user";
import { BreadCrumb, ExcelCard } from "@/components";
import { UseApi, useCustomToast } from "@/hooks";
import {
  grey500,
  grey600,
  warning100,
  warning200,
  warning25,
  warning600,
} from "@/theme/colors";
import {
  Button,
  HStack,
  Stack,
  Text,
  VStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Key for localStorage
const REMOVED_PRODUCTS_KEY = "excel_import_removed_products";
const DISPLAYED_OEMS_KEY = "excel_import_displayed_oems";

export default function Page() {
  const [checkedProducts, setCheckedProducts] = useState<Record<string, any[]>>(
    {}
  );

  const [displayedOems, setDisplayedOems] = useState<any[]>([]);
  const [removedProductIds, setRemovedProductIds] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<any>(null);

  const [{ data, isLoading, error, errData, successMessage }, addToCart] =
    UseApi({
      service: AddToCart,
      useAuth: true,
    });

  const toast = useCustomToast();
  const { data: session } = useSession();
  const [res, setRes] = useState<any | null>(null);

  // Load removed products from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRemovedProducts = localStorage.getItem(REMOVED_PRODUCTS_KEY);
      if (savedRemovedProducts) {
        setRemovedProductIds(JSON.parse(savedRemovedProducts));
      }

      const savedDisplayedOems = localStorage.getItem(DISPLAYED_OEMS_KEY);
      if (savedDisplayedOems) {
        setDisplayedOems(JSON.parse(savedDisplayedOems));
      }
    }
  }, []);

  useEffect(() => {
    if (removedProductIds.length > 0) {
      localStorage.setItem(
        REMOVED_PRODUCTS_KEY,
        JSON.stringify(removedProductIds)
      );
    }
  }, [removedProductIds]);

  useEffect(() => {
    if (displayedOems.length > 0) {
      localStorage.setItem(DISPLAYED_OEMS_KEY, JSON.stringify(displayedOems));
    }
  }, [displayedOems]);

  const handleSearchDirect = async () => {
    try {
      const fileName = sessionStorage.getItem("fileName");
      const fileData = sessionStorage.getItem("fileData");

      if (!fileName || !fileData) {
        throw new Error("No file data found in sessionStorage");
      }

      const res = await fetch(fileData);
      const blob = await res.blob();
      const file = new File([blob], fileName);

      const formData = new FormData();
      formData.append("file", file);

      const api = process.env.NEXT_PUBLIC_URL_API;

      const response = await axios.post(
        `${api}/user/excel/oemimport`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        const responseData = response?.data?.data;
        setRes(responseData);
        setOriginalData(responseData);

        const savedDisplayedOems = localStorage.getItem(DISPLAYED_OEMS_KEY);

        if (savedDisplayedOems) {
          const parsedDisplayedOems = JSON.parse(savedDisplayedOems);
          setDisplayedOems(parsedDisplayedOems);
        } else {
          if (responseData?.foundOems && removedProductIds.length > 0) {
            const filteredOems = responseData.foundOems
              .map((oem: any) => ({
                ...oem,
                products: oem.products.filter(
                  (product: any) => !removedProductIds.includes(product.partid)
                ),
              }))
              .filter((oem: any) => oem.products.length > 0);

            setDisplayedOems(filteredOems);
          } else if (responseData?.foundOems) {
            setDisplayedOems(responseData.foundOems);
          }
        }
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        // signOut({ redirect: false });
      }
      toast({
        title: "Алдаа",
        description: "Хайлтын үед алдаа гарлаа",
        type: "error",
      });
    }
  };

  const handleAddToCart = (selected: any[]) => {
    const formData = new FormData();
    selected?.map((product: any) => {
      formData.append("partid[]", product?.partid);
      formData.append("quantity[]", product?.user_quantity);
    });
    addToCart(formData);
  };

  const handleRemoveSingleProduct = (oemCode: string, productId: string) => {
    setRemovedProductIds((prev) => [...prev, productId]);

    setDisplayedOems((prevOems) =>
      prevOems
        .map((oem) => {
          if (oem.oem === oemCode) {
            const updatedProducts = oem.products.filter(
              (product: any) => product.partid !== productId
            );

            return {
              ...oem,
              products: updatedProducts,
            };
          }
          return oem;
        })
        .filter((oem) => oem.products.length > 0)
    );

    setCheckedProducts((prev) => {
      const prevChecked = prev[oemCode] || [];
      const updatedChecked = prevChecked.filter((p) => p.partid !== productId);

      return {
        ...prev,
        [oemCode]: updatedChecked,
      };
    });

    toast({
      title: "Амжилттай",
      description: "Бүтээгдэхүүн жагсаалтаас хасагдлаа",
      type: "success",
    });
  };

  const handleSkipSelected = (oemCode: string) => {
    const selected = checkedProducts[oemCode] || [];

    if (selected.length === 0) {
      toast({
        title: "Анхааруулга",
        description: "Та энэ хэсгээс бүтээгдэхүүн сонгоогүй байна",
        type: "warning",
      });
      return;
    }

    const idsToRemove = selected.map((product: any) => product.partid);

    setRemovedProductIds((prev) => [...prev, ...idsToRemove]);

    setDisplayedOems((prevOems) =>
      prevOems
        .map((oem) => {
          if (oem.oem === oemCode) {
            const updatedProducts = oem.products.filter(
              (product: any) => !idsToRemove.includes(product.partid)
            );

            return {
              ...oem,
              products: updatedProducts,
            };
          }
          return oem;
        })
        .filter((oem) => oem.products.length > 0)
    );

    setCheckedProducts((prev) => ({
      ...prev,
      [oemCode]: [],
    }));

    toast({
      title: "Амжилттай",
      description: `${selected.length} бүтээгдэхүүн жагсаалтаас хасагдлаа`,
      type: "success",
    });
  };

  const handleReset = () => {
    localStorage.removeItem(REMOVED_PRODUCTS_KEY);
    localStorage.removeItem(DISPLAYED_OEMS_KEY);
    setRemovedProductIds([]);
    setCheckedProducts({});

    if (originalData?.foundOems) {
      setDisplayedOems(originalData.foundOems);
    } else if (res?.foundOems) {
      setDisplayedOems(res.foundOems);
    }

    toast({
      title: "Амжилттай",
      description: "Жагсаалт шинэчлэгдлээ",
      type: "success",
    });
  };

  useEffect(() => {
    if (session) handleSearchDirect();
  }, [session]);

  useEffect(() => {
    if (successMessage) {
      toast({
        type: "success",
        description: successMessage || "",
        title: "Амжилттай",
      });
    } else if (error) {
      toast({
        type: "error",
        description: error || "",
        title: "Уучлаарай",
      });
    }
  }, [error, successMessage]);

  if (originalData?.foundOems?.length < 1) {
    return (
      <VStack w="full" minH="100vh">
        <BreadCrumb
          crumbs={[
            { path: "Excel import", href: "/excel-file-import" },
            { path: "Excel result", href: "" },
          ]}
          mb={-2}
        />

        {res?.notFoundOems?.length > 0 && (
          <HStack
            p="10px 16px"
            bg={warning25}
            borderRadius={8}
            border={`1px solid ${warning200}`}
            w="full"
            mt={8}
          >
            <Stack p="7px" borderRadius="full" bg={warning100}>
              <IconAlertTriangle color={warning600} />
            </Stack>
            <Text variant="subtitle2" pl={4}>
              Таны оруулсан
              {res?.notFoundOems?.map((item: string, index: number) => {
                return ` ${item}, `;
              })}
              OE дугаарууд олдсонгүй
            </Text>
          </HStack>
        )}
      </VStack>
    );
  }

  return (
    <VStack w="full" gap={6} minH="100vh" pb={180}>
      <BreadCrumb
        crumbs={[
          { path: "Excel import", href: "/excel-file-import" },
          { path: "Excel result", href: "" },
        ]}
        mb={-2}
      />
      <VStack w="full" align="flex-start">
        <Text variant="h5">Таны excel файлын үр дүн</Text>
        <Text variant="body1" color={grey600}>
          Зарим OEM дугаар дээр олон брэндийн ижил бүтээгдэхүүнүүд гарч ирж
          болох бөгөөд та худалдан авах бүтээгдэхүүнийхээ урд талын дөрвөлжин
          хэсгийг сонгож зөвлөснөөр тухайн бүтээгдэхүүн худалдан авалтын сагсанд
          нэмэгдэх болно
        </Text>
      </VStack>
      {res?.notFoundOems?.length > 0 && (
        <HStack
          p="10px 16px"
          bg={warning25}
          borderRadius={8}
          border={`1px solid ${warning200}`}
          w="full"
        >
          <Stack p="7px" borderRadius="full" bg={warning100}>
            <IconAlertTriangle color={warning600} />
          </Stack>
          <Text variant="subtitle2" pl={4}>
            Таны оруулсан
            {res?.notFoundOems?.map((item: string, index: number) => {
              return ` ${item}, `;
            })}
            OE дугаарууд олдсонгүй
          </Text>
        </HStack>
      )}

      {displayedOems?.map((item: any, index: number) => (
        <VStack w="full" gap={6} align="flex-start" key={index}>
          <Text variant="h8">
            {item?.oem} OEM дугаартай {item?.products?.length} бараа оллоо
          </Text>
          {item?.products?.map((product: any, productIndex: number) => (
            <HStack key={productIndex} w="full" position="relative">
              <Link
                style={{ width: "100%" }}
                href={`/product-detail/${product?.articleid}`}
                target="_blank"
              >
                <ExcelCard
                  item={product}
                  oem={item.oem}
                  setCheckedProducts={(product: any, checked: boolean) => {
                    setCheckedProducts((prev) => {
                      const prevProducts = prev[item.oem] || [];
                      const updated = checked
                        ? [...prevProducts, product]
                        : prevProducts.filter(
                            (p) => p.partid !== product.partid
                          );

                      return {
                        ...prev,
                        [item.oem]: updated,
                      };
                    });
                  }}
                  handleRemoveSingleProduct={handleRemoveSingleProduct}
                />
              </Link>
              {/* <IconButton
                aria-label="Delete product"
                icon={<IconTrash />}
                position="absolute"
                top="10px"
                right="10px"
                colorScheme="red"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault(); // Prevent Link navigation
                  e.stopPropagation();
                  handleRemoveSingleProduct(item.oem, product.partid);
                }}
              /> */}
            </HStack>
          ))}
          <HStack w="full" gap={6}>
            <Button
              flex={1}
              variant="outline"
              onClick={() => handleSkipSelected(item.oem)}
            >
              Устгах
            </Button>
            <Button
              flex={1}
              rightIcon={<IconArrowRight />}
              onClick={() => {
                const selected = checkedProducts[item.oem] || [];
                if (selected.length === 0) {
                  toast({
                    title: "Анхааруулга",
                    description: "Та энэ хэсгээс бүтээгдэхүүн сонгоогүй байна",
                    type: "warning",
                  });
                  return;
                }

                handleAddToCart(selected);
              }}
            >
              Сагслах
            </Button>
          </HStack>
        </VStack>
      ))}

      {displayedOems?.length === 0 && res && (
        <VStack w="full" py={10} gap={1} alignItems="center" justify="center">
          <Image src="/cartempty.svg" h={217} w={263} />
          <Text variant="subtitle2">Таны сагс хоосон байна!</Text>
          <Text color={grey500} variant="body3">
            Худалдан авахаар төлөвлөж байгаа бүтээгдэхүүнээ Зүрх товчлуурыг
            ашиглан хадгалаарай
          </Text>
          <Link href="/excel-file-import">
            <Button variant="outline" mt={3}>
              Excel -руу буцах
            </Button>
          </Link>
        </VStack>
      )}

      {removedProductIds.length > 0 && (
        <Button
          position="fixed"
          bottom="20px"
          right="20px"
          colorScheme="blue"
          onClick={handleReset}
        >
          Бүгдийг харуулах ({removedProductIds.length})
        </Button>
      )}
    </VStack>
  );
}
