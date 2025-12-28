import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/types/state/state.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
