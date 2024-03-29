import { useMutation } from "@tanstack/react-query";

const updateAttendance = async (info: any) => {
	//console.log(info);
	return fetch(`/api/presence/${info.groupId}/${info.participantId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			date: info.date,
			isChecked: info.isChecked,
		}), // Przekaż zaktualizowane dane uczestnika
	}).then((res) => res.json());
};
export const useAttendance = () => {
	return useMutation({ mutationFn: updateAttendance });
};
const addPayment = async (info: any) => {
	//console.log(info);
	return fetch(`/api/payment/${info.participantId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			form: info.form,
			action: info.action,
		}),
	}).then((res) => res.json());
};
export const usePayment = () => {
	return useMutation({ mutationFn: addPayment });
};
const updateParticipant = async (info: any) => {
	//console.log(info);
	return fetch(`/api/participant/${info.newRowId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info.updatedRow), // Przekaż zaktualizowane dane uczestnika
	}).then((res) => res.json());
};
export const useUpdatePrt = () => {
	return useMutation({ mutationFn: updateParticipant });
};
const deleteParticipant = async (info: any) => {
	//console.log(info);
	return fetch(`/api/participant/${info.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info.selectedRow), // Przekaż zaktualizowane dane uczestnika
	}).then((res) => res.json());
};
export const useDeletePrt = () => {
	return useMutation({ mutationFn: deleteParticipant });
};
