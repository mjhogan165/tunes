import React from "react";
import { User } from "../Interfaces/user";

interface TagsProps {
  user: User;
}
export default function Tags({ user }: TagsProps) {
  return <span className="text-gray-600 pl-3">#{user.username}</span>;
}
