export default function formatter(string: any) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
