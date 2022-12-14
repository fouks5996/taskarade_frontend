import { atom } from 'jotai';

type AlertAtomProps={
   active: null | boolean;
   content: string;
   success?: boolean,
   error?: boolean
}

export const alertAtom = atom<AlertAtomProps>({
   active: false,
   content: "",
   success: false,
});
