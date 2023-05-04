
 const ButtonFunction=({ 
      border, color,
      children, height,
      onClick, borderRadius,
      width, href, 
      padding, backgroundColor,fontWeight
      
    }) => { 
    return (
      <button 
        onClick={onClick}
        href={href}
        style={{
           backgroundColor: backgroundColor,
           border,
           borderRadius: borderRadius,
           height, width,
           color:color,
           padding,
           fontWeight
        }}
      >
      {children}
      </button>
    );
}
export default ButtonFunction;