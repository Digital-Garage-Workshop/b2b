"use client";

import { ExcelImport } from "@/_services";
import { BreadCrumb } from "@/components";
import { UseApi, useCustomToast } from "@/hooks";
import { ExelIcon } from "@/icons";
import { grey100, grey200, grey300, grey600, primary } from "@/theme/colors";
import {
  Button,
  HStack,
  Stack,
  Text,
  VStack,
  Box,
  Image,
} from "@chakra-ui/react";
import {
  IconCircleCheckFilled,
  IconDownload,
  IconTrash,
  IconAlertCircle,
} from "@tabler/icons-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";

interface CrumbProps {
  path: string;
  href: string;
}
const REMOVED_PRODUCTS_KEY = "excel_import_removed_products";
const DISPLAYED_OEMS_KEY = "excel_import_displayed_oems";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const [
    { data: excelResult, isLoading: excelLoader, error: excelErr },
    excelSearch,
  ] = UseApi({
    service: ExcelImport,
    useAuth: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useCustomToast();

  const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = (file: File): void => {
    const validExcelTypes: string[] = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel.sheet.macroEnabled.12",
      "text/csv",
    ];

    if (!validExcelTypes.includes(file.type)) {
      console.log(file.type);

      setError("Зөвхөн Excel файл оруулна уу. (xls, xlsx)");
      toast({
        title: "Алдаа",
        description: "Зөвхөн Excel файл оруулна уу. (xls, xlsx)",
        type: "error",
      });
      return;
    }

    setError("");

    setFile(file);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));

    simulateUpload(file);
    setUploadProgress(100);
    setIsUploaded(true);
    setIsUploading(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (session) {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFile(e.dataTransfer.files[0]);
      }
    } else {
      toast({
        type: "error",
        title: "Уучлаарай.",
        description: "Та эхлээд нэвтэрч орно уу.",
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (session) {
      if (e.target.files && e.target.files.length > 0) {
        processFile(e.target.files[0]);
      }
    } else {
      toast({
        type: "error",
        title: "Уучлаарай.",
        description: "Та эхлээд нэвтэрч орно уу.",
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const simulateUpload = (file: File): void => {
    setIsUploading(true);
    setIsUploaded(false);
    setUploadProgress(0);

    const totalSize: number = file.size;
    const chunkSize: number = totalSize / 100;
    let loadedSize: number = 0;

    const uploadInterval = setInterval(() => {
      loadedSize += chunkSize;
      const progress: number = Math.min(
        Math.round((loadedSize / totalSize) * 100),
        100
      );
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        setIsUploaded(true);
        toast({
          title: "Амжилттай",
          description: "Файл амжилттай байршуулагдлаа",
          type: "success",
        });
      }
    }, 30);
  };

  const handleBoxClick = (): void => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = (): void => {
    setFile(null);
    setFileName("");
    setFileSize("");
    setUploadProgress(0);
    setIsUploaded(false);
    setIsUploading(false);
    localStorage.removeItem(REMOVED_PRODUCTS_KEY);
    localStorage.removeItem(DISPLAYED_OEMS_KEY);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownloadTemplate = (): void => {
    try {
      const templateData = [
        ["oem", "quantity"],
        ["4853048020", "2"],
        ["74062587", "4"],
        ["9091901167", "4"],
        ["71739867", "4"],
        ["8a0513029g", "7"],
        ["5960c2", "2"],
        ["", ""],
      ];

      const arrayToCSV = (data: string[][]): string => {
        return data
          .map((row) =>
            row
              .map((cell) => `"${(cell || "").toString().replace(/"/g, '""')}"`)
              .join(",")
          )
          .join("\n");
      };

      const csvContent = arrayToCSV(templateData);

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "excel_template.csv");
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);

      toast({
        title: "Амжилттай",
        description: "Excel загвар татагдлаа",
        type: "success",
      });
    } catch (error) {
      console.error("Template download error:", error);
      toast({
        title: "Алдаа",
        description: "Excel загвар татахад алдаа гарлаа",
        type: "error",
      });
    }
  };

  const handleSearchDirect = async () => {
    if (!file) {
      toast({
        title: "Анхааруулга",
        description: "Эхлээд файл оруулна уу",
        type: "warning",
      });
      return;
    }

    try {
      const reader = new FileReader();

      reader.onloadend = () => {
        sessionStorage.setItem("fileName", file.name);
        sessionStorage.setItem("fileData", reader.result as string);
      };

      reader.readAsDataURL(file);

      try {
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
          router.push("/excel-file-import/result");
        } else {
          toast({
            title: "Алдаа",
            description: response.data.message || "Хайлтын үед алдаа гарлаа",
            type: "error",
          });
        }
      } catch (error: any) {
        console.error("Direct API error:", error);
        if (error?.response?.status === 401) {
          // signOut({ redirect: false });
        }
        toast({
          title: "Алдаа",
          description: "Хайлтын үед алдаа гарлаа",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Direct API error:", error);
      toast({
        title: "Алдаа",
        description: "Хайлтын үед алдаа гарлаа",
        type: "error",
      });
    }
  };

  useEffect(() => {
    localStorage.removeItem(REMOVED_PRODUCTS_KEY);
    localStorage.removeItem(DISPLAYED_OEMS_KEY);
  }, []);

  return (
    <VStack w="full" gap={6} minH="100vh" pb={110}>
      <BreadCrumb
        crumbs={[{ path: "Excel import", href: "" } as CrumbProps]}
        mb={-2}
      />
      <VStack w="full" align="flex-start">
        <Text variant="h5">Excel файлаар хайх</Text>
        <Text variant="body1" color={grey600}>
          OEM дугаар болон тоо хэмжээ бүхий файлыг байршуулах
        </Text>
      </VStack>

      <Box
        as="div"
        w="full"
        position="relative"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBoxClick}
        cursor={isUploading ? "default" : "pointer"}
        transition="all 0.3s ease"
      >
        <VStack
          w="full"
          borderRadius={12}
          border={`1px solid ${isDragging ? primary : grey300}`}
          p={8}
          bg={isDragging ? "rgba(247, 91, 0, 0.03)" : "transparent"}
          transition="all 0.3s ease"
          pos="relative"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xls,.xlsx,.xlsm, .csv"
            style={{ display: "none" }}
          />

          <Image w={307} h={104} src="/ecxelContainer.svg" />
          <Stack
            w={20}
            h={20}
            borderRadius="full"
            bg="#229C5B1A"
            align="center"
            justify={"center"}
            pos="absolute"
            top={20}
          >
            <Stack
              borderRadius="full"
              border="6px solid #229C5B1A"
              h="66px"
              w="66px"
              align="center"
              justify={"center"}
            >
              <ExelIcon size="40px" />
            </Stack>
          </Stack>
          <Text variant="title2" mt={8}>
            {isDragging
              ? "Файлыг энд буулгана уу"
              : "Энд дарж файлаа оруулна уу"}
          </Text>
          <Text variant="body3" color={grey600} maxW={436} textAlign="center">
            Захиалах бүтээгдэхүүнийхээ OEM дугаар болон тоо ширхэг бүхий xls,
            xlsx, csv өргөтгөлтэй файл оруулах. XLS, XLSX, CSV өргөтгөлийн
            загварыг доор байрлах Exel-ийн загвар татах товч дээр дарна уу
          </Text>
          {error && (
            <HStack color="red.500" mt={2}>
              <IconAlertCircle size={16} />
              <Text fontSize="sm">{error}</Text>
            </HStack>
          )}
        </VStack>
      </Box>

      {file && (
        <VStack
          p={4}
          borderRadius={12}
          border={`1px solid ${isUploaded ? primary : grey300}`}
          w="full"
          transition="all 0.3s ease"
          bg="transparent"
        >
          <HStack w="full" gap={4} align="flex-start">
            <Stack
              w={10}
              h={10}
              borderRadius="full"
              bg={grey100}
              align="center"
              justify={"center"}
            >
              <Stack
                borderRadius="full"
                bg={grey200}
                h="28px"
                w="28px"
                align="center"
                justify={"center"}
              >
                <ExelIcon size="20px" />
              </Stack>
            </Stack>
            <VStack w="full">
              <VStack w="full" align="flex-start">
                <HStack w="full" justify="space-between">
                  <Text variant="subtitle2">{fileName}</Text>
                  <HStack>
                    {isUploaded && (
                      <IconCircleCheckFilled color={primary} size={20} />
                    )}
                    <Box
                      as="button"
                      onClick={handleDelete}
                      disabled={isUploading}
                      opacity={isUploading ? 0.5 : 1}
                      cursor={isUploading ? "not-allowed" : "pointer"}
                      transition="all 0.2s"
                      _hover={{
                        transform: isUploading ? "none" : "scale(1.1)",
                      }}
                    >
                      <IconTrash size={20} />
                    </Box>
                  </HStack>
                </HStack>
                <Text variant="subtitle3" color={grey600}>
                  {fileSize}
                </Text>
              </VStack>
              <HStack w="full" alignItems="center">
                <Stack
                  w="full"
                  h={2}
                  bg={grey200}
                  borderRadius={4}
                  overflow="hidden"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    height="100%"
                    width={`${uploadProgress}%`}
                    bg={primary}
                    transition="width 0.2s ease"
                    borderRadius={4}
                  />
                </Stack>
                <Text variant="subtitle3" color={grey600} whiteSpace="nowrap">
                  {uploadProgress}%
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      )}

      <HStack w="full">
        <Button
          variant="outline"
          flex={1}
          leftIcon={<IconDownload />}
          onClick={handleDownloadTemplate}
          transition="all 0.3s ease"
        >
          Excel -ийн загвар татах
        </Button>
        <Button
          flex={1}
          onClick={handleSearchDirect}
          isDisabled={
            !file || isUploading || !isUploaded || uploadProgress != 100
          }
          opacity={!file || isUploading || !isUploaded ? 0.7 : 1}
          transition="all 0.3s ease"
          // _hover={{
          //   transform:
          //     !file || isUploading || !isUploaded ? "none" : "translateY(-2px)",
          //   boxShadow:
          //     !file || isUploading || !isUploaded
          //       ? "none"
          //       : "0 4px 6px rgba(0,0,0,0.1)",
          // }}
        >
          Хайлт хийх
        </Button>
      </HStack>
    </VStack>
  );
}
