import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function get_random_button_variant() {
  const variants = ["default", "destructive", "outline", "secondary", "ghost"];

  const index = Math.floor(Math.random() * variants.length);
  return variants[index];
}

export function get_random_background_color_tw() {
  const variants = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-black",
    "bg-yellow-500",
    "bg-green-500",
    "bg-pink-400",
  ];

  const index = Math.floor(Math.random() * variants.length);
  return variants[index];
}

export function get_color_for_wallet(wallet) {
  switch (wallet) {
    case "metamask":
      return "bg-orange-500";
    case "phantom":
      return "bg-purple-400";
    case "safe":
      return "bg-red-500";
    case "metamask flask":
      return "bg-purple-500";
    default:
      return "bg-black";
  }
}

export function get_image_src_for_wallet(wallet) {
  const wallet_name = wallet.replace(" ", "");

  switch (wallet_name) {
    case "metamask":
      return "/metamask.png";
    case "phantom":
      return "/phantom.png";
    case "metamaskflask":
      return "/metamask_flask.webp";
    case "safe":
      return "/safe.png";
    case "walletconnect":
      return "/wallet_connect.png";
    case "injected":
      return "/injected.png";
    default:
      return "/metamask.png";
  }
}
