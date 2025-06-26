import type { IconProps } from './IconProps';
import { IconPropsStyle } from './IconProps';

export default function LogoIcon({ size = "md" }: IconProps) {
    return (
        <img src="/vite.svg" alt="Vite Logo" className={IconPropsStyle[size]} />
    );
}
