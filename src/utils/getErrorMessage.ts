import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
	if("status" in error){
		return String(error.data)
	}

	if(error.message){
		return error.message;
	}

	return "Pokemon not found"
}