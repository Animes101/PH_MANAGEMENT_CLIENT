
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";



export const useApppSelector=useSelector.withTypes<RootState>()
export const useAppDispatch=useDispatch.withTypes<AppDispatch>()