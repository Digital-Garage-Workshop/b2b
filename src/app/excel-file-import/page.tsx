"use client";

import { BreadCrumb } from "@/components";
import { useCustomToast } from "@/hooks";
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
import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface CrumbProps {
  path: string;
  href: string;
}

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
    ];

    if (!validExcelTypes.includes(file.type)) {
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
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
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
    }, 50); // Update every 50ms for smooth animation
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

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownloadTemplate = (): void => {
    try {
      const templateData = [
        [
          "Part Number",
          "Quantity",
          "Description",
          "Brand",
          "Vehicle Model",
          "Year",
          "Notes",
        ],
        [
          "GS-12345",
          "2",
          "Oil Filter",
          "RIDEX",
          "Toyota Camry",
          "2020",
          "Original parts only",
        ],
        ["", "", "", "", "", "", ""],
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

  const handleSearch = (): void => {
    if (!file) {
      toast({
        title: "Анхааруулга",
        description: "Эхлээд файл оруулна уу",
        type: "warning",
      });
      return;
    }

    if (!isUploaded) {
      toast({
        title: "Анхааруулга",
        description: "Файл байршуулалт дуусахыг хүлээнэ үү",
        type: "warning",
      });
      return;
    }

    toast({
      title: "Амжилттай",
      description: "Хайлт эхэллээ",
      type: "success",
    });
  };

  return (
    <VStack w="full" gap={6} minH="100vh">
      <BreadCrumb
        crumbs={[{ path: "Excel import", href: "" } as CrumbProps]}
        mb={-2}
      />
      <VStack w="full" align="flex-start">
        <Text variant="h5">Сэлбэгийн ангилал</Text>
        <Text variant="body1" color={grey600}>
          Эдийн дугаар, тоо хэмжээ бүхий файлыг байршуулах
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
            accept=".xls,.xlsx,.xlsm"
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
            {isDragging ? "Файлыг энд буулгана уу" : "Drag and drop file here"}
          </Text>
          <Text variant="body3" color={grey600} maxW={436} textAlign="center">
            Та захиалахыг хүсч буй машины сэлбэгийнхээ жагсаалтыг байршуулна уу.
            Та файлын форматыг ашиглаж болно: xls, xlsx
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
          bg={isUploaded ? "rgba(247, 91, 0, 0.03)" : "transparent"}
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
          onClick={handleSearch}
          isDisabled={!file || isUploading || !isUploaded}
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
