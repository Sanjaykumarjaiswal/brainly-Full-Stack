import type { ReactElement } from "react"

export  interface ButtonProps {
    variant : "primary" | "secondary",
    size : "sm" | "md" | "lg",
    text : string,
    startIcon? :ReactElement,
    endIcon? : ReactElement,
    onClick? : ()=>void,
    fullWidth? : boolean

}
const variantClasses = {
    "primary" : "bg-purple-600 text-white hover:bg-purple-700",
    "secondary" : "bg-purple-200 text-purple-600 hover:bg-purple-300"
}
const sizeClasses = {
    "sm" : "rounded-sm px-3 py-2 text-sm",
    "md" : "rounded-md px-4 py-3 text-base",
    "lg" : "rounded-lg px-6 py-4 text-xl"
}
const defaultStyles = "flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 font-medium"

export const Button = (props:ButtonProps) =>{
    return (
        <button
        className={`${variantClasses[props.variant]} ${defaultStyles} ${sizeClasses[props.size]} ${props.fullWidth ? " w-full "  :"" }`}
        onClick={props.onClick}
        >
            {props.startIcon && <span>{props.startIcon}</span>}
            <span>{props.text}</span>
            {props.endIcon && <span>{props.endIcon}</span>}
        </button>
    )
}