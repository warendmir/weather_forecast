import { AxiosStatic } from "axios";
import {} from "@material-tailwind/react";

declare global {
    interface Window {
        axios: AxiosStatic;
    }
}

export {};

// material-tailwind.d.ts
type EventCapture = {
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
};

declare module "@material-tailwind/react" {
    export interface ButtonProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface InputProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface SelectProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface ButtonGroupProps extends EventCapture {
        placeholder?: unknown;
    }

    export interface CardProps extends EventCapture {
        placeholder?: unknown;
    }

    export interface CardBodyProps extends EventCapture {
        placeholder?: unknown;
    }

    export interface CardFooterProps extends EventCapture {
        placeholder?: unknown;
    }

    export interface CardHeaderProps extends EventCapture {
        placeholder?: unknown;
    }

    export interface TypographyProps extends EventCapture {
        placeholder?: unknown;
    }
}

declare module "*.png" {
    const content: string;
    export default content;
}
