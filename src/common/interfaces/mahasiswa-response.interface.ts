import { Mahasiswa } from '@prisma/client';
import { TransaksiResponse } from './transaksi-response.interface';

export interface MahasiswaResponse {
  NIM: number;
  name: string;
  phone: string;
  transaksi?: TransaksiResponse[];
}

export function toMahasiswaResponse(
  mahasiswa: Mahasiswa,
  transaksi?: TransaksiResponse[],
): MahasiswaResponse {
  if (transaksi) {
    return {
      NIM: mahasiswa.NIM,
      name: mahasiswa.name,
      phone: mahasiswa.phone,
      transaksi: transaksi,
    };
  } else {
    return {
      NIM: mahasiswa.NIM,
      name: mahasiswa.name,
      phone: mahasiswa.phone,
    };
  }
}
