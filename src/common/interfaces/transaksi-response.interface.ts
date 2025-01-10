import { Transaksi } from '@prisma/client';

export interface TransaksiResponse {
  id: number;
  NIM_mahasiswa: number;
  nama: string;
  nominal: number | bigint;
  type: string;
  tanggal: Date;
  deskripsi: string;
}

export function toTransaksiResponse(transaksi: Transaksi): TransaksiResponse {
  return {
    id: transaksi.id,
    nama: transaksi.nama,
    NIM_mahasiswa: transaksi.NIM_mahasiswa,
    nominal: Number(transaksi.nominal),
    type: transaksi.type,
    deskripsi: transaksi.deskripsi,
    tanggal: transaksi.tanggal,
  };
}
