import { Dosen } from '@prisma/client';

export interface DosenResponse {
  id: number;
  name: string;
  matkul: string;
  phone: string;
  whatsapp: string;
}

export function toDosenResponse(dosen: Dosen): DosenResponse {
  return {
    id: dosen.id,
    name: dosen.name,
    matkul: dosen.matkul,
    phone: dosen.phone,
    whatsapp: dosen.whatsapp,
  };
}
