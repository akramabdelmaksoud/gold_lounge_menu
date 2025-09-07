export function Button({ className = "", variant = "default", size = "md", children, ...props }) {
const base = "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm";
const variants = {
default: "bg-gold-500 text-black hover:brightness-110 focus:ring-gold-400",
outline: "bg-transparent text-gold-200 border border-gold-600 hover:bg-gold-600/10 focus:ring-gold-400",
ghost: "bg-transparent hover:bg-white/5 text-neutral-100 focus:ring-gold-400",
};
const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-6 py-3 text-lg" };
const cls = `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`;
return (
<button className={cls} {...props}>{children}</button>
);
}