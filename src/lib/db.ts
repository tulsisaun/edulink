import { supabase } from "./supabaseClient";

// Insert user
export async function addUser(name: string, email: string) {
  return await supabase.from("users").insert([{ name, email }]);
}

// Get all users
export async function getUsers() {
  return await supabase.from("users").select("*");
}

// Update user
export async function updateUser(id: string, newName: string) {
  return await supabase.from("users").update({ name: newName }).eq("id", id);
}

// Delete user
export async function deleteUser(id: string) {
  return await supabase.from("users").delete().eq("id", id);
}
