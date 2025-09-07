export function Card({ className = "", children }) {
return <div className={`card-glass p-4 ${className}`}>{children}</div>;
}
export function CardContent({ className = "", children }) {
return <div className={`p-2 ${className}`}>{children}</div>;
}