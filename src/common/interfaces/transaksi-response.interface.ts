import { Transaksi } from '@prisma/client';
import toDateFormat from '../utils/toDateFormat';

export interface TransaksiResponse {
  id: number;
  NIM_mahasiswa: number;
  nominal: number | bigint;
  type: string;
  tanggal: string;
  deskripsi: string;
}

export function toTransaksiResponse(transaksi: Transaksi): TransaksiResponse {
  return {
    id: transaksi.id,
    NIM_mahasiswa: transaksi.NIM_mahasiswa,
    nominal: Number(transaksi.nominal),
    type: transaksi.type,
    deskripsi: transaksi.deskripsi,
    tanggal: toDateFormat(transaksi.tanggal),
  };
}
