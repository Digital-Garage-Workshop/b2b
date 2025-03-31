import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px white inset !important",
        WebkitTextFillColor: "inherit !important",
        caretColor: "inherit !important",
        transition: "background-color 5000s ease-in-out 0s",
      },
      // Dark mode autofill styles
      ".chakra-ui-dark input:-webkit-autofill": {
         WebkitBoxShadow: "0 0 0 1000px #1A202C inset !important",
         WebkitTextFillColor: "white !important",
      },
      /* Hide scrollbar for Chrome, Safari and Opera */
      // "::-webkit-scrollbar": {
      //   display: "none",
      // },
      /* Hide scrollbar for IE, Edge and Firefox */
      "body, html": {
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      },
      // ".hide-scrollbar": {
      //   overflow: "auto",
      //   msOverflowStyle: "none",
      //   scrollbarWidth: "none",
      //   "&::-webkit-scrollbar": {
      //     display: "none",
      //   },
      // },
    },
  },

  colors: {
    primary: {
      100: "#fa9c66",
      200: "#f98c4c",
      300: "#f87b32",
      400: "#f76b19",
      500: "#F75B00",
      600: "#e05500",
      700: "#c84d00",
    },
    success: "#28a745",
    warning: "#ffc107",
    critical: "#dc3545",
    surface: {
      default: "#FFFFFF",
      subdued: "#F0F0F0",
      pressed: "#D0D0D0",
      hovered: "#E0E0E0",
      disabled: "#F8F8F8",
      textField: "#E0E0E0",
    },
    text: {
      default: "#1E1E1E",
      critical: "#dc3545",
      warning: "#ffb400",
      success: "#28a745",
      secondary: "#717171",
    },
  },
  // fonts: {
  //   heading: 'var(--font-sf-pro)',
  //   body: `'Manrope', sans-serif`,
  // },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
    "5xl": "48px",
    "6xl": "72px",
  },
  space: {
    0: "0px",
    px: "1px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
    28: "112px",
    32: "128px",
    36: "144px",
    40: "160px",
    44: "176px",
    48: "192px",
    56: "224px",
    60: "240px",
    64: "256px",
    72: "288px",
    80: "320px",
    96: "384px",
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
  },
  components: {
    Text: {
        variants: {
          caption:{
            fontSize:'12px',
            fontWeight:400,
            color:'#475467'
          },
          body: {
            fontSize: "16px",
            fontWeight: "400",
            color: "#1E1E1E",
          },
          heading: {
            fontSize: "24px",
            fontWeight: "700",
            color: "text.default",
          },
          h5:{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1E1E1E",
            lineHeight:'normal'
          },
          h6:{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1E1E1E",
            lineHeight:'normal'
          },
          h7:{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1E1E1E",
            lineHeight:'normal'
          },
          h8:{
            fontSize: "20px",
            fontWeight: "700",
            color: '#1E1E1E',
          },
          title1:{
            fontSize: "18px",
            fontWeight: "700",
            color: '#1E1E1E',
          },
          title2:{
            fontSize: "16px",
            fontWeight: "700",
            color: '#1E1E1E',
          },
          title3:{
            fontSize: "14px",
            fontWeight: "700",
            color: '#1E1E1E',
          },
          subtext: {
            fontSize: "14px",
            fontWeight: "400",
            color: "text.secondary",
          },
          subtitle1:{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1E1E1E",
          },
          subtitle2:{
            fontSize: "16px",
            fontWeight: "600",
            color: "#344054",
          },
          subtitle3:{
            fontSize: "14px",
            fontWeight: "600",
            color: "#1E1E1E",
          },
          body1:{
            fontSize: "18px",
            fontWeight: "400",
            color: "#475467",
            lineHeigth:'150%'
          },
          body2:{
            fontSize: "16px",
            fontWeight: "400",
            color: "#475467",
            lineHeigth:'150%'
          },
          body3:{
            fontSize: "14px",
            fontWeight: "400",
            lineHeigth:'150%'
          },
          mixed:{
            fontSize:'20px',
            fontWeight:'400',
            color:'#1E1E1E'
          },
          sm:{
            fontSize:'12px',
            fontWeight:'400',
            color:'#1E1E1E'
          },   overlineBold:{
            fontSize:'12px',
            fontWeight:'700',
            color:'#1E1E1E'
          }
        },
        defaultProps: {
          variant: "body", // Default style
        },
      },
    Button: {
      baseStyle: {
        fontWeight: "600",
        width: "fit-content",
        disabled:{
          '&:hover':'none'
        }
      },
      sizes: {
        lg: {
          fontSize: "16px",
          padding: "10px 24px",
          fontWeight: "700",
        },
        md: {
          fontSize: "14px",
          padding: "8px 24px",
          fontWeight: "700",
        },
        sm: {
          fontSize: "13px",
          padding: "5px 24px",
          fontWeight: "700",
        },
      },
      variants: {
        ghost: {
          backgroundColor: "transparent",
          color: "#1e1e1e",
      '&:hover': {
            backgroundColor: "#F2F4F7",
          },
        },
        solid: {
          bg: "#F75B00",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
          '&:hover': {
            bg: "#D63F00",
          },
          _loading: {
            bg: "#D63F00",
            color: "#E4E7EC",
            cursor: "not-allowed",
            '&:hover': {
              bg: "#D63F00",
              opacity: 1,
            },
            spinner: {
              color: "#E4E7EC",
              thickness: "3px",
              speed: "0.8s",
            },
          },
          _disabled: {
            bg: "#F2F4F7",
            color: "#98A2B3",
            cursor: "not-allowed",
            '&:hover': { bg: "none" },
          },
        },
        outline: {
          borderColor: "#E4E7EC",
          color: "#1E1E1E",
          borderRadius: "8px",
          fontWeight: "bold",
          bg:"#F9FAFB",
          '&:hover': {
            border: "1px solid #D0D5DD",
            borderColor: "#D0D5DD",
            bg: "#F2F4F7",
          },
          disabled:{
             '&:hover':'none'
          }
        },
        secondary: {
          bg: "#F2F4F7",
          color: "#475467",
          '&:hover': {
            bg: "#D0D5DD",
          },
        },
        navy: {
          bg: "#0B192C",
          color: "#fff",
        },
        filled:{
          bg:'#F2F4F7',
        padding:1.5,
        disabled:{
          bg:'#F2F4F7',
          '&:hover':'none'
        }
        },
        tertiary:{
          // borderColor: "#E4E7EC",
          color: "#1E1E1E",
          borderRadius: "8px",
          fontWeight: "bold",
          bg:"#F9FAFB",
          '&:hover': {
            // border: "1px solid #D0D5DD",
            borderColor: "#D0D5DD",
            bg: "#F2F4F7",
          },
          disabled:{
             '&:hover':'none'
          }
        },
        rounded:{
          bg: "#F2F4F7",
          color: "#1E1E1E",
          fontWeight: "bold",
          borderRadius: "32px",
          '&:hover': {
            bg: "#F2F4F7",
          },
          _loading: {
            bg: "#F2F4F7",
            color: "#1E1E1E",
            cursor: "not-allowed",
            '&:hover': {
              bg: "#F2F4F7",
              opacity: 1,
            },
            spinner: {
              color: "#1E1E1E",
              thickness: "3px",
              speed: "0.8s",
            },
          },
          _disabled: {
            bg: "#F2F4F7",
            color: "#98A2B3",
            cursor: "not-allowed",
            '&:hover': { bg: "none" },
          },
        }

      },
      defaultProps: {
        variant: "solid",
        size:'md' 
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "#EDEDED",
        color: "#D0D5DD",
        
      },
    },
 
    Input: {
      baseStyle: {
        field: {
          display: "flex",
          padding: "10px 14px",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out", // Smooth transitions for state changes
        },
      },
      variants: {
        custom: {
          field: {
            border: "1px solid var(--Gray-300, #D0D5DD)",
            background: "var(--Primary-White, #FFF)",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)", // Default state
            '&:hover': {
              border: "1px solid var(--Gray-300, #D0D5DD)",
              background: "var(--Gray-50, #F9FAFB)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            },
            _focus: {
              border: "1px solid var(--Primary-Brand, #F75B00)",
              background: "var(--Primary-White, #FFF)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.1)", // Slightly stronger shadow
              outline: "none",
            },
            _disabled: {
              border: "1px solid var(--Gray-300, #D0D5DD)",
              background: "var(--Gray-50, #F9FAFB)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              opacity: 0.6,
              cursor: "not-allowed",
            },
          },
        },
        ghost:{
          field: {
            border: "none",
            background: "transparent",
            '&:hover': {
              border: "none",
              background: "transparent",
            },
            _focus: {
              border: "none",
              background: "transparent",
              outline: "none",
            },
            _disabled: {
              border: "none",
              background: "transparent",
              opacity: 0.6,
              cursor: "not-allowed",
            },
          },
        }
      },
      defaultProps: {
        variant: "custom", // Set this as the default variant
      },
    },
    Select:{
      baseStyle: {
        field: {
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out", // Smooth transitions for state changes
        },
      },
      variants: {
        custom: {
          field: {
            border: "1px solid var(--Gray-300, #D0D5DD)",
            background: "var(--Primary-White, #FFF)",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)", // Default state
            '&:hover': {
              border: "1px solid var(--Gray-300, #D0D5DD)",
              background: "var(--Gray-50, #F9FAFB)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            },
            _focus: {
              border: "1px solid var(--Primary-Brand, #F75B00)",
              background: "var(--Primary-White, #FFF)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.1)", // Slightly stronger shadow
              outline: "none",
            },
            _disabled: {
              border: "1px solid var(--Gray-300, #D0D5DD)",
              background: "var(--Gray-50, #F9FAFB)",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              opacity: 0.6,
              cursor: "not-allowed",
            },
          },
        },
      },
      defaultProps: {
        variant: "custom", // Set this as the default variant
      },
    },
    Textarea: {
      baseStyle: {
        field: {
          padding: "10px 14px",
          gap: "8px",
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out",
          border: "1px solid  #D0D5DD",
          background: " #FFF",
          boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        },
      },
      variants: {
        custom: {
          field: {
            border: "1px solid  #D0D5DD",
            background: " #FFF",
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            '&:hover': {
              border: "1px solid #D0D5DD",
              background: " #F9FAFB",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            },
            _focus: {
              border: "1px solid #F75B00",
              background: "#FFF",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.1)",
              outline: "none",
            },
            _disabled: {
              border: "1px solid #D0D5DD",
              background: "#F9FAFB",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              opacity: 0.6,
              cursor: "not-allowed",
            },
          },
        },
      },
      defaultProps: {
        variant: "custom",
      },
    },
     
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "#CFCFCF",
          borderWidth: "1px",
          borderRadius: "4px",
          width: "16px",
          height: "16px",
        },
        icon: {
          fontSize: "12px",
        },
      },
      defaultProps: {
        colorScheme: "primary",
      },
      variants: {
        outline: {
          control: {
            // border: "8px solid",
            bg: "transparent",
            size:'sm',
            _checked: {
              bg: "transparent",
              color: "#F75B00",
            '&:hover':{
              borderColor: "#F75B00",
              bg: "transparent",
            }
            },
            '&:hover': {
              borderColor: "#F75B00",
              bg: "transparent",         
            },
           
          },
        },}
    },
    Skeleton: {
      baseStyle: {
        startColor: "#E4E7EC",
        endColor: "#E4E7EC",
        speed: 3,
        fadeDuration: 0.4,
      },
      variants: {
        pulse: {
          startColor: "#E4E7EC",
          endColor: "#E4E7EC",
        },
      },
      defaultProps: {
        variant: "pulse", // Default to pulse variant
      },
    },
    Toast: {
      baseStyle: {
        container: {
          variant: "top-accent",
          borderRadius: "8px",
          color: "white",
          width: 400,
        },
      },
    },

    colors: {
      toastSuccessBg: "#000",
      toastErrorBg: "#E53E3E",
      toastInfoBg: "#FFE0CD",
      toastWarningBg: "#DD6B20",
    },
  },
});

export default theme;