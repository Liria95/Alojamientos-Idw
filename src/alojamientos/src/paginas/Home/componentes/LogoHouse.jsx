export const LogoHouse = ({ src, className, alt, ...props }) => {
    return (
        <img 
            src={src} 
            className={className} 
            alt={alt} 
            {...props} 
        />
    );
}
