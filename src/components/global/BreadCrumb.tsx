import { grey500, textDefault } from "@/theme/colors";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { IconChevronRight } from "@tabler/icons-react";

type BreadcrumbType = {
  crumbs: { path: string; href: string }[];
} & StackProps;

export const BreadCrumb = (props: BreadcrumbType) => {
  const { crumbs, ...restProps } = props;
  return (
    <Breadcrumb
      separator={<IconChevronRight color={grey500} size={16} />}
      my={6}
      alignSelf="flex-start"
      px={{ base: 5, md: 0 }}
      {...restProps}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Text fontSize={{ base: 12, md: 14 }} color={textDefault}>
            Нүүр
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {crumbs.map((crumb, index) => {
        return (
          <BreadcrumbItem
            key={index}
            isCurrentPage={index === crumbs.length - 1}
          >
            <BreadcrumbLink href={`${crumb.href}`}>
              <Text
                color={crumbs?.length === index + 1 ? grey500 : textDefault}
                variant={{ base: "sm", md: "body3" }}
                maxW={{ base: "160px", md: "full" }}
                whiteSpace={"nowrap"}
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {" "}
                {crumb.path}
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
