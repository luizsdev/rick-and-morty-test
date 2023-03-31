import { observer } from 'mobx-react';
import {
	ChangeEvent,
	ReactChildren,
	ReactNode,
	useContext,
	useState,
} from 'react';
export const FilterModal = ({ children }: React.PropsWithChildren<{}>) => {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
	};
	return (
		<>
			<label
				htmlFor="my-modal-6"
				className="btn  bg-slate-300 text-black min-h-16 text-md hover:bg-slate-400 w-60 sm:w-auto"
			>
				FILTERS
			</label>

			<input type="checkbox" id="my-modal-6" className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">{children}</div>
			</div>
		</>
	);
};
