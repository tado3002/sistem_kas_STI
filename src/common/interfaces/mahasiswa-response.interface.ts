import { Mahasiswa } from '@prisma/client';

export interface MahasiswaResponse {
  NIM: number;
  name: string;
  phone: string;
}

export function toMahasiswaResponse(mahasiswa: Mahasiswa): MahasiswaResponse {
  return {
    NIM: mahasiswa.NIM,
    name: mahasiswa.name,
    phone: mahasiswa.phone,
  };
}
