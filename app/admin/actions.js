"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSessionClient } from "@/lib/supabase/session";

export async function login(prevState, formData) {
  const form = formData instanceof FormData ? formData : prevState;
  const email = form?.get?.("email");
  const password = form?.get?.("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let errorMessage = null;

  try {
    const supabase = await createSessionClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password: String(password),
    });

    if (error) {
      if (
        error.message?.toLowerCase().includes("invalid login credentials") ||
        error.message?.toLowerCase().includes("invalid credentials")
      ) {
        errorMessage = "Email atau password salah. Periksa kembali dan coba lagi.";
      } else {
        errorMessage = `Gagal masuk: ${error.message}`;
      }
    }
  } catch (err) {
    errorMessage = `Terjadi kesalahan saat masuk: ${err.message || "Gagal menghubungi server."}`;
  }

  if (errorMessage) {
    return { error: errorMessage };
  }

  redirect("/admin");
}

export async function keluar() {
  try {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  } catch {
    // Abaikan jika sudah tidak ada sesi aktif
  }

  redirect("/admin/login");
}

export async function gantiPassword(prevState, formData) {
  const form = formData instanceof FormData ? formData : prevState;
  const passwordBaru = form?.get?.("password_baru");
  const konfirmasiPassword = form?.get?.("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak cocok." };
  }

  try {
    const supabase = await createSessionClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Sesi telah berakhir. Silakan login kembali." };
    }

    const { error } = await supabase.auth.updateUser({
      password: String(passwordBaru),
    });

    if (error) {
      return { error: `Gagal mengganti password: ${error.message}` };
    }

    return { success: "Password berhasil diganti." };
  } catch (err) {
    return {
      error: `Terjadi kesalahan: ${err.message || "Gagal menghubungi server."}`,
    };
  }
}

export async function tambahProduk(formData) {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Akses ditolak: Admin belum login.");
  }

  const nama = String(formData.get("nama") || "").trim();
  const harga = parseInt(formData.get("harga"), 10) || 0;
  const kategori = String(formData.get("kategori") || "").trim();
  const foto_url = String(formData.get("foto_url") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();

  if (!nama) {
    throw new Error("Nama produk wajib diisi.");
  }

  const { error } = await supabase.from("produk").insert({
    nama,
    harga,
    kategori,
    foto_url,
    deskripsi,
  });

  if (error) {
    throw new Error(`Gagal menambah produk: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function ubahProduk(formData) {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Akses ditolak: Admin belum login.");
  }

  const id = formData.get("id");
  const nama = String(formData.get("nama") || "").trim();
  const harga = parseInt(formData.get("harga"), 10) || 0;
  const kategori = String(formData.get("kategori") || "").trim();
  const foto_url = String(formData.get("foto_url") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();

  if (!id || !nama) {
    throw new Error("ID dan nama produk wajib diisi.");
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal mengubah produk: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Akses ditolak: Admin belum login.");
  }

  const id = formData.get("id");
  if (!id) {
    throw new Error("ID produk tidak valid.");
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus produk: ${error.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
