/** Official MASF & Partners lockup. Designed on white; keep a light plate on dark surfaces. */
export default function BrandMark({
  className = "h-14 w-auto",
  alt = "MASF & Partners Limited",
}) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      className={`block rounded-md bg-white object-contain object-left ${className}`}
    />
  );
}
